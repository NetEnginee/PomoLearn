"use strict";

/**
 * Pomodoro Timer Script
 *
 * Handles UI interactions and timer logic for a Pomodoro timer web application.
 * - Button hover effects for repository and mode buttons
 * - Displays current day
 * - Implements start/stop timer functionality with audio feedback
 */

// Get option buttons
const repoBtn = document.getElementById("repoBtn");

/**
 * Utility to change image source and style on hover
 * @param {HTMLElement} btn - Button element
 * @param {string} enterSrc - Image src on mouse enter
 * @param {string} leaveSrc - Image src on mouse leave
 * @param {Object} [enterStyle] - Optional styles on mouse enter
 * @param {Object} [leaveStyle] - Optional styles on mouse leave
 */
function addHoverEffect(
  btn,
  enterSrc,
  leaveSrc,
  enterStyle = {},
  leaveStyle = {}
) {
  btn.addEventListener("mouseenter", () => {
    const img = btn.querySelector("img");
    if (img) {
      img.src = enterSrc;
      Object.assign(img.style, enterStyle);
    }
  });
  btn.addEventListener("mouseleave", () => {
    const img = btn.querySelector("img");
    if (img) {
      img.src = leaveSrc;
      Object.assign(img.style, leaveStyle);
    }
  });
}

// Add hover effects to buttons
addHoverEffect(
  repoBtn,
  "assets/icons/github-dark.svg",
  "assets/icons/github-light.svg"
);

// Display current day in the timer header
const displayTimerDate = document.getElementById("timer-date");
displayTimerDate.innerText = new Date().toLocaleDateString("en-US", {
  weekday: "long",
});

// Timer variables
let minute = 24;
let second = 60;

// Interval id
let timerInterval = null;

// Get timer display elements
const displayMinute = document.getElementById("minute");
const displaySecond = document.getElementById("second");

// Get timer control buttons
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");

/**
 * Updates the timer display with leading zeros if needed
 */
function updateDisplay() {
  displayMinute.innerText = minute < 10 ? "0" + minute : minute;
  displaySecond.innerText = second < 10 ? "0" + second : second;
}

/**
 * Plays an audio file
 * @param {string} src - Path to audio file
 */
function playAudio(src) {
  const audio = new Audio(src);
  audio.play();
}

/**
 * Resets the timer to initial values
 */
function resetTimer() {
  minute = 24;
  second = 59;
  updateDisplay();
  timerInterval = null;
}

/**
 * Timer countdown logic
 */
function startTimer() {
  if (timerInterval) clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    if (second === 0) {
      if (minute > 0) {
        minute--;
        second = 59;
      } else {
        minute = 0;
        second = 0;
        clearInterval(timerInterval);
        playAudio("assets/audio/short-alarm-clock.mp3");
      }
    } else {
      second--;
    }
    updateDisplay();

    // Cek apakah timer sudah mencapai 0
    if (minute === 0 && second === 0) {
      setTimeout(() => {
        displayMinute.innerText = "25";
        displaySecond.innerText = "00";
      }, 1000);
    }
  }, 1000);
}

// Attach start and stop button event listeners only once
startBtn.addEventListener("click", () => {
  playAudio("assets/audio/button-click.mp3");

  // If timer is at 0, reset before starting
  if (minute === 0 && second === 0) {
    resetTimer();
  }
  startTimer();
});

stopBtn.addEventListener("click", () => {
  playAudio("assets/audio/button-click.mp3");

  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
});

// ===== BREAK TIMER LOGIC MOVED TO GLOBAL SCOPE =====
// Timer variables
let breakMinute = 5;
let breakSecond = 0;

/**
 * Break Timer Logic
 *
 * This block implements the break timer functionality for the Pomodoro application.
 * It provides separate controls and display for the break period, including:
 * - Countdown timer for the break session (default: 5 minutes)
 * - Start and stop buttons for the break timer
 * - Audio feedback on button click and timer completion
 * - Automatic reset of the display when the timer reaches zero
 *
 * Variables:
 * - breakMinute, breakSecond: Track the current time left in the break session.
 * - breakStartBtn, breakStopBtn: DOM elements for controlling the break timer.
 * - breakTimerInterval: Stores the interval ID for the break timer.
 *
 * Functions:
 * - updateBreakDisplay(): Updates the break timer display with leading zeros.
 *   If the timer reaches zero, resets the display to "05:00" after 5 seconds.
 * - resetBreakTimer(): Resets the break timer to its initial value (4:59) and updates the display.
 * - startBreakTimer(): Starts the countdown for the break timer, plays an alarm sound when finished,
 *   and resets the display after a short delay.
 *
 * Event Listeners:
 * - breakStartBtn: Starts the break timer on click, resetting if already at zero.
 * - breakStopBtn: Stops the break timer on click.
 *
 * Initialization:
 * - Calls updateBreakDisplay() to ensure the break timer display is correct on page load.
 */

// Get break timer control buttons
let breakStartBtn = document.getElementById("break-startBtn");
let breakStopBtn = document.getElementById("break-stopBtn");

