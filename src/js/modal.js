export const settingButton = document.querySelector("#header_button");
export const setting = document.querySelector(".setting");
export const overlay = document.querySelector(".overlay");

settingButton.addEventListener("click", () => {
  overlay.classList.add("overlay-active");
  setting.classList.add("setting-active");
});

export const saveButton = document.querySelector(".setting__button--save");

export const numberInput = document.querySelectorAll("#setting_input");

export function numberInputValues() {
  // Map the nodelist of input elements and turn it into an array
  const valuesArr = [...numberInput].map((input) => input.value);
  // Destructure the array and assign it as an object
  const [pomodoro, shortBreak, longBreak] = valuesArr;
  const values = { pomodoro, shortBreak, longBreak };
  return values;
}

import { removeOverlay, removeSettingModal } from "./overlay";

const cancelButton = setting.querySelector(".setting__button--cancel");

cancelButton.addEventListener("click", () => {
  removeOverlay();
  removeSettingModal();
});
