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

  task.innerHTML = `<div class="todo__container--check-task">
                  <i class="fa-solid fa-check todo__i"></i>
                  <p>${inputEl.value.trim()}</p>
                </div>
                <span
                  class="todo__button todo__button--todo-action material-symbols-outlined"
                >
                  more_vert
                </span>`;
  appendElement(todoContainer, task);

  const newIcon = task.querySelector(".todo__i");
  newIcon.addEventListener("click", () => {
    newIcon.classList.toggle("todo__i--active");
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
