import { state } from "./state.js";

const content = document.getElementById("content");

// clear screen
function clear() {
  content.innerHTML = "";
}

// render project list (simple for now)
function renderProjects() {
  const sidebar = document.createElement("div");

  state.projects.forEach((project) => {
    const btn = document.createElement("button");
    btn.textContent = project.name;

    btn.addEventListener("click", () => {
      state.activeProjectId = project.id;
      renderApp();
    });

    sidebar.appendChild(btn);
  });

  return sidebar;
}

// render todos for active project
function renderTodos() {
  const container = document.createElement("div");

  const project = state.projects.find(
    (p) => p.id === state.activeProjectId
  );

  project.todos.forEach((todo) => {
    const card = document.createElement("div");

    card.innerHTML = `
      <h3>${todo.title}</h3>
      <p>${todo.description}</p>
      <small>${todo.dueDate} | ${todo.priority}</small>
    `;

    container.appendChild(card);
  });

  return container;
}

// main render function
export function renderApp() {
  clear();

  content.appendChild(renderProjects());
  content.appendChild(renderTodos());
}