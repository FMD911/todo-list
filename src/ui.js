import { state } from "./state.js";

const content = document.getElementById("content");

function clear() {
  content.innerHTML = "";
}

function renderProjects() {
  const box = document.createElement("div");

  state.projects.forEach((project) => {
    const btn = document.createElement("button");
    btn.textContent = project.name;

    btn.addEventListener("click", () => {
      state.activeProjectId = project.id;
      renderApp();
    });

    box.appendChild(btn);
  });

  return box;
}

function renderTodos() {
  const box = document.createElement("div");

  const project = state.projects.find(
    (p) => p.id === state.activeProjectId
  );

  if (!project) return box;

  project.todos.forEach((todo) => {
    const card = document.createElement("div");

    card.innerHTML = `
      <h3>${todo.title}</h3>
      <p>${todo.description}</p>
      <small>${todo.dueDate} | ${todo.priority}</small>
    `;

    box.appendChild(card);
  });

  return box;
}

function projectForm() {
  const form = document.createElement("form");

  const input = document.createElement("input");
  input.placeholder = "New project";

  const button = document.createElement("button");
  button.textContent = "Add Project";

  form.append(input, button);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!input.value.trim()) return;

    state.projects.push({
      id: crypto.randomUUID(),
      name: input.value,
      todos: [],
    });

    input.value = "";
    renderApp();
  });

  return form;
}

function todoForm() {
  const form = document.createElement("form");

  const title = document.createElement("input");
  title.placeholder = "Title";

  const desc = document.createElement("input");
  desc.placeholder = "Description";

  const date = document.createElement("input");
  date.type = "date";

  const priority = document.createElement("select");

  ["Low", "Medium", "High"].forEach((p) => {
    const opt = document.createElement("option");
    opt.value = p;
    opt.textContent = p;
    priority.appendChild(opt);
  });

  const button = document.createElement("button");
  button.textContent = "Add Todo";

  form.append(title, desc, date, priority, button);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const project = state.projects.find(
      (p) => p.id === state.activeProjectId
    );

    if (!project) return;

    project.todos.push({
      id: crypto.randomUUID(),
      title: title.value,
      description: desc.value,
      dueDate: date.value,
      priority: priority.value,
      completed: false,
    });

    title.value = "";
    desc.value = "";
    date.value = "";

    renderApp();
  });

  return form;
}

export function renderApp() {
  clear();

  const wrapper = document.createElement("div");

  wrapper.appendChild(projectForm());
  wrapper.appendChild(renderProjects());
  wrapper.appendChild(todoForm());
  wrapper.appendChild(renderTodos());

  content.appendChild(wrapper);
}