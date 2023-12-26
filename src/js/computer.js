import {
  getUsedQuestions,
  getValidOptions,
  handleLetter,
  handleOtherGuesses,
} from './computer-helpers';
import { createPrevGuessList } from './guesses';

const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const letters = [...alphabet];

const createComputerDisplay = () => {
  const displayDiv = document.createElement('div');
  displayDiv.id = 'computer-display';

  const count = document.createElement('h2');
  count.id = 'computer-count';
  count.textContent = 23;

  const cardImg = document.createElement('img');
  cardImg.id = 'computer-card';
  cardImg.className = 'card';
  cardImg.src = '/card-back.png';

  const prevGuesses = createPrevGuessList('computer');

  displayDiv.append(count, cardImg, prevGuesses);
  return displayDiv;
};

const computerGuess = (cpuGuesses) => {
  const usedQuestions = getUsedQuestions(cpuGuesses);
  const validGuessOptions = getValidOptions(cpuGuesses, usedQuestions);

  const randomIndex = Math.floor(Math.random() * validGuessOptions.length);
  return validGuessOptions[randomIndex];
};

const applyResults = (trait, hasTrait, possiblePeople) => {
  possiblePeople =
    typeof trait === 'object'
      ? handleLetter(trait, possiblePeople)
      : handleOtherGuesses(trait, hasTrait, possiblePeople);
  return possiblePeople;
};

const updateCpuCardCount = (possiblePeople) => {
  const countElement = document.querySelector('#computer-count');
  countElement.textContent = possiblePeople.length;
};

export {
  applyResults,
  computerGuess,
  createComputerDisplay,
  letters,
  updateCpuCardCount,
};
