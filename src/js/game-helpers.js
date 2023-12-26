import { hideCancelBtn } from './button-helpers';
import { checkForWin } from './game';

const checkNameForLetter = (player, letter) => {
  const name = [...player.name.toLowerCase()];
  return name.includes(letter);
};

const getFinalAnswerPlayer = (e) => {
  const name = e.target.id.split('-')[0];
  hideCancelBtn();
  checkForWin(true, name);
};

const addFinalAnswerListeners = () => {
  const allCards = document.querySelectorAll('#board .card');
  for (const card of allCards) {
    if (!card.classList.contains('flipped')) {
      card.addEventListener('click', getFinalAnswerPlayer);
    }
  }
};

const removeFinalAnswerListeners = () => {
  const allCards = document.querySelectorAll('#board .card');
  for (const card of allCards) {
    if (!card.classList.contains('flipped')) {
      card.removeEventListener('click', getFinalAnswerPlayer);
    }
  }
};

export {
  addFinalAnswerListeners,
  checkNameForLetter,
  removeFinalAnswerListeners,
};
