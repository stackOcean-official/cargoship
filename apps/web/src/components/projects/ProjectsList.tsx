"use client";

import EmptyPageFiller from "@/components/EmptyPageFiller";
import NewProjectModal from "@/components/projects/NewProjectModal";
import { deleteProject, useProjects } from "@/lib/projects";
import { Menu, Transition } from "@headlessui/react";
import { DocumentPlusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { EllipsisHorizontalIcon, TrashIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import Link from "next/link";
import { Fragment, useState } from "react";

export default function ProjectsList({ teamId }) {
  const { projects, mutateProjects, isLoadingProjects } = useProjects(teamId);
  const [openNewProjectModal, setOpenNewProjectModal] = useState(false);

  const newProject = async () => {
    setOpenNewProjectModal(true);
  };

  const deleteProjectAction = async (project, projectIdx) => {
    try {
      await deleteProject(teamId, project.id);
      // remove locally
      const updatedProjects = JSON.parse(JSON.stringify(projects));
      updatedProjects.splice(projectIdx, 1);
      mutateProjects(updatedProjects);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="h-full">
        {projects &&
          (projects.length === 0 ? (
            <div className="mt-5 text-center">
              <EmptyPageFiller
                onClick={() => newProject()}
                alertText="You don't have any projects yet."
                hintText="Start by creating a project."
                buttonText="create feedback project"
                borderStyles="border-4 border-dotted border-red"
                hasButton={true}>
                <DocumentPlusIcon className="stroke-thin mx-auto h-24 w-24 text-slate-300" />
              </EmptyPageFiller>
            </div>
          ) : (
            <ul className="grid grid-cols-2 place-content-stretch gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 ">
              <button onClick={() => newProject()}>
                <li className="col-span-1 h-56">
                  <div className="from-brand-light to-brand-dark delay-50 flex h-full items-center justify-center overflow-hidden rounded-md bg-gradient-to-b font-light text-white shadow transition ease-in-out hover:scale-105">
                    <div className="px-4 py-8 sm:p-14">
                      <PlusIcon className="stroke-thin mx-auto h-14 w-14" />
                      create project
                    </div>
                  </div>
                </li>
              </button>
              {projects
                .sort((a, b) => b.updatedAt - a.updatedAt)
                .map((project, projectIdx) => (
                  <li key={project.id} className="relative col-span-1 h-56">
                    <div className="delay-50 flex h-full flex-col justify-between rounded-md bg-white shadow transition ease-in-out hover:scale-105">
                      <div className="p-6">
                        <p className="line-clamp-3 text-lg">{project.label}</p>
                      </div>
                      <Link
                        href={`/app/teams/${teamId}/projects/${project.id}/`}
                        className="absolute h-full w-full"></Link>
                      <div className="divide-y divide-slate-100 ">
                        <div className="flex justify-end px-4 py-2 text-right sm:px-6">
                          <Menu as="div" className="relative z-10 inline-block text-left">
                            {({ open }) => (
                              <>
                                <div>
                                  <Menu.Button className="text-red -m-2 flex items-center rounded-full p-2">
                                    <span className="sr-only">Open options</span>
                                    <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
                                  </Menu.Button>
                                </div>

                                <Transition
                                  show={open}
                                  as={Fragment}
                                  enter="transition ease-out duration-100"
                                  enterFrom="transproject opacity-0 scale-95"
                                  enterTo="transproject opacity-100 scale-100"
                                  leave="transition ease-in duration-75"
                                  leaveFrom="transproject opacity-100 scale-100"
                                  leaveTo="transproject opacity-0 scale-95">
                                  <Menu.Items
                                    static
                                    className="absolute left-0 mt-2 w-56 origin-top-right rounded-sm bg-white px-1 shadow-lg">
                                    <div className="py-1">
                                      <Menu.Item>
                                        {({ active }) => (
                                          <button
                                            onClick={() => {
                                              if (
                                                confirm(
                                                  "Are you sure you want to delete this project? This action cannot be undone."
                                                )
                                              ) {
                                                deleteProjectAction(project, projectIdx);
                                              }
                                            }}
                                            className={clsx(
                                              active
                                                ? "text-ui-black rounded-sm bg-slate-100"
                                                : "text-slate-800",
                                              "flex w-full px-4 py-2 text-sm"
                                            )}>
                                            <TrashIcon
                                              className="mr-3 h-5 w-5 text-slate-800"
                                              aria-hidden="true"
                                            />
                                            <span>Delete Project</span>
                                          </button>
                                        )}
                                      </Menu.Item>
                                    </div>
                                  </Menu.Items>
                                </Transition>
                              </>
                            )}
                          </Menu>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          ))}
      </div>
      <NewProjectModal open={openNewProjectModal} setOpen={setOpenNewProjectModal} teamId={teamId} />
    </>
  );
}
