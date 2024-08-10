const todoButton = document.querySelector("#add_task_button");
const todoContainer = document.querySelector("#todo_container");
const inputEl = document.querySelector("#todo_input");

function appendElement(parent, child) {
  parent.append(child);
}

window.addEventListener("load", () => {
  loadTask();
});

todoButton.addEventListener("click", () => {
  const task = inputEl.value.trim();

  if (task === "") {
    return;
  }
  createTaskEl(task);
  saveTasksToLocalStorage(inputEl.value);
  clearInput(inputEl);
});

function clearInput(inputEl) {
  inputEl.value = "";
}

function createTaskEl(taskValue) {
  const task = document.createElement("li");
  task.className = "todo__li";

  task.innerHTML = `<div class="todo__div todo__div--task">
                  <div class="todo__container--check-task">
                    <i class="fa-solid fa-check todo__i"></i>
                    <p class="todo__p">${taskValue}</p>
                  </div>
                  <span
                    class="todo__button todo__button--todo-action material-symbols-outlined"
                  >
                    more_vert
                  </span>
                </div>
                <div class="todo__div todo__div--option">
                  <button class="button-2 todo__button todo__button--delete">
                    Delete
                  </button>
                  <div class="todo__div todo__div--action-save">
                    <button class="button-2 todo__button todo__button--cancel">
                      Cancel
                    </button>
                    <button class="button-2 todo__button todo__button--save">
                      Save
                    </button>
                  </div>
                </div>`;
  appendElement(todoContainer, task);

  const newIcon = task.querySelector(".todo__i");
  newIcon.addEventListener("click", () => {
    newIcon.classList.toggle("todo__i--active");
  });

  const todoOptionIcon = task.querySelector(".todo__button--todo-action");
  todoOptionIcon.addEventListener("click", () => {
    openTaskOptions(task);
  });

  const deleteButton = task.querySelector(".todo__button--delete");
  deleteButton.addEventListener("click", () => {
    todoContainer.removeChild(task);
    // Save the updated list to the localstorage
    saveTasksToLocalStorage();
  });

  const cancelButton = task.querySelector(".todo__button--cancel");
  cancelButton.addEventListener("click", () => {
    closeTaskOptions(task);
  });

  console.log(cancelButton);

  const saveButton = task.querySelector(".todo__button--save");

  saveButton.addEventListener("click", () => {
    const inputElOption = task.querySelector(".todo__input");
    if (inputElOption.value === "") {
      alert("Please fill the input");
      return;
    }
    closeTaskOptions(task);
    saveTasksToLocalStorage();
  });
}

function loadTask() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  if (!tasks) {
    return;
  }

  let taskValues = tasks.map((task) => task.value);
  taskValues.forEach(createTaskEl);
}

function saveTasksToLocalStorage() {
  let tasks = [];
  const tasksEl = todoContainer.querySelectorAll("li");

  tasksEl.forEach((task, index) => {
    const taskValue = task.querySelector(".todo__p");
    tasks.push({ index: index, value: taskValue.textContent.trim() });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

const allTaskButton = document.querySelector("#all-task-button");
const allTaskContainer = document.querySelector(".all-task__container");

allTaskButton.addEventListener("click", (e) => {
  e.stopPropagation();
  allTaskContainer.classList.toggle("all-task__container-active");
});

function closeAllTaskOptions() {
  allTaskContainer.classList.remove("all-task__container-active");
}

document.body.addEventListener("click", function (e) {
  if (!allTaskContainer.contains(e.target) && e.target !== allTaskButton) {
    closeAllTaskOptions();
  }
});

const deleteAllTaskButton = allTaskContainer.querySelector(
  ".all-task__button--delete"
);
const removeFinishedTaskButton = allTaskContainer.querySelector(
  ".all-task__button--remove"
);

deleteAllTaskButton.addEventListener("click", () => {
  const allTasks = todoContainer.querySelectorAll(".todo__li");
  console.log(allTasks);
  allTasks.forEach((task) => {
    todoContainer.removeChild(task);
  });
  closeAllTaskOptions();
  saveTasksToLocalStorage();
});

removeFinishedTaskButton.addEventListener("click", () => {
  const allTasks = todoContainer.querySelectorAll(".todo__li");
  allTasks.forEach((task) => {
    const checkIcon = task.querySelector(".todo__i");
    if (checkIcon.classList.contains("todo__i--active")) {
      todoContainer.removeChild(task);
    }
  });
  closeAllTaskOptions();
  saveTasksToLocalStorage();
});

function openTaskOptions(task) {
  const taskItemOption = task.querySelector(".todo__div--option");
  taskItemOption.classList.toggle("todo__div--option-active");

  const todoTextEl = task.querySelector(".todo__p, .todo__input");

  // Element input and p in the list
  if (todoTextEl.tagName.toLowerCase() === "p") {
    replaceWithInput(todoTextEl);
  } else if (todoTextEl.tagName.toLowerCase() === "input") {
    replaceWithParagraph(todoTextEl);
  }
}

function closeTaskOptions(task) {
  const todoTextEl = task.querySelector(".todo__p, .todo__input");
  const taskItemOption = task.querySelector(".todo__div--option");
  taskItemOption.classList.remove("todo__div--option-active");
  replaceWithParagraph(todoTextEl);
}

function replaceWithInput(todoTextEl) {
  const newInputEl = document.createElement("input");
  newInputEl.classList.add("todo__input");
  newInputEl.value = todoTextEl.textContent.trim();
  todoTextEl.parentNode.replaceChild(newInputEl, todoTextEl);
}

function replaceWithParagraph(todoTextEl) {
  const newPElement = document.createElement("p");
  newPElement.classList.add("todo__p");
  newPElement.textContent = todoTextEl.value.trim();

  todoTextEl.parentNode.replaceChild(newPElement, todoTextEl);
}
