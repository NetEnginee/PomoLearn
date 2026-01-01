"use strict";

const MODES = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

let timeLeft = MODES.focus;
let currentMode = "focus";
let isRunning = false;
let timerInterval = null;

const alarmSound = new Audio(
  "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
);

const timerDisplay = document.querySelector(".timer-display");
const mainBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const modeButtons = document.querySelectorAll(".mode-btn");

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;

  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function updateDisplay() {
  const formatted = formatTime(timeLeft);
  timerDisplay.textContent = formatted;

  document.title = `(${formatted}) PomoLearn - Focus Timer`;
}

function switchMode(mode) {
  pauseTimer();

  currentMode = mode;

  if (mode === "focus") timeLeft = MODES.focus;
  else if (mode === "short-break") timeLeft = MODES.shortBreak;
  else if (mode === "long-break") timeLeft = MODES.longBreak;

  updateDisplay();
  updateActiveButton(mode);
}

function updateActiveButton(activeMode) {
  modeButtons.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.id.includes(activeMode)) {
      btn.classList.add("active");
    }
  });
}

function startTimer() {
  if (isRunning) return;

  isRunning = true;
  mainBtn.textContent = "PAUSE";
  mainBtn.style.background = "linear-gradient(135deg, #f472b6, #db2777)";

  timerInterval = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      finishTimer();
    }
  }, 1000);
}

function pauseTimer() {
  isRunning = false;
  clearInterval(timerInterval);
  mainBtn.textContent = "START";
  mainBtn.style.background = "";
  document.title = "PomoLearn - Focus Timer";
}

function resetTimer() {
  pauseTimer();

  if (currentMode === "focus") timeLeft = MODES.focus;
  else if (currentMode === "short-break") timeLeft = MODES.shortBreak;
  else if (currentMode === "long-break") timeLeft = MODES.longBreak;

  updateDisplay();
}

function finishTimer() {
  pauseTimer();
  alarmSound.play();
  alert("Time is up! Great job focusing.");
  resetTimer();
}

mainBtn.addEventListener("click", () => {
  if (isRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
});

resetBtn.addEventListener("click", () => {
  if (confirm("Reset the timer?")) {
    resetTimer();
  }
});

document
  .getElementById("focus-btn")
  .addEventListener("click", () => switchMode("focus"));
document
  .getElementById("short-break-btn")
  .addEventListener("click", () => switchMode("short-break"));
document
  .getElementById("long-break-btn")
  .addEventListener("click", () => switchMode("long-break"));

updateDisplay();

const modalReset = document.getElementById("reset-confirm-modal");
const btnConfirmReset = document.getElementById("btn-confirm-reset");
const btnCancelReset = document.getElementById("btn-cancel-reset");

resetBtn.replaceWith(resetBtn.cloneNode(true));
const newResetBtn = document.getElementById("reset-btn");

newResetBtn.addEventListener("click", () => {
  modalReset.classList.add("active");
});

function closeModal() {
  modalReset.classList.remove("active");
}

btnCancelReset.addEventListener("click", closeModal);

modalReset.addEventListener("click", (e) => {
  if (e.target === modalReset) {
    closeModal();
  }
});

btnConfirmReset.addEventListener("click", () => {
  pauseTimer();

  if (currentMode === "focus") timeLeft = MODES.focus;
  else if (currentMode === "short-break") timeLeft = MODES.shortBreak;
  else if (currentMode === "long-break") timeLeft = MODES.longBreak;

  updateDisplay();
  closeModal();
});

const taskInput = document.querySelector(".task-input");

function finishTimer() {
  pauseTimer();
  alarmSound.play();

  const taskName = taskInput.value.trim();
  const message = taskName
    ? `Waktu habis! Kerja bagus telah fokus pada "${taskName}".`
    : "Waktu habis! Kerja bagus telah fokus.";

  alert(message);
  resetTimer();
}

if (taskInput) {
  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      taskInput.blur();
    }
  });
}

const settingsBtn = document.getElementById("settings-btn");
const settingsModal = document.getElementById("settings-modal");
const closeSettingsBtn = document.getElementById("close-settings");
const saveSettingsBtn = document.getElementById("btn-save-settings");

const inputFocus = document.getElementById("input-focus");
const inputShort = document.getElementById("input-short");
const inputLong = document.getElementById("input-long");

settingsBtn.addEventListener("click", () => {
  inputFocus.value = MODES.focus / 60;
  inputShort.value = MODES.shortBreak / 60;
  inputLong.value = MODES.longBreak / 60;

  settingsModal.classList.add("active");
});

closeSettingsBtn.addEventListener("click", () => {
  settingsModal.classList.remove("active");
});

settingsModal.addEventListener("click", (e) => {
  if (e.target === settingsModal) {
    settingsModal.classList.remove("active");
  }
});

saveSettingsBtn.addEventListener("click", () => {
  const newFocus = parseInt(inputFocus.value);
  const newShort = parseInt(inputShort.value);
  const newLong = parseInt(inputLong.value);

  if (newFocus > 0 && newShort > 0 && newLong > 0) {
    MODES.focus = newFocus * 60;
    MODES.shortBreak = newShort * 60;
    MODES.longBreak = newLong * 60;

    pauseTimer();

    if (currentMode === "focus") timeLeft = MODES.focus;
    else if (currentMode === "short-break") timeLeft = MODES.shortBreak;
    else if (currentMode === "long-break") timeLeft = MODES.longBreak;

    updateDisplay();
    settingsModal.classList.remove("active");
  } else {
    alert("Mohon masukkan angka waktu yang valid.");
  }
});
