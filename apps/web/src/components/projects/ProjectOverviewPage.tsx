"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import {
  fetchLogs,
  overwriteRFile,
  persistProject,
  startServer,
  stopServer,
  useProject,
} from "@/lib/projects";
import { useTeam } from "@/lib/teams";
import { Button } from "@cargoship/ui";
import { Switch } from "@headlessui/react";
import { ArrowPathIcon, CommandLineIcon, HomeIcon } from "@heroicons/react/20/solid";
import { DocumentPlusIcon, GlobeEuropeAfricaIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiFillApi } from "react-icons/ai";
import { FaGlobeEurope, FaRProject } from "react-icons/fa";
import { toast } from "react-toastify";
import EmptyPageFiller from "../EmptyPageFiller";

const tabs = [
  { id: "overview", name: "Overview", icon: HomeIcon },
  { id: "rFile", name: "Update R File", icon: FaRProject },
  { id: "api", name: "API", icon: AiFillApi },
  { id: "logs", name: "Logs", icon: CommandLineIcon },
];

export default function ProjectOverviewPage() {
  const router = useRouter();
  const { project, isLoadingProject, isErrorProject, mutateProject } = useProject(
    router.query.projectId?.toString(),
    router.query.teamId?.toString()
  );
  const { team, isLoadingTeam, isErrorTeam } = useTeam(router.query.teamId?.toString());
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [updatingR, setUpdatingR] = useState(false);

  const addEmptyRFile = async () => {
    const updatedProject = await overwriteRFile(project.teamId, project.id, "");
    mutateProject(updatedProject, false);
  };

  const refetchLogs = async () => {
    const updatedProject = JSON.parse(JSON.stringify(project));
    updatedProject.logs = await fetchLogs(project.teamId, project.id);
    persistProject(updatedProject);
    mutateProject(updatedProject, false);
  };

  if (isLoadingProject || isLoadingTeam) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isErrorProject || isErrorTeam) {
    return <div>Error loading ressources. Maybe you don&lsquo;t have enough access rights</div>;
  }
  return (
    <div className="mx-auto py-8 sm:px-6 lg:px-8">
      <header className="mb-8 flex justify-between">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
          {project.label}
          <span className="text-brand-dark ml-4 inline-flex items-center rounded-md border border-sky-100 bg-sky-50 px-2.5 py-0.5 text-sm font-medium">
            {team.name}
          </span>
        </h1>
        <Switch.Group as="div" className="flex items-center">
          <Switch
            checked={project.running}
            onChange={async () => {
              let updatedProject;
              if (project.running) {
                updatedProject = await stopServer(project.teamId, project.id);
              } else {
                updatedProject = await startServer(project.teamId, project.id);
              }
              mutateProject(updatedProject, false);
            }}
            className={clsx(
              project.running ? "bg-sky-600" : "bg-gray-200",
              "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            )}>
            <span
              aria-hidden="true"
              className={clsx(
                project.running ? "translate-x-5" : "translate-x-0",
                "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
              )}
            />
          </Switch>
          <Switch.Label as="span" className="ml-3">
            <span className="text-sm font-medium text-gray-900">
              {project.running ? "Server is running" : "Server is not running"}
            </span>
          </Switch.Label>
        </Switch.Group>
      </header>
      <div>
        <div>
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              Select a tab
            </label>
            {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
            <select
              id="tabs"
              name="tabs"
              className="block w-full rounded-md border-gray-300 focus:border-sky-500 focus:ring-sky-500"
              defaultValue={activeTab.name}>
              {tabs.map((tab) => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab)}
                    className={clsx(
                      activeTab.name === tab.name
                        ? "border-sky-500 text-sky-600"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                      "group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium"
                    )}
                    aria-current={activeTab.name === tab.name ? "page" : undefined}>
                    <tab.icon
                      className={clsx(
                        activeTab.name === tab.name
                          ? "text-sky-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "-ml-0.5 mr-2 h-5 w-5"
                      )}
                      aria-hidden="true"
                    />
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {activeTab.id === "overview" ? (
          <div className="mt-6">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">Welcome to your R Shiny Project</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                This is your project overview. Here you can see the status of your project and make changes to
                it.
              </p>
            </div>
            <hr className="my-8 text-gray-600" />
            <div>
              <label htmlFor="projectId" className="block text-sm text-slate-800">
                Once your server is running you can access your R Shiny Project here:
              </label>
              <div className="mt-3">
                <div className="mt-1 flex rounded-md shadow-sm">
                  <Link
                    href={`${window.location.protocol}//${project.id}.${window.location.host}/`}
                    className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-gray-500 sm:text-sm"
                    target="_blank">
                    <GlobeEuropeAfricaIcon className="h-5 w-5" />
                  </Link>
                  <input
                    id="captureUrl"
                    type="text"
                    className="focus:border-brand focus:ring-brand block w-full rounded-r-md border-gray-300 bg-gray-100 shadow-sm sm:text-sm"
                    value={`https://${project.id}.${window.location.host}/`}
                    disabled
                  />
                </div>
              </div>
            </div>
            <hr className="my-8 text-gray-600" />
            <div>
              <p className="font-medium leading-6 text-gray-900">
                Before accessing your server make sure you set up your project:
              </p>
              <ul className="mt-1 list-decimal pl-7 text-sm text-gray-700">
                <li>Set your R file (via editor or API)</li>
                <li>Start the server</li>
              </ul>
            </div>
          </div>
        ) : activeTab.id === "rFile" ? (
          <div className="mt-6">
            {project.rFile !== null ? (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setUpdatingR(true);
                  const updatedProject = await overwriteRFile(
                    project.teamId,
                    project.id,
                    e.currentTarget.rFile.value
                  );
                  mutateProject(updatedProject, false);
                  setUpdatingR(false);
                }}>
                <textarea
                  rows={15}
                  name="rFile"
                  id="rFile"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                  placeholder="Paste your R file here"
                  defaultValue={project.rFile}
                />
                <div className="mt-2 flex justify-end">
                  <Button type="submit" loading={updatingR} disabled={updatingR}>
                    Save
                  </Button>
                </div>
              </form>
            ) : (
              <EmptyPageFiller
                onClick={() => addEmptyRFile()}
                alertText="You haven't setup an R file yet"
                hintText="Add an R file here or send it via API"
                buttonText="create R file"
                borderStyles="border-4 border-dotted border-red"
                hasButton={true}>
                <DocumentPlusIcon className="stroke-thin mx-auto h-24 w-24 text-slate-300" />
              </EmptyPageFiller>
            )}
          </div>
        ) : activeTab.id === "api" ? (
          <div>
            <div className="grid grid-cols-5 gap-8 py-4">
              <div className="col-span-3">
                <div>
                  <label htmlFor="projectId" className="block text-lg font-semibold text-slate-800">
                    Update R File POST Url:
                  </label>
                  <div className="mt-3">
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-gray-500  sm:text-sm">
                        POST
                      </span>
                      <input
                        id="captureUrl"
                        type="text"
                        className="focus:border-brand focus:ring-brand block w-full rounded-r-md border-gray-300 bg-gray-100 shadow-sm sm:text-sm"
                        value={`${window.location.protocol}//${window.location.host}/api/teams/${project.teamId}/projects/${project.id}/rfile`}
                        disabled
                      />
                    </div>

                    <Button
                      variant="secondary"
                      className="mt-2 w-full justify-center"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${window.location.protocol}//${window.location.host}/api/teams/${project.teamId}/projects/${project.id}/rfile`
                        );
                        toast("Copied project url to clipboard");
                      }}>
                      copy
                    </Button>
                  </div>
                </div>
                <div className="mt-4 rounded-md bg-black p-4 font-light text-gray-200 first-letter:text-sm">
                  <pre>
                    <code className="language-js whitespace-pre-wrap">
                      {`{
"content": "YOUR R FILE CONTENT GOES HERE"
}`}
                    </code>
                  </pre>
                </div>
              </div>
              <div className="col-span-2  text-sm text-gray-600">
                <h3 className="block pb-4 text-lg font-semibold text-slate-800">Quick Tips</h3>
                <p className="font-bold">Authentication</p>
                <p className="my-3 text-sm text-gray-600">
                  You need to generate an API key for your project and add it in the "X-API-Key" header. You
                  can geenrate a new API key in the{" "}
                  <Link href="/app/me/settings" className="underline">
                    profile settings
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        ) : activeTab.id === "logs" ? (
          <div className="relative mt-6">
            <button
              className="absolute right-4 top-4 rounded-full bg-white p-2 hover:bg-gray-100"
              onClick={() => refetchLogs()}>
              <ArrowPathIcon className="h-6 w-6 text-gray-700" />
            </button>
            <div className="col-span-3 h-96 rounded-md bg-black p-4 text-sm font-light text-gray-200">
              <pre>
                <code className="language-js whitespace-pre-wrap">{project.logs}</code>
              </pre>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
