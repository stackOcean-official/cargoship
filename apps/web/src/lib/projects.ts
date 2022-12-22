import useSWR from "swr";
import { fetcher } from "./utils";

export const useProjects = (teamId: string) => {
  const { data, error, mutate } = useSWR(`/api/teams/${teamId}/projects`, fetcher);

  return {
    projects: data,
    isLoadingProjects: !error && !data,
    isErrorProjects: error,
    mutateProjects: mutate,
  };
};

export const useProject = (id: string, teamId: string) => {
  const { data, error, mutate } = useSWR(`/api/teams/${teamId}/projects/${id}`, fetcher);

  return {
    project: data,
    isLoadingProject: !error && !data,
    isErrorProject: error,
    mutateProject: mutate,
  };
};

export const persistProject = async (project) => {
  try {
    await fetch(`/api/projects/${project.id}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
  } catch (error) {
    console.error(error);
  }
};

export const createProject = async (teamId: string, project = {}) => {
  try {
    const res = await fetch(`/api/teams/${teamId}/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
    return await res.json();
  } catch (error) {
    console.error(error);
    throw Error(`createProject: unable to create project: ${error.message}`);
  }
};

export const deleteProject = async (teamId: string, projectId: string) => {
  try {
    await fetch(`/api/teams/${teamId}/projects/${projectId}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(error);
    throw Error(`deleteProject: unable to delete project: ${error.message}`);
  }
};

export const getProjectElementFieldSetter = (
  project: any,
  mutateProject: (any, boolean?) => void,
  pageId: string,
  elementId: string
) => {
  return (input, field, parentField = "") =>
    setProjectElementField(project, mutateProject, pageId, elementId, input, field, parentField);
};

export const setProjectElementField = (
  project: any,
  mutateProject: (any, boolean?) => void,
  pageId: string,
  elementId: string,
  input: string | number,
  field: string,
  parentField: string = ""
) => {
  const updatedProject = JSON.parse(JSON.stringify(project));
  const elementIdx = getProjectPage(updatedProject, pageId).elements.findIndex((e) => e.id === elementId);
  if (typeof elementIdx === "undefined") {
    throw Error(`setProjectElementField: unable to find element with id ${elementId}`);
  }
  if (parentField !== "") {
    getProjectPage(updatedProject, pageId).elements[elementIdx][parentField][field] = input;
  } else {
    getProjectPage(updatedProject, pageId).elements[elementIdx][field] = input;
  }
  mutateProject(updatedProject, false);
  return updatedProject;
};

export const getProjectPage = (project, pageId) => {
  const page = project.pages.find((p) => p.id === pageId);
  if (typeof page === "undefined") {
    throw Error(`getProjectPage: unable to find page with id ${pageId}`);
  }
  return page;
};
