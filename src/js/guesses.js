import { playerTurn } from './game';
import { openGetLetterModal, openPrevGuessesModal } from './modal';

const gender = {
  label: 'Gender',
  options: [
    { key: 'man', question: 'Is it a man?' },
    { key: 'woman', question: 'Is it a woman?' },
  ],
};

const hair = {
  label: 'Hair',
  options: [
    { key: 'bald', question: 'Are they bald?' },
    { key: 'white hair', question: 'Do they have white hair?' },
    { key: 'dark hair', question: 'Do they have dark hair?' },
    { key: 'blonde hair', question: 'Do they have blonde hair?' },
    { key: 'red hair', question: 'Do they have red hair?' },
    { key: 'pony tail', question: 'Do they have a pony tail?' },
  ],
};

const eyes = {
  label: 'Eyes',
  options: [
    { key: 'glasses', question: 'Do they have glasses?' },
    { key: 'dark eyes', question: 'Do they have dark eyes?' },
    { key: 'light eyes', question: 'Do they have light eyes?' },
  ],
};

const face = {
  label: 'Face',
  options: [
    { key: 'facial hair', question: 'Do they have facial hair?' },
    { key: 'beard', question: 'Do they have a beard?' },
    { key: 'mustache', question: 'Do they have a mustache?' },
    { key: 'hat or scarf', question: 'Do they have a hat or scarf?' },
    { key: 'earrings', question: 'Do they have any earrings?' },
  ],
};

const skin = {
  label: 'Skin',
  options: [
    { key: 'light skin', question: 'Do they have light skin?' },
    { key: 'dark skin', question: 'Do they have medium or dark skin?' },
  ],
};

const name = {
  label: 'Name',
  options: [{ key: 'name', question: 'Is the letter __ in their name?' }],
};

const categories = [gender, hair, eyes, face, skin, name];

const markGuessed = (guess) => {
  guess.classList.add('strike');
};

const toggleComputerContainer = (type) => {
  const rightContainer = document.querySelector('#right-container');
  const isHidden = rightContainer.classList.contains('hide');
  if (type === 'hide') {
    if (!isHidden) {
      rightContainer.classList.add('hide');
    }
  } else if (type === 'show') {
    rightContainer.classList.remove('hide');
  }
};

const toggleGridColumns = (type) => {
  const gameContainer = document.querySelector('#game-container');
  const isChanged = gameContainer.classList.contains('two-columns');
  if (type === 'hide') {
    if (!isChanged) {
      gameContainer.classList.add('two-columns');
    }
  } else if (type === 'show') {
    gameContainer.classList.remove('two-columns');
  }
};

const toggleGuessesWidth = (type) => {
  const guessesContainer = document.querySelector('#guesses-container');
  const isDoubled = guessesContainer.classList.contains('double-width');

  if (type === 'hide') {
    if (!isDoubled) {
      guessesContainer.classList.add('double-width');
    }
  } else if (type === 'show') {
    guessesContainer.classList.remove('double-width');
  }
};

const closeOtherSubLists = (subList) => {
  const { id } = subList;
  const allSubLists = document.querySelectorAll('.guess-sublist');
  for (const otherList of allSubLists) {
    if (otherList.id !== id) {
      otherList.classList.add('closed');
    }
  }
};

const addGuessListeners = () => {
  const guessItems = document.querySelectorAll('.choice');
  for (const choice of guessItems) {
    const question = choice.textContent;
    if (question === 'Is the letter __ in their name?') {
      choice.addEventListener('click', openGetLetterModal);
    } else {
      choice.addEventListener('click', (e) => playerTurn(e, question));
    }
  }
};

const createPrevGuessList = (player) => {
  const prevGuesses = document.createElement('p');
  prevGuesses.className = 'sublist-label';
  prevGuesses.textContent = 'Guesses';

  prevGuesses.addEventListener('click', () => openPrevGuessesModal(player));
  return prevGuesses;
};

const showGuesses = (subList) => {
  toggleComputerContainer('hide');
  toggleGridColumns('hide');
  toggleGuessesWidth('hide');
  subList.classList.toggle('double-width');
};

const hideGuesses = () => {
  toggleComputerContainer('show');
  toggleGridColumns('show');
  toggleGuessesWidth('show');
};

const checkAllClosed = () => {
  const allSubLists = document.querySelectorAll('.guess-sublist');
  let allClosed = true;

  for (const list of allSubLists) {
    if (!list.classList.contains('closed')) {
      allClosed = false;
    }
  }

  if (allClosed) {
    hideGuesses();
  }
};

const toggleOpen = (subList) => {
  subList.classList.toggle('closed');
  closeOtherSubLists(subList);
  showGuesses(subList);
  checkAllClosed();
};

const createSubList = (category) => {
  const { label } = category;

  const topItem = document.createElement('li');
  topItem.className = 'category';

  const topA = document.createElement('a');
  topA.className = 'sublist-label';
  topA.textContent = label;
  topItem.append(topA);

  const subList = document.createElement('ul');
  subList.id = `${label}-sublist`;
  subList.className = 'guess-sublist closed';

  const { options } = category;
  for (const option of options) {
    const li = document.createElement('li');
    li.className = 'guess-sublist-li choice';
    li.textContent = option.question;
    subList.append(li);
  }

  topItem.append(subList);
  topA.addEventListener('click', () => toggleOpen(subList));

  return topItem;
};

const createGuessList = () => {
  const list = document.querySelector('#guesses-list');

  for (const category of categories) {
    const subList = createSubList(category);
    list.append(subList);
  }
  return list;
};

export {
  addGuessListeners,
  categories,
  createGuessList,
  createPrevGuessList,
  hideGuesses,
  markGuessed,
};
