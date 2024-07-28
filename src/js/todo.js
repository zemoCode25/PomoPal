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
                  <p>${inputEl.value}</p>
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
});
