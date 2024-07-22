const timerStart = document.querySelector("#timer__start");

// Timer Default values object;
const timer = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  session: 4,
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
  if (timerStart.dataset.state === "stopped") {
    timerStart.textContent = "Pause";
    timerStart.dataset.state = "running";
  } else {
    timerStart.textContent = "Start";
    timerStart.dataset.state = "stopped";
  }
}

timerStart.addEventListener("click", () => {
  changeTimerButtonText();
  const path = document.querySelector(".timer__path");
  const currentTimer = getCurrentTimer();
  let time = currentTimer * 60;

  let interval = setInterval(function () {
    if (time <= 0) {
      clearInterval(interval);
      timerStart.textContent = "Start";
      path.style.strokeDasharray = `0, 100`;
      display.textContent = `${currentTimer}:00`;
    } else {
      time -= 1;
      let minutes = Math.floor(time / 60);
      let seconds = time % 60;
      display.textContent = `${minutes}:${
        seconds < 10 ? "0" + seconds : seconds
      }`;

      let progress = (1 - time / (currentTimer * 60)) * 100;
      path.style.strokeDasharray = `${progress}, 100`;
    }
  }, 1000);
});
