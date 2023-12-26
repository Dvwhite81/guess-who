import { letters } from './computer';
import { handlePlayerGuessLetter } from './game';
import { closeModal } from './modal';

const buildElement = (type, text) => {
  const element = document.createElement(type);
  element.textContent = text;
  return element;
};

const buildSubmitBtn = (btnText) => {
  const btn = buildElement('button', btnText);
  btn.className = 'modal-submit';
  return btn;
};

const validateInput = (input) => {
  const { value } = input;
  if (letters.includes(value.toLowerCase())) {
    closeModal();
    handlePlayerGuessLetter(value);
  } else {
    const hiddenP = document.querySelector('#guess-again');
    hiddenP.style.visibility = 'visible';
    input.value = '';
  }
};

const handleWinner = (name, cpuCard) => {
  return name === 'The Computer'
    ? buildElement('p', `The answer was ${cpuCard}`)
    : undefined;
};

const handleContent = (modal, content) => {
  const contentDiv = modal.querySelector('.modal-content');
  contentDiv.innerHTML = '';

  for (const el of content) {
    contentDiv.append(el);
  }
};

const handleBtns = (modal, func) => {
  const closeBtn = modal.querySelector('.modal-close');
  closeBtn.addEventListener('click', closeModal);
  const submit = modal.querySelector('.modal-submit');

  if (func === undefined) {
    submit.addEventListener('click', closeModal);
  } else {
    submit.addEventListener('click', () => {
      closeModal();
      func();
    });
  }
};

const handleAutoClose = (modal, autoClose, func) => {
  if (autoClose) {
    const submitBtn = modal.querySelector('.modal-submit');
    submitBtn.style.visibility = 'hidden';
    setTimeout(() => {
      closeModal();
      submitBtn.style.visibility = 'visible';
      if (func !== undefined) {
        func();
      }
    }, 2000);
  }
};

export {
  buildElement,
  buildSubmitBtn,
  handleAutoClose,
  handleBtns,
  handleContent,
  handleWinner,
  validateInput,
};
