const tasks = [];
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;

const bAdd = document.getElementById("bAdd");
const itTask = document.getElementById("itTask");
const form = document.getElementById("form");
const taskName = document.querySelector("#time #taskName");

renderTime();
renderTask();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (itTask.value !== "") {
    createTask(itTask.value);
    itTask.value = "";

    renderTask();
  }
});

function createTask(value) {
  const newTask = {
    id: (Math.random() * 100).toString(36).slice(3),
    title: value,
    completed: false,
  };

  tasks.unshift(newTask);
}

function renderTask() {
  const html = tasks.map((task) => {
    return `
      <div class="task">
        <div class="completed">${
          task.completed
            ? `<span class="done">Done</span>`
            : `<button class="start-button" data-id="${task.id}">Start</button>`
        }</div>
        <div class="title">${task.title}</div>
      </div>
    `;
  });

  const taskContainer = document.querySelector("#tasks");
  taskContainer.innerHTML = html.join("");

  const startButtons = document.querySelectorAll(".task .start-button");

  startButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (!timer) {
        const id = button.getAttribute("data-id");
        startButtonHandler(id);
        button.textContent = "In Progress...";
      }
    });
  });
}

function startButtonHandler(id) {
  time = 25 * 60;
  current = id;
  const taskIndex = tasks.findIndex((task) => task.id === id);
  taskName.textContent = tasks[taskIndex].title;
  renderTime();
  timer = setInterval(() => {
    timerHandler(id);
  }, 1000);
}

function timerHandler(id) {
  time--;
  renderTime();

  if (time === 0) {
    clearInterval(timer);
    markCompleted(id);
    timer = null;
    renderTask();
    startBreak();
  }
}

// Inciar Break Timer
function startBreak() {
  time = 5 * 60;
  taskName.textContent = "Break";
  renderTime();
  timerBreak = setInterval(() => {
    timeBreakHandler();
  }, 1000);
}

function timeBreakHandler() {
  time--;
  renderTime();

  if (time === 0) {
    clearInterval(timerBreak);
    current = null;
    timerBreak = null;
    taskName.textContent = "";
    renderTask();
  }
}
// Fin Break Timer

function renderTime() {
  const timeDiv = document.querySelector("#time #value");
  const minutes = parseInt(time / 60);
  const seconds = parseInt(time % 60);

  timeDiv.textContent = `${minutes < 10 ? "0" : ""}${minutes} :${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}

function markCompleted(id) {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  tasks[taskIndex].completed = true;
}
