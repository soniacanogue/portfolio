let timer;
let isRunning = false;
let isWork = true;
let timeLeft = 25 * 60;

const timerDisplay = document.getElementById("timer");
const modeDisplay = document.getElementById("mode");
const workInput = document.getElementById("workInput");
const breakInput = document.getElementById("breakInput");

function updateDisplay() {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

function startTimer() {
  if (isRunning) return;

  isRunning = true;

  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      switchMode();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  pauseTimer();
  isWork = true;
  modeDisplay.textContent = "Work";
  timeLeft = workInput.value * 60;
  updateDisplay();
}

function switchMode() {
  isWork = !isWork;
  modeDisplay.textContent = isWork ? "Work" : "Break";
  timeLeft = (isWork ? workInput.value : breakInput.value) * 60;
  updateDisplay();
}

document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("pauseBtn").addEventListener("click", pauseTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);

updateDisplay();
