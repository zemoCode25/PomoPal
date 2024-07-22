const timerButton = document.querySelector("#timer__start");

// Timer Default values object;
const timer = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  session: 4,
  currentState: "stopped",
};

const timerOptionActive = document.querySelector(".timer__options");
const timerOptions = document.querySelectorAll(".timer__option");

const display = document.querySelector(".timer__display");

const getCurrentTimer = () => {
  const currentTimerOption = timerOptionActive.dataset.currentTimer;
  let currentTimer;

  switch (currentTimerOption) {
    case "pomodoro":
      currentTimer = timer.pomodoro;
      break;
    case "long_break":
      currentTimer = timer.longBreak;
      break;
    case "short_break":
      currentTimer = timer.shortBreak;
      break;
    default:
      return;
  }
  return currentTimer;
};

function removeActiveButton() {
  timerOptions.forEach((button) => {
    button.classList.remove("active__button");
  });
}

timerOptions.forEach((timerOption) => {
  timerOption.addEventListener("click", () => {
    removeActiveButton();
    timerOption.classList.add("active__button");
    timerOptionActive.dataset.currentTimer = timerOption.dataset.id;
    const currentTimer = getCurrentTimer();
    display.textContent = `${currentTimer}:00`;
  });
});

function changeTimerButtonText() {
  if (timer.currentState === "stopped") {
    timerButton.textContent = "Pause";
    timer.currentState = "running";
  } else {
    timerButton.textContent = "Start";
    timer.currentState = "stopped";
  }

  console.log(timer.currentState);
}

const currentRunningTime = {
  paused: false,
  time: 0,
  currentTimer: 0,
};
let interval;

timerButton.addEventListener("click", () => {
  changeTimerButtonText();
  currentRunningTime.currentTimer = getCurrentTimer();

  if (currentRunningTime.paused) {
    currentRunningTime.paused = false;
    runTimer();
  } else if (timer.currentState === "running") {
    currentRunningTime.time = currentRunningTime.currentTimer * 60;
    runTimer();
  } else {
    stopTimer();
  }
});

function runTimer() {
  if (currentRunningTime.paused) return;
  if (interval) clearInterval(interval);
  interval = setInterval(updateTime, 1000);
}

function stopTimer() {
  if (interval) clearInterval(interval);
  currentRunningTime.paused = true;
}

function updateTime() {
  const path = document.querySelector(".timer__path");
  if (currentRunningTime.time <= 0) {
    stopTimer(interval);
    timerButton.textContent = "Start";
    path.style.strokeDasharray = `0, 100`;
    display.textContent = `${currentRunningTime.currentTimer}:00`;
  } else {
    currentRunningTime.time -= 1;
    let minutes = Math.floor(currentRunningTime.time / 60);
    let seconds = currentRunningTime.time % 60;
    display.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    let progress =
      (1 - currentRunningTime.time / (currentRunningTime.currentTimer * 60)) *
      100;
    path.style.strokeDasharray = `${progress}, 100`;
  }
}
