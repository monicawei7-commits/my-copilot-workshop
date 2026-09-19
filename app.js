const STORAGE_KEY = "todo-list-items";

const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");
const emptyState = document.querySelector("#empty-state");
const remainingCount = document.querySelector("#remaining-count");
const clearCompletedButton = document.querySelector("#clear-completed");

let todos = loadTodos();

function loadTodos() {
    try {
        const savedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return Array.isArray(savedTodos) ? savedTodos : [];
    } catch {
        return [];
    }
}

function saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function renderTodos() {
    list.innerHTML = "";

    todos.forEach((todo) => {
        const item = document.createElement("li");
        item.className = `todo-item${todo.completed ? " completed" : ""}`;

        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;
        checkbox.setAttribute("aria-label", `完成「${todo.text}」`);
        checkbox.addEventListener("change", () => {
            todo.completed = checkbox.checked;
            saveTodos();
            renderTodos();
        });

        const text = document.createElement("span");
        text.className = "todo-text";
        text.textContent = todo.text;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.type = "button";
        deleteButton.textContent = "刪除";
        deleteButton.setAttribute("aria-label", `刪除「${todo.text}」`);
        deleteButton.addEventListener("click", () => {
            todos = todos.filter((itemToKeep) => itemToKeep.id !== todo.id);
            saveTodos();
            renderTodos();
        });

        label.append(checkbox, text);
        item.append(label, deleteButton);
        list.append(item);
    });

    const remaining = todos.filter((todo) => !todo.completed).length;
    remainingCount.textContent = `未完成:${remaining} 項`;
    emptyState.hidden = todos.length > 0;
    clearCompletedButton.hidden = !todos.some((todo) => todo.completed);
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = input.value.trim();

    if (!text) {
        input.focus();
        return;
    }

    todos.push({
        id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
        text,
        completed: false,
    });

    saveTodos();
    renderTodos();
    form.reset();
    input.focus();
});

clearCompletedButton.addEventListener("click", () => {
    todos = todos.filter((todo) => !todo.completed);
    saveTodos();
    renderTodos();
});

renderTodos();
