// To-do list app.
// Tasks are stored as an array of objects: { id, text, done }.
// Every change updates the array, saves it, then redraws the list.

const form = document.querySelector("#todo-form");
const taskInput = document.querySelector("#task-input");
const list = document.querySelector("#todo-list");
const summary = document.querySelector("#summary");
const progressBar = document.querySelector("#progress-bar");
const emptyMessage = document.querySelector("#empty-message");
const clearDoneButton = document.querySelector("#clear-done");
const filterButtons = document.querySelectorAll("[data-filter]");

let todos = loadTodos();
let filter = "all"; // "all", "active", or "done"

// Tasks are saved in the browser so they survive a page refresh.
function loadTodos() {
  try {
    const saved = JSON.parse(localStorage.getItem("todos"));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveTodos() {
  try {
    localStorage.setItem("todos", JSON.stringify(todos));
  } catch {
    // Storage can be blocked. The app still works without it.
  }
}

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function visibleTodos() {
  if (filter === "active") return todos.filter((todo) => !todo.done);
  if (filter === "done") return todos.filter((todo) => todo.done);
  return todos;
}

function render() {
  list.innerHTML = "";

  for (const todo of visibleTodos()) {
    const item = document.createElement("li");
    item.dataset.id = todo.id;
    item.classList.toggle("done", todo.done);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `todo-${todo.id}`;
    checkbox.checked = todo.done;

    const label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.textContent = todo.text; // textContent keeps user text safe

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete task: ${todo.text}`);

    item.append(checkbox, label, deleteButton);
    list.append(item);
  }

  const doneCount = todos.filter((todo) => todo.done).length;
  summary.textContent = todos.length ? `${doneCount} of ${todos.length} done` : "";
  progressBar.style.width = todos.length ? `${(doneCount / todos.length) * 100}%` : "0";
  clearDoneButton.hidden = doneCount === 0;

  if (todos.length === 0) {
    emptyMessage.textContent = "No tasks yet. Add one above.";
  } else if (visibleTodos().length === 0) {
    emptyMessage.textContent = filter === "done" ? "No finished tasks yet." : "Everything is done.";
  } else {
    emptyMessage.textContent = "";
  }

  for (const button of filterButtons) {
    button.setAttribute("aria-pressed", String(button.dataset.filter === filter));
  }
}

function update() {
  saveTodos();
  render();
}

// Add a task
form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page from reloading
  const text = taskInput.value.trim();
  if (!text) return;

  todos.push({ id: makeId(), text, done: false });
  taskInput.value = "";
  taskInput.focus();
  update();
});

// Tick or untick a task
list.addEventListener("change", (event) => {
  if (event.target.type !== "checkbox") return;
  const id = event.target.closest("li").dataset.id;
  const todo = todos.find((item) => item.id === id);
  if (todo) todo.done = event.target.checked;
  update();
});

// Delete a task
list.addEventListener("click", (event) => {
  if (!event.target.classList.contains("delete")) return;
  const id = event.target.closest("li").dataset.id;
  todos = todos.filter((item) => item.id !== id);
  update();
});

// Change the filter
for (const button of filterButtons) {
  button.addEventListener("click", () => {
    filter = button.dataset.filter;
    render();
  });
}

// Remove all finished tasks
clearDoneButton.addEventListener("click", () => {
  todos = todos.filter((todo) => !todo.done);
  update();
});

render();
