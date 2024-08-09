const todoButton = document.querySelector("#add_task_button");
const todoContainer = document.querySelector("#todo_container");
const inputEl = document.querySelector("#todo_input");

function appendElement(parent, child) {
  parent.append(child);
}

todoButton.addEventListener("click", () => {
  if (inputEl.value === "") {
    return;
  }
  const task = document.createElement("li");
  task.className = "todo__li";

  task.innerHTML = `<div class="todo__div todo__div--task">
                  <div class="todo__container--check-task">
                    <i class="fa-solid fa-check todo__i"></i>
                    <p>${inputEl.value.trim()}</p>
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
  const taskItemOption = task.querySelector(".todo__div--option");

  todoOptionIcon.addEventListener("click", () => {
    taskItemOption.classList.toggle("todo__div--option-active");
  });

  clearInput(inputEl);
});

function clearInput(inputEl) {
  inputEl.value = "";
}

const allTaskButton = document.querySelector("#all-task-button");
const allTaskContainer = document.querySelector(".all-task__container");

allTaskButton.addEventListener("click", (e) => {
  e.stopPropagation();
  allTaskContainer.classList.toggle("all-task__container-active");
});

document.body.addEventListener("click", function (e) {
  if (!allTaskContainer.contains(e.target) && e.target !== allTaskButton) {
    allTaskContainer.classList.remove("all-task__container-active");
    console.log("Closed the task container");
  }
});
