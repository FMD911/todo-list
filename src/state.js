import { createProject } from "./project.js";

export const state = {
  projects: [],
  activeProjectId: null,
};

// create default project so app is never empty
const defaultProject = createProject("Default");

state.projects.push(defaultProject);
state.activeProjectId = defaultProject.id;