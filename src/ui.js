import { state } from "./state.js";
import { saveToStorage } from "./storage.js";

const content = document.getElementById("content");

function clear() {
  content.innerHTML = "";
}

function formatDate(dateStr) {
  if (!dateStr) return "";

  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}

function renderProjects() {
  const box = document.createElement("div");

  state.projects.forEach((project) => {
    const wrapper = document.createElement("div");

    const btn = document.createElement("button");
    btn.textContent = project.name;

    btn.addEventListener("click", () => {
      state.activeProjectId = project.id;
      saveToStorage(state);
      renderApp();
    });

    const del = document.createElement("button");
    del.textContent = "X";
    del.style.background = "#ff4d4d";

    del.addEventListener("click", () => {
      state.projects = state.projects.filter(
        (p) => p.id !== project.id
      );

      if (state.activeProjectId === project.id) {
        state.activeProjectId = state.projects[0]?.id || null;
      }

      saveToStorage(state);
      renderApp();
    });

    wrapper.append(btn, del);
    box.appendChild(wrapper);
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

    const title = document.createElement("h3");
    title.textContent = todo.title;

    const desc = document.createElement("p");
    desc.textContent = todo.description;

    const meta = document.createElement("small");
    meta.textContent = `${formatDate(todo.dueDate)} | ${todo.priority}`;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.style.background = "#ff4d4d";

    delBtn.addEventListener("click", () => {
      project.todos = project.todos.filter(
        (t) => t.id !== todo.id
      );

      saveToStorage(state);
      renderApp();
    });

    const renameBtn = document.createElement("button");
    renameBtn.textContent = "Rename";

    renameBtn.addEventListener("click", () => {
      const newTitle = prompt("New title:", todo.title);
      if (!newTitle) return;

      todo.title = newTitle;

      saveToStorage(state);
      renderApp();
    });

    card.append(title, desc, meta, renameBtn, delBtn);
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

    saveToStorage(state);
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

    if (!project) {
      alert("Select a project first");
      return;
    }

    if (!title.value.trim()) return;

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

    saveToStorage(state);
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