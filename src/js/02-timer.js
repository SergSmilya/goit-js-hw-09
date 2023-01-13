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
    // console.log(selectedDates[0]);
  },
};

const instance = flatpickr('#datetime-picker', options);
const DEFAULTTIME = instance.config.now.getTime();

const refs = {
  startBtn: document.querySelector('[data-start]'),
};

refs.startBtn.setAttribute('disabled', true);

refs.startBtn.addEventListener('click', onStartTimer);

function onStartTimer() {}

instance.config.onClose.push(function (selectedDates) {
  let choseTime = selectedDates[0].getTime();

  if (DEFAULTTIME < choseTime) {
    refs.startBtn.removeAttribute('disabled', true);
  } else {
    refs.startBtn.setAttribute('disabled', true);
    Notify.success('Please choose a date in the future');
  }

  let differenceTime = choseTime - DEFAULTTIME;

  // const intervalID = setInterval(() => {
  //   differenceTime -= 1000;

  //   console.log(convertMs(differenceTime));
  // }, 1000);
});

console.log(instance.config.onClose);

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
