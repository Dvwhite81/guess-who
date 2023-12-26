import { startComputerTurn } from './game';
import { removeFinalAnswerListeners } from './game-helpers';
import { openFinalAnswerModal, openHelpModal } from './modal';

const showDoneBtn = () => {
  const doneBtn = document.querySelector('#end-guess-btn');
  doneBtn.style.visibility = 'visible';

  doneBtn.addEventListener(
    'click',
    () => {
      doneBtn.style.visibility = 'hidden';
      startComputerTurn();
    },
    { once: true },
  );
};

const showHelpBtn = () => {
  const helpBtn = document.querySelector('#help-btn');
  helpBtn.addEventListener('click', openHelpModal);
};

const hideCancelBtn = () => {
  const cancelBtn = document.querySelector('#cancel-answer-btn');
  const logo = document.querySelector('#header-img');
  removeFinalAnswerListeners();
  cancelBtn.style.display = 'none';
  logo.style.display = 'flex';
};

const showCancelBtn = () => {
  const cancelBtn = document.querySelector('#cancel-answer-btn');
  const logo = document.querySelector('#header-img');
  cancelBtn.style.display = 'flex';
  logo.style.display = 'none';
  cancelBtn.addEventListener('click', hideCancelBtn, { once: true });
};

const showFinalAnswerBtn = () => {
  const finalAnswerBtn = document.querySelector('#final-answer-btn');
  finalAnswerBtn.style.visibility = 'visible';
  finalAnswerBtn.addEventListener('click', openFinalAnswerModal);
};

const hideFinalAnswerBtn = () => {
  const finalAnswerBtn = document.querySelector('#final-answer-btn');
  finalAnswerBtn.style.visibility = 'hidden';
  finalAnswerBtn.removeEventListener('click', openFinalAnswerModal);
};

export {
  hideCancelBtn,
  hideFinalAnswerBtn,
  showCancelBtn,
  showDoneBtn,
  showFinalAnswerBtn,
  showHelpBtn,
};
