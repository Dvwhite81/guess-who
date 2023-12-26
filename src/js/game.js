import {
  hideFinalAnswerBtn,
  showFinalAnswerBtn,
  showHelpBtn,
} from './button-helpers';
import { addCardListeners, getRandomPerson } from './cards';
import CHARACTERS from './characters';
import { applyResults, computerGuess, updateCpuCardCount } from './computer';
import { cpuGetLetterInName } from './computer-helpers';
import { checkNameForLetter } from './game-helpers';
import {
  addGuessListeners,
  categories,
  hideGuesses,
  markGuessed,
} from './guesses';
import {
  openConfirmGuessModal,
  openEndGameModal,
  openResponseModal,
} from './modal';
import { getPlayerCard, playerSetup } from './player';
import initialSetup from './setup';

let cpuCard;
let playerCard;
let isPlayerTurn;
let playerGuesses;
let cpuGuesses;
let possiblePeople;

const startGame = () => {
  playerGuesses = [];
  cpuGuesses = [];
  possiblePeople = CHARACTERS;
  isPlayerTurn = true;
  cpuCard = getRandomPerson();
  playerCard = getPlayerCard(cpuCard);
  playerSetup(playerCard);
  addCardListeners(playerCard);
  showHelpBtn();
  addGuessListeners();
};

const endGame = (winner) => {
  const name = winner === 'player' ? 'You' : 'The Computer';
  openEndGameModal(name, cpuCard);
};

const playerGuess = (question, trait) => {
  const cpu = CHARACTERS.find((c) => c.name === cpuCard);
  const hasTrait = cpu.traits.includes(trait);
  hideGuesses();
  openResponseModal(question, hasTrait, true);
  return { question, hasTrait };
};

const getTrait = (categoryLabel, question) => {
  const category = categories.find((c) => c.label === categoryLabel);
  const { options } = category;
  const choice = options.find((o) => o.question === question);
  return choice.key;
};

const playerTurn = (e, question) => {
  if (!isPlayerTurn) {
    return;
  }
  if (e.target.classList.contains('strike')) {
    openConfirmGuessModal();
  }
  hideFinalAnswerBtn();
  markGuessed(e.target);
  const subList = e.target.parentElement;
  subList.classList.add('closed');
  const categoryLabel = subList.id.split('-')[0];
  const trait = getTrait(categoryLabel, question);
  const guessObj = playerGuess(question, trait);
  playerGuesses.push(guessObj);
  isPlayerTurn = false;
};

const checkForWin = (isPlayer, finalAnswer) => {
  const winner =
    (isPlayer && finalAnswer === cpuCard) ||
    (!isPlayer && finalAnswer !== playerCard)
      ? 'player'
      : 'computer';
  endGame(winner);
};

const startComputerTurn = () => {
  if (possiblePeople.length === 1) {
    const finalAnswer = possiblePeople[0].name;
    checkForWin(false, finalAnswer);
  }
  const { label, question } = computerGuess(cpuGuesses);

  let guessObj;
  let trait;
  let hasTrait;
  const player = CHARACTERS.find((c) => c.name === playerCard);

  if (question === 'Is the letter __ in their name?') {
    const letter = cpuGetLetterInName();
    trait = { type: 'letter', letter };
    hasTrait = checkNameForLetter(player, letter);

    const letterQuestion = `Is the letter ${letter.toUpperCase()} in their name?`;
    guessObj = { letterQuestion, hasTrait };
    openResponseModal(letterQuestion, hasTrait, false);
  } else {
    trait = getTrait(label, question);
    hasTrait = player.traits.includes(trait);
    guessObj = { question, hasTrait };
    openResponseModal(question, hasTrait, false);
  }

  cpuGuesses.push(guessObj);
  possiblePeople = applyResults(trait, hasTrait, possiblePeople);
  updateCpuCardCount(possiblePeople);
  isPlayerTurn = true;
  showFinalAnswerBtn();
};

const getGuessList = (player) => {
  return player === 'player' ? playerGuesses : cpuGuesses;
};

const handlePlayerGuessLetter = (letter) => {
  const cpuObj = { name: cpuCard };
  const question = `Is the letter ${letter} in their name?`;
  const hasTrait = checkNameForLetter(cpuObj, letter);
  document.querySelector('#Name-sublist').classList.add('closed');
  hideGuesses();
  openResponseModal(question, hasTrait, true);
};

const resetGame = () => {
  const board = document.querySelector('#board');
  board.remove();
  const computerContainer = document.querySelector('#computer-container');
  computerContainer.innerHTML = '';
  const playerContainer = document.querySelector('#player-container');
  playerContainer.innerHTML = '';
  const guessList = document.querySelector('#guesses-list');
  guessList.innerHTML = '';
};

const newGame = () => {
  resetGame();
  initialSetup();
  startGame();
};

export {
  checkForWin,
  getGuessList,
  handlePlayerGuessLetter,
  newGame,
  playerTurn,
  startComputerTurn,
  startGame,
};
