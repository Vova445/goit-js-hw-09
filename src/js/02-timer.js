import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const elements = {
  input: document.getElementById('datetime-picker'),
  start: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  timer: document.querySelector('.timer'),
};

elements.start.disabled = true;


elements.timer.style.cssText = `
  margin-top: 40px;
  text-align: center;
  font-family: 'Arial, sans-serif';
  color: #fff; 
  background: linear-gradient(45deg, #FF5733, #FF7733); 
  padding: 20px;
  border: 3px solid #FF2200;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(255, 34, 0, 0.4);
`;

elements.start.style.cursor = 'not-allowed';
const disabledButtonStyles = `
  background-color: #ff6666;
  color: #fff;
  cursor: not-allowed;
`;

const activeButtonStyles = `
  background-color: #66ff66;
  color: #fff;
  cursor: pointer;
`;

const hoverButtonStyles = `
  background-color: #55cc55;
`;

elements.start.addEventListener('mouseenter', () => {
  if (!elements.start.disabled) {
    elements.start.style.cssText = activeButtonStyles + hoverButtonStyles;
  }
});

elements.start.addEventListener('mouseleave', () => {
  if (!elements.start.disabled) {
    elements.start.style.cssText = activeButtonStyles;
  }
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      Notiflix.Notify.warning('Введіть дату майбутнього');
      elements.start.disabled = true;
      elements.start.style.cssText = disabledButtonStyles;
    } 
    else {
      Notiflix.Notify.success('Натисніть старт ');
      elements.start.disabled = false;
      elements.start.style.cssText = activeButtonStyles;
    }
    picker.selectedDate = selectedDate;
  },
};

const picker = flatpickr(elements.input, options);

function lookOutTime() {
  const selectedDate = picker.selectedDate;
  const currentDate = new Date();
  const ms = selectedDate - currentDate;
  console.log(ms);
  convertMs(ms);

  if (ms < 1000) {
    clearInterval(interval);

    elements.days.textContent = '00';
    elements.hours.textContent = '00';
    elements.minutes.textContent = '00';
    elements.seconds.textContent = '00';
  } 
  else {
    const timeObject = convertMs(ms);

    elements.days.textContent = addLeadingZero(timeObject.days);
    elements.hours.textContent = addLeadingZero(timeObject.hours);
    elements.minutes.textContent = addLeadingZero(timeObject.minutes);
    elements.seconds.textContent = addLeadingZero(timeObject.seconds);
  }
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  console.log({ days, hours, minutes, seconds });
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

elements.start.addEventListener('click', () => {
  interval = setInterval(lookOutTime, 1000);
});
