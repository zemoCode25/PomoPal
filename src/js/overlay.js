const overlay = document.querySelector(".overlay");
const box = document.querySelector(".box");
const settingButton = document.querySelector("#header_button");
const setting = document.querySelector(".setting");

settingButton.addEventListener("click", () => {
  overlay.classList.add("overlay-active");
  setting.classList.add("setting-active");
});

overlay.addEventListener("click", () => {
  overlay.classList.remove("overlay-active");
  setting.classList.remove("setting-active");
});
