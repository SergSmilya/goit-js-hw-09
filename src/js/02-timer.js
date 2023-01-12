// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   // minDate: 'today',
//   onClose(selectedDates) {
//     console.log(selectedDates[0]);
//   },
// };

// const instance = flatpickr('#datetime-picker', options);
// const DEFAULTDAY = instance.config.defaultDate.getTime();
// console.log(DEFAULTDAY);

// const refs = {
//   startBtn: document.querySelector('[data-start]'),
// };

// refs.startBtn.setAttribute('disabled', true);

// instance.config.onChange.push(function (selectedDates, dateStr, instance) {
//   const SELECTEDDAYS = selectedDates[0].getTime();
//   console.log(SELECTEDDAYS);

//   if (SELECTEDDAYS > DEFAULTDAY) {
//     refs.startBtn.removeAttribute('disabled', true);
//   } else {
//     refs.startBtn.setAttribute('disabled', true);
//     Notify.success('Please choose a date in the future');
//   }
// });

const timer = {
  start() {
    const startTime = Date.now();

    // setInterval(() => {
    //   const currentTime = Date.now();
    //   const retailTime = currentTime - startTime;
    //   const { days, hours, minutes, seconds } = convertMs(retailTime);

    //   console.log(`${seconds}`);
    // }, 1000);
  },

  stop() {},
};

timer.start();

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
