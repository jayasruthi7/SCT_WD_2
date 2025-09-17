let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCounter = 1;

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");

function startTimer() {
  if (!running) {
    startTime = new Date().getTime() - (difference || 0);
    tInterval = setInterval(updateTime, 10);
    running = true;
  }
}

function pauseTimer() {
  if (running) {
    clearInterval(tInterval);
    difference = new Date().getTime() - startTime;
    running = false;
  }
}

function resetTimer() {
  clearInterval(tInterval);
  running = false;
  difference = 0;
  display.innerHTML = "00:00:00.00";
  laps.innerHTML = "";
  lapCounter = 1;
}

function updateTime() {
  updatedTime = new Date().getTime() - startTime;
  let milliseconds = Math.floor((updatedTime % 1000) / 10);
  let seconds = Math.floor((updatedTime / 1000) % 60);
  let minutes = Math.floor((updatedTime / (1000 * 60)) % 60);
  let hours = Math.floor((updatedTime / (1000 * 60 * 60)));

  display.innerHTML = 
    (hours < 10 ? "0" + hours : hours) + ":" + 
    (minutes < 10 ? "0" + minutes : minutes) + ":" + 
    (seconds < 10 ? "0" + seconds : seconds) + "." + 
    (milliseconds < 10 ? "0" + milliseconds : milliseconds);
}

function addLap() {
  if (running) {
    let li = document.createElement("li");
    li.textContent = `Lap ${lapCounter++}: ${display.innerHTML}`;
    laps.appendChild(li);
  }
}

// Event Listeners
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", addLap);
