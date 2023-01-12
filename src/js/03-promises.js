import { Notify } from 'notiflix/build/notiflix-notify-aio';
import throttle from 'lodash.throttle';

const refs = {
  formEl: document.querySelector('.form'),
  btnFormEl: document.querySelector('.form button'),
};

const formValue = {};
let count = 1;
let step = 0;

refs.formEl.addEventListener('input', throttle(onRecordValueFormData, 250));
refs.btnFormEl.addEventListener('click', onCreatePromiseHandleButton);

function onRecordValueFormData(e) {
  formValue[e.target.name] = e.target.value;
}

function onCreatePromiseHandleButton(e) {
  e.preventDefault();

  const intervalId = setInterval(() => {
    if (count > Number(formValue.amount)) {
      clearInterval(intervalId);
      return;
    }
    step += Number(formValue.step);

    createPromise(count, Number(formValue.delay), step)
      .then(success)
      .catch(error);
  }, Number(formValue.step));

  refs.formEl.reset();
}

function createPromise(position, delay, step) {
  count += 1;

  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${step}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${step}ms`);
      }
    }, delay);
  });
}

function success(result) {
  console.log(result);
  Notify.success(`${result}`);
}

function error(error) {
  console.log(error);
  Notify.failure(`${error}`);
}
