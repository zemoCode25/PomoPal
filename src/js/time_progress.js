const timerButton = document.querySelector("#timer__start");

// Timer Default values object;
const timer = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  session: 4,
};

function changeTimerButtonText() {
  if (timerButton.dataset.state === "stopped") {
    timerButton.textContent = "Pause";
    timerButton.dataset.state = "running";
  } else {
    timerButton.textContent = "Start";
    timerButton.dataset.state = "stopped";
  }
}

timerButton.addEventListener("click", () => {
  changeTimerButtonText();
  const display = document.querySelector(".timer__display");
  const path = document.querySelector(".timer__path");
  let time = 1 * 60; // 25 minutes in seconds
  let interval = setInterval(function () {
    if (time <= 0) {
      clearInterval(interval);
      timerButton.textContent = "Start";
      path.style.strokeDasharray = `0, 100`;
      display.textContent = "1:00";
    } else {
      time -= 1;
      let minutes = Math.floor(time / 60);
      let seconds = time % 60;
      display.textContent = `${minutes}:${
        seconds < 10 ? "0" + seconds : seconds
      }`;

      let progress = (1 - time / (1 * 60)) * 100;
      path.style.strokeDasharray = `${progress}, 100`;
    }
  }, 1000);
});
