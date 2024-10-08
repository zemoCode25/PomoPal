export const settingButton = document.querySelector("#header_button");
export const setting = document.querySelector(".setting");

// Created to be imported in the overlay.js file
export function getOverlay() {
  return document.querySelector(".overlay");
}

const overlay = getOverlay();

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

const colorButtons = setting.querySelectorAll(".setting__button--theme");

let theme = "";

colorButtons.forEach((colorButton) => {
  console.log(colorButton);
  colorButton.addEventListener("click", () => {
    const colorTheme = colorButton.getAttribute("data-color");
    theme = colorTheme;
    removeBorder();
    colorButton.classList.add("setting__button--theme-active");
  });
});

export function getColorTheme() {
  return theme;
}

function removeBorder() {
  colorButtons.forEach((colorButton) => {
    colorButton.classList.remove("setting__button--theme-active");
  });
}
