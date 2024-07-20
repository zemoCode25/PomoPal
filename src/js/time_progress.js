// document.addEventListener("DOMContentLoaded", function () {
//   const display = document.querySelector(".timer__display");
//   const path = document.querySelector(".timer__path");
//   let time = 1 * 60; // 25 minutes in seconds
//   let interval = setInterval(function () {
//     if (time <= 0) {
//       clearInterval(interval);
//     } else {
//       time -= 1;
//       let minutes = Math.floor(time / 60);
//       let seconds = time % 60;
//       display.textContent = `${minutes}:${
//         seconds < 10 ? "0" + seconds : seconds
//       }`;

//       let progress = (1 - time / (1 * 60)) * 100;
//       path.style.strokeDasharray = `${progress}, 100`;
//     }
//   }, 1000);
// });
