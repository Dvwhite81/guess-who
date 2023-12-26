import { showCancelBtn, showDoneBtn } from './button-helpers';
import { newGame } from './game';
import { addFinalAnswerListeners } from './game-helpers';
import {
  getConfirmGuessContent,
  getEndGameContent,
  getFinalAnswerContent,
  getHelpContent,
  getLetterModalContent,
  getPrevGuessesContent,
  getResponseContent,
  getYourCardContent,
} from './modal-content';
import {
  handleAutoClose,
  handleBtns,
  handleContent,
  validateInput,
} from './modal-helpers';

const openModal = (content, func, autoClose) => {
  const modal = document.querySelector('#mainModal');

  handleContent(modal, content);
  handleBtns(modal, func);

  handleAutoClose(modal, autoClose, func);

  modal.style.display = 'flex';
};

const closeModal = () => {
  const modal = document.querySelector('#mainModal');
  modal.style.display = 'none';
};

const openConfirmGuessModal = () => {
  const content = getConfirmGuessContent();
  const func = undefined;
  const autoClose = false;

  openModal(content, func, autoClose);
};

const openEndGameModal = (name, cpuCard) => {
  const content = getEndGameContent(name, cpuCard);
  const func = newGame;
  const autoClose = false;

  openModal(content, func, autoClose);
};

const openYourCardModal = () => {
  const content = getYourCardContent();
  const func = undefined;
  const autoClose = false;

  openModal(content, func, autoClose);
};

const openFinalAnswerModal = () => {
  addFinalAnswerListeners();
  showCancelBtn();

  const content = getFinalAnswerContent();
  const func = undefined;
  const autoClose = false;

  openModal(content, func, autoClose);
};

const openHelpModal = () => {
  const content = getHelpContent();
  const func = undefined;
  const autoClose = false;

  openModal(content, func, autoClose);
};

const openResponseModal = (question, hasTrait, isPlayerGuess) => {
  const content = getResponseContent(question, hasTrait, isPlayerGuess);
  const func = isPlayerGuess ? showDoneBtn : undefined;
  const autoClose = true;

  openModal(content, func, autoClose);
};

const openPrevGuessesModal = (player) => {
  const content = getPrevGuessesContent(player);
  const func = undefined;
  const autoClose = true;

  openModal(content, func, autoClose);
};

const openGetLetterModal = () => {
  const content = getLetterModalContent();
  const input = content[2];
  const func = () => validateInput(input);
  const autoClose = false;

  openModal(content, func, autoClose);
};

export {
  closeModal,
  openConfirmGuessModal,
  openEndGameModal,
  openFinalAnswerModal,
  openGetLetterModal,
  openHelpModal,
  openPrevGuessesModal,
  openResponseModal,
  openYourCardModal,
};
