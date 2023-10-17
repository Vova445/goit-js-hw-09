import Notiflix from 'notiflix';

const elements = {
  delay: document.querySelector('input[name=delay]'),
  step: document.querySelector('input[name=step]'),
  amount: document.querySelector('input[name=amount]'),
  btn: document.querySelector('button[type=submit]'),
  form: document.querySelector('.form'),
};

elements.form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const firstDelay = Number(elements.delay.value);
  const step = Number(elements.step.value);
  const amount = Number(elements.amount.value);

  const promises = [];

  const fulfilledPromises = [];
  const rejectedPromises = [];

  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const delay = firstDelay + step * i;

    const promise = createPromise(position, delay);

    promise
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        fulfilledPromises.push({ position, delay });
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
        rejectedPromises.push({ position, delay });
      });

    promises.push(promise);
  }

  Promise.all(promises)
    .then(() => {
      elements.form.reset();
    })
    .catch((error) => {
      console.error(error);
    });
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
