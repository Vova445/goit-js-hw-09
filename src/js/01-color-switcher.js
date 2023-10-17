const body = document.querySelector('body');
const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
let intervalId;

function generateRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function randomBackgroundColor() {
  body.style.backgroundColor = generateRandomHexColor();
}

startColorChanging();
function startColorChanging() {
  intervalId = setInterval(randomBackgroundColor, 1000);
  startButton.disabled = true;
  stopButton.disabled = false;

  // CSS кнопок
  startButton.style.fontSize = '18px';
  startButton.style.padding = '10px 20px';
  startButton.style.margin = '10px';

  stopButton.style.fontSize = '18px';
  stopButton.style.padding = '10px 20px';
  stopButton.style.margin = '10px';

  // Центрування контейнера
  const buttonsContainer = document.createElement('div');
  buttonsContainer.style.textAlign = 'center';
  buttonsContainer.appendChild(startButton);
  buttonsContainer.appendChild(stopButton);
  document.body.appendChild(buttonsContainer);
}

function stopColorChanging() {
  clearInterval(intervalId);
  startButton.disabled = false;
  stopButton.disabled = true;
}

startButton.addEventListener('click', startColorChanging);
stopButton.addEventListener('click', stopColorChanging);
