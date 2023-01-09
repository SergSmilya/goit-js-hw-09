import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  minDate: 'today',

  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

const instance = flatpickr('#datetime-picker', options);
const DEFAULTDAY = instance.config.defaultDate.getTime();
const refs = {
  startBtn: document.querySelector('[data-start]'),
};
console.dir(instance);
refs.startBtn.setAttribute('disabled', true);

instance.config.onChange.push(function (selectedDates, dateStr, instance) {
  const SELECTEDDAYS = selectedDates[0].getTime();

  if (SELECTEDDAYS < DEFAULTDAY) {
    alert('Please choose a date in the future');
    return;
  }
  if (SELECTEDDAYS > DEFAULTDAY)
    refs.startBtn.removeAttribute('disabled', true);
});
