const STORAGE_KEY = "todo-list-items";

const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");
const emptyState = document.querySelector("#empty-state");
const remainingCount = document.querySelector("#remaining-count");
const clearCompletedButton = document.querySelector("#clear-completed");
const themeToggle = document.querySelector("#theme-toggle");
const filterButtons = document.querySelectorAll("[data-filter]");

let todos = loadTodos();
let currentFilter = "all";

function getPreferredTheme() {
    const savedTheme = localStorage.getItem("todo-theme");
    if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
    }

    // 沒有手動選擇時，跟隨使用者的作業系統設定。
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    const isDark = theme === "dark";
    themeToggle.innerHTML = isDark ? "<span aria-hidden=\"true\">☀️</span> 淺色模式" : "<span aria-hidden=\"true\">🌙</span> 深色模式";
    themeToggle.setAttribute("aria-pressed", String(isDark));
}

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

    const visibleTodos = todos.filter((todo) => {
        if (currentFilter === "active") {
            return !todo.completed;
        }
        if (currentFilter === "completed") {
            return todo.completed;
        }
        return true;
    });

    visibleTodos.forEach((todo) => {
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
    if (visibleTodos.length === 0) {
        emptyState.textContent = currentFilter === "completed"
            ? "目前還沒有已完成的待辦事項。"
            : currentFilter === "active"
                ? "太棒了,目前沒有未完成的待辦事項!"
                : "還沒有任何待辦事項,新增一個吧!";
    }
    emptyState.hidden = visibleTodos.length > 0;
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

themeToggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("todo-theme", nextTheme);
    applyTheme(nextTheme);
});

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;
        filterButtons.forEach((filterButton) => {
            const isActive = filterButton === button;
            filterButton.classList.toggle("active", isActive);
            filterButton.setAttribute("aria-pressed", String(isActive));
        });
        renderTodos();
    });
});

applyTheme(getPreferredTheme());
renderTodos();
