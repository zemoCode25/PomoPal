const timerStart = document.querySelector("#timer__start");

// Timer Default values object;
const timer = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  session: 4,
};

const timerButtons = document.querySelectorAll(".timer__button");

function removeActiveButton() {
  timerButtons.forEach((button) => {
    button.classList.remove("active__button");
  });
}

timerButtons.forEach((timerButton) => {
  timerButton.addEventListener("click", () => {
    removeActiveButton();
    timerButton.classList.add("active__button");
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
  const display = document.querySelector(".timer__display");
  const path = document.querySelector(".timer__path");
  let time = timer.pomodoro * 60; // 25 minutes in seconds

  let interval = setInterval(function () {
    if (time <= 0) {
      clearInterval(interval);
      timerButton.textContent = "Start";
      path.style.strokeDasharray = `0, 100`;
      display.textContent = "1:00";
    } else {
      timer.pomodoro -= 1;
      let minutes = Math.floor(time / 60);
      let seconds = time % 60;
      display.textContent = `${minutes}:${
        seconds < 10 ? "0" + seconds : seconds
      }`;

      let progress = (1 - timer.pomodoro / (1 * 60)) * 100;
      path.style.strokeDasharray = `${progress}, 100`;
    }
  }, 1000);
});
