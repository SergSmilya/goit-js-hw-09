import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  formEl: document.querySelector('.form'),
};

const formValue = {};

refs.formEl.addEventListener('click', createFormValue);

function createFormValue(e) {
  formValue[e.target.name] = e.target.value;
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  } else {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  }
}
