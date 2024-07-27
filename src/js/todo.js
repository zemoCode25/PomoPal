const todoButton = document.querySelector("#add_task_button");
const todoContainer = document.querySelector("#todo_container");
const inputEl = document.querySelector("#todo_input");

todoButton.addEventListener("click", () => {
  if (inputEl.value === "") {
    return;
  }
  const task = document.createElement("li");
});
