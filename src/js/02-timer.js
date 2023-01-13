import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  // ! minDate: 'today',
  onClose(selectedDates) {
    selectedDates[0];
  },
};

const instance = flatpickr('#datetime-picker', options);

const DEFAULTTIME = instance.config.now.getTime();
let differenceTime = 0;
let isActive = false;
let intervalId = null;
let choseTime = 0;

const refs = {
  startBtn: document.querySelector('[data-start]'),
  secondsEl: document.querySelector('[data-seconds]'),
  minutesEl: document.querySelector('[data-minutes]'),
  hoursEl: document.querySelector('[data-hours]'),
  daysEl: document.querySelector('[data-days]'),
};

refs.startBtn.setAttribute('disabled', true);

refs.startBtn.addEventListener('click', onStartTimer);

instance.config.onClose.push(function (selectedDates) {
  choseTime = selectedDates[0].getTime();

  if (DEFAULTTIME < choseTime) {
    refs.startBtn.removeAttribute('disabled', true);
  } else {
    refs.startBtn.setAttribute('disabled', true);
    Notify.success('Please choose a date in the future');
  }

  differenceTime = choseTime - DEFAULTTIME;
});

function onStartTimer() {
  isActive = true;
  if (isActive) {
    refs.startBtn.setAttribute('disabled', true);
  }

  intervalId = setInterval(() => {
    differenceTime -= 1000;

    if (differenceTime <= 1000) {
      clearInterval(intervalId);
      isActive = false;
      refs.startBtn.removeAttribute('disabled', true);
      document.querySelector('body').style.backgroundColor = 'red';
      Notify.success('Restart timer');
    }

    // console.log(convertMs(differenceTime));
    const totalTimer = convertMs(differenceTime);

    updateClockface(totalTimer);
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function updateClockface({ days, hours, minutes, seconds }) {
  refs.secondsEl.textContent = `${seconds}`;
  refs.minutesEl.textContent = `${minutes}`;
  refs.hoursEl.textContent = `${hours}`;
  refs.daysEl.textContent = `${days}`;
}
