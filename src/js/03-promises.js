import Notiflix from 'notiflix';

const formElements = {
  delayInput: document.querySelector('input[name=delay]'),
  stepInput: document.querySelector('input[name=step]'),
  amountInput: document.querySelector('input[name=amount]'),
  submitButton: document.querySelector('button[type=submit]'),
  form: document.querySelector('.form'),
};

formElements.form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const firstDelay = Number(formElements.delayInput.value);
  const step = Number(formElements.stepInput.value);
  const amount = Number(formElements.amountInput.value);

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
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        rejectedPromises.push({ position, delay });
      });

    promises.push(promise);
  }

  Promise.all(promises)
    .then(() => {
      formElements.form.reset();
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
