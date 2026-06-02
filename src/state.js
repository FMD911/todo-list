import { createProject } from "./project.js";
import { loadFromStorage } from "./storage.js";

const saved = loadFromStorage();

export const state = saved || {
  projects: [],
  activeProjectId: null,
};

if (state.projects.length === 0) {
  const defaultProject = createProject("Default");

  state.projects.push(defaultProject);
  state.activeProjectId = defaultProject.id;
}