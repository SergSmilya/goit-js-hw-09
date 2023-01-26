import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmit);

let formData = {};

function onSubmit(e) {
  e.preventDefault();

  values = e.currentTarget.elements;
  fillFormData(values);

  for (let i = 1; i <= formData.amount; i += 1) {
    if (i > 1) formData.delay += formData.step;
    createPromise(i, formData).then(success).catch(error);
  }
}

function fillFormData({ amount, delay, step }) {
  formData.amount = Number(amount.value);
  formData.delay = Number(delay.value);
  formData.step = Number(step.value);
}

function createPromise(position, { delay }) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}

function success(result) {
  Notify.success(`${result}`);
}

function error(error) {
  Notify.failure(`${error}`);
}
