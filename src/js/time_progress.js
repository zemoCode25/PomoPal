const timerButton = document.querySelector("#timer__start");

// Timer Default values object;
let timer = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  sessionInterval: 4,
  session: 0,
};

let currentRunningTime = {
  paused: false,
  time: 0,
  currentTimer: "pomodoro",
  currentState: "stopped",
};

import { saveButton, numberInputValues } from "./modal";
import { removeOverlay, removeSettingModal } from "./overlay";

saveButton.addEventListener("click", () => {
  const values = Object.assign(numberInputValues());
  Object.assign(timer, values);
  currentRunningTime.currentTimer = getCurrentTimer();
  display.textContent = `${timer[currentRunningTime.currentTimer]}:00`;
  removeOverlay();
  removeSettingModal();
});

const timerOptionActive = document.querySelector(".timer__options");
const timerOptions = document.querySelectorAll(".timer__option");

const display = document.querySelector(".timer__display");

timerOptions.forEach((timerOption) => {
  timerOption.addEventListener("click", () => {
    removeActiveButton();
    timerOption.classList.add("active__button");
    timerOptionActive.dataset.currentTimer = timerOption.dataset.id;
    switchOption();
  });
});

const getCurrentTimer = () => {
  const currentTimer = timerOptionActive.dataset.currentTimer;
  return currentTimer;
};

function removeActiveButton() {
  timerOptions.forEach((button) => {
    button.classList.remove("active__button");
  });
}

const clickSound = document.querySelector("#click");
const alarmSound = document.querySelector("#alarm");

function changeTimerButtonText() {
  if (currentRunningTime.currentState === "stopped") {
    timerButton.textContent = "Pause";
    currentRunningTime.currentState = "running";
  } else {
    timerButton.textContent = "Start";
    currentRunningTime.currentState = "stopped";
  }
}

let interval;

timerButton.addEventListener("click", () => {
  changeTimerButtonText();
  currentRunningTime.currentTimer = getCurrentTimer();
  clickSound.play();

  if (currentRunningTime.currentState === "running") {
    if (!currentRunningTime.paused) {
      currentRunningTime.time = timer[currentRunningTime.currentTimer] * 60;
      runTimer();
    } else {
      runTimer();
    }
  } else {
    stopTimer();
  }
});

function runTimer() {
  if (interval) clearInterval(interval);
  interval = setInterval(updateTime, 1000);
}

function stopTimer() {
  if (interval) clearInterval(interval);
  currentRunningTime.paused = true;
}

const numberOfSessions = document.querySelector("#number_of_sessions");

function updateTime() {
  const path = document.querySelector(".timer__path");
  if (currentRunningTime.time <= 0) {
    alarmSound.play();
    switchTimerAfterRing();
    changeTimerNote(currentRunningTime.currentTimer);
    stopTimer(interval);
    timer.session += 1;
    numberOfSessions.textContent = timer.session;
    timerButton.textContent = "Start";
    path.style.strokeDasharray = `0, 100`;
    display.textContent = `${timer[currentRunningTime.currentTimer]}:00`;
  } else {
    currentRunningTime.time -= 1;
    let minutes = Math.floor(currentRunningTime.time / 60);
    let seconds = currentRunningTime.time % 60;
    display.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    let progress =
      (1 -
        currentRunningTime.time /
          (timer[currentRunningTime.currentTimer] * 60)) *
      100;
    path.style.strokeDasharray = `${progress}, 100`;
  }
}

function switchOption() {
  // Reset the interval/timer
  clearInterval(interval);
  interval = null;
  // Set the current timer and paused bool in order
  currentRunningTime.currentTimer = getCurrentTimer();
  changeTimerNote(currentRunningTime.currentTimer);
  resetTimer();
}

function resetTimer() {
  currentRunningTime.paused = false;
  display.textContent = `${timer[currentRunningTime.currentTimer]}:00`;
  // Changing the current state
  currentRunningTime.currentState = "stopped";
  timerButton.textContent = "Start";
}

function switchTimerAfterRing() {
  console.log(
    "Before: " + currentRunningTime.currentTimer + " " + timer.session
  );
  switch (currentRunningTime.currentTimer) {
    case "pomodoro":
      console.log("TITE HAHAAHH");
      currentRunningTime.currentTimer =
        timer.session % timer.sessionInterval !== 0 || timer.session === 0
          ? "shortBreak"
          : "longBreak";
      break;
    default:
      currentRunningTime.currentTimer = "pomodoro";
  }
  console.log("Before: " + currentRunningTime.currentTimer);
  resetTimer();
}

const timerNote = document.querySelector("#timer_note");

function changeTimerNote(currentTimer) {
  switch (currentTimer) {
    case "pomodoro":
      timerNote.textContent = "Focus Up!";
      break;
    case "shortBreak":
      timerNote.textContent = "Time for a short break!";
      break;
    case "longBreak":
      timerNote.textContent = "Time for a long break!";
      break;
    default:
      return;
  }
}