// Interval ID for break timer
let breakTimerInterval = null;

/**
 * Updates the break timer display with leading zeros.
 * If the timer reaches zero, resets the display to "05:00" after 5 seconds.
 */
function updateBreakDisplay() {
  const breakMinuteDisplay = document.getElementById("break-minute");
  const breakSecondDisplay = document.getElementById("break-second");
  if (breakMinuteDisplay && breakSecondDisplay) {
    breakMinuteDisplay.innerText =
      breakMinute < 10 ? "0" + breakMinute : breakMinute;
    breakSecondDisplay.innerText =
      breakSecond < 10 ? "0" + breakSecond : breakSecond;
  }

  if (breakMinute === 0 && breakSecond === 0) {
    setTimeout(() => {
      breakMinuteDisplay.innerText = "05";
      breakSecondDisplay.innerText = "00";
    }, 5000);
  }
}

/**
 * Resets the break timer to its initial value (4:59) and updates the display.
 */
function resetBreakTimer() {
  breakMinute = 4;
  breakSecond = 59;
  updateBreakDisplay();
  breakTimerInterval = null;
}

/**
 * Starts the countdown for the break timer.
 * Plays an alarm sound when finished and resets the display after a short delay.
 */
function startBreakTimer() {
  if (breakTimerInterval) clearInterval(breakTimerInterval);

  breakTimerInterval = setInterval(() => {
    if (breakSecond === 0) {
      if (breakMinute > 0) {
        breakMinute--;
        breakSecond = 59;
      } else {
        breakMinute = 0;
        breakSecond = 0;
        clearInterval(breakTimerInterval);
        playAudio("assets/audio/short-alarm-clock.mp3");
      }
    } else {
      breakSecond--;
    }
    updateBreakDisplay();

    if (breakMinute === 0 && breakSecond === 0) {
      setTimeout(() => {
        updateBreakDisplay();
      }, 1000);
    }
  }, 1000);
}

// Attach event listeners to break timer buttons if they exist
if (breakStartBtn && breakStopBtn) {
  breakStartBtn.addEventListener("click", () => {
    playAudio("assets/audio/button-click.mp3");
    if (breakMinute === 0 && breakSecond === 0) {
      resetBreakTimer();
    }
    startBreakTimer();
  });

  breakStopBtn.addEventListener("click", () => {
    playAudio("assets/audio/button-click.mp3");
    if (breakTimerInterval) {
      clearInterval(breakTimerInterval);
      breakTimerInterval = null;
    }
  });
}

// Initialize break timer display on page load
updateBreakDisplay();

// Add hover effects to buttons
const TaskBtn = document.getElementById("addTaskBtn");
addHoverEffect(
  TaskBtn,
  "assets/icons/add-dark.svg",
  "assets/icons/add-light.svg"
);

// Store the original button text
const originalTaskBtnText = TaskBtn.textContent;

TaskBtn.addEventListener("click", () => {
  playAudio("assets/audio/button-click.mp3");

  // Toggle button text
  if (TaskBtn.textContent === originalTaskBtnText) {
    TaskBtn.textContent = "Close";
  } else {
    TaskBtn.textContent = originalTaskBtnText;
  }

  const displayTaskInput = document.getElementById("taskName");
  if (displayTaskInput.style.display === "flex") {
    displayTaskInput.style.display = "none";
  } else {
    displayTaskInput.style.display = "flex";
  }
});

const taskNameDatabase = [];
const STORAGE_KEY = "TODO";
const acceptTaskBtn = document.getElementById("add");
const nameInput = document.getElementById("taskNameInput");

acceptTaskBtn.addEventListener("click", () => {
  // Check if the field is empty
  if (nameInput.value.trim() === "") return alert("The field cannot be empty");

  // Create new task object
  const newTask = {
    id: taskNameDatabase.length,
    name: nameInput.value.trim(),
  };

  taskNameDatabase.push(newTask);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(taskNameDatabase));

  displayData();
});

// Function for display data
function displayData() {
  const parseData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  // Check if parseData exists and is an array
  if (Array.isArray(parseData)) {
    const displayData = document.getElementById("displayTask");
    displayData.innerHTML = ""; // Clear previous content
    parseData.forEach((task) => {
      // Create a table row for each task
      const taskRow = document.createElement("tr");

      // Task name cell
      const nameCell = document.createElement("td");
      nameCell.textContent = task.name;
      taskRow.appendChild(nameCell);

      // Action cell with delete button
      const actionCell = document.createElement("td");
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Done";
      deleteBtn.addEventListener("click", () => {
        // Remove task from database and update localStorage
        const updatedTasks = parseData.filter((t) => t.id !== task.id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
        // Refresh the displayed data
        displayData();
      });
      actionCell.appendChild(deleteBtn);
      taskRow.appendChild(actionCell);

      displayData.appendChild(taskRow);

      deleteBtn.addEventListener("click", () => {
        window.location.reload();
      });
    });
  }
}

displayData();
