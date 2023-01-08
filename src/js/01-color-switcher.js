function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let intervalId = null;

const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stoptBtn: document.querySelector('[data-stop]'),
};

refs.startBtn.addEventListener('click', onStartInterval);
refs.stoptBtn.addEventListener('click', onStopInterval);

function onStartInterval() {
  refs.startBtn.setAttribute('disabled', false);
  intervalId = setInterval(changeBodyColor, 1000);
}

function changeBodyColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

function onStopInterval() {
  clearInterval(intervalId);
  refs.startBtn.removeAttribute('disabled', false);
}
