"use client";

import { createProject } from "@/lib/projects";
import { Button } from "@cargoship/ui";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { BsPlus } from "react-icons/bs";

type ProjectOnboardingModalProps = {
  open: boolean;
  setOpen: (v: boolean) => void;
  teamId: string;
};

export default function NewProjectModal({ open, setOpen, teamId }: ProjectOnboardingModalProps) {
  const router = useRouter();
  const [label, setLabel] = useState("");
  const [creating, setCreating] = useState(false);

  const createProjectAction = async (e) => {
    e.preventDefault();
    setCreating(true);
    const project = await createProject(teamId, {
      label,
    });
    router.push(`/app/teams/${teamId}/projects/${project.id}/`);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-30 backdrop-blur-md transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <Dialog.Panel className="transproject relative rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-0 focus:ring-offset-2"
                    onClick={() => setOpen(false)}>
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="flex flex-row justify-between">
                  <h2 className="flex-none p-2 text-xl font-bold text-slate-800">Create new project</h2>
                </div>
                <form
                  onSubmit={(e) => createProjectAction(e)}
                  className="transproject inline-block w-full overflow-hidden p-2 text-left align-bottom transition-all sm:align-middle">
                  <div>
                    <label htmlFor="email" className="text-sm font-light text-slate-800">
                      Name your project
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="label"
                        className="focus:border-brand focus:ring-brand block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                        placeholder="e.g. Random Forest Shiny App"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        autoFocus
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-5 sm:mt-6">
                    <Button
                      type="submit"
                      className="w-full justify-center"
                      disabled={creating}
                      loading={creating}>
                      create project
                      <BsPlus className="ml-1 h-6 w-6"></BsPlus>
                    </Button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
