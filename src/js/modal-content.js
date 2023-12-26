import { getGuessList } from './game';
import { buildElement, buildSubmitBtn, handleWinner } from './modal-helpers';

const getConfirmGuessContent = () => {
  const h2 = buildElement('h2', 'You already asked that!');
  const p = buildElement('p', 'Pick a different question next time');
  const btn = buildSubmitBtn('Oops');

  return [h2, p, btn];
};

const getEndGameContent = (name, cpuCard) => {
  const h2 = buildElement('h2', `${name} won!`);
  const correctAnswer = handleWinner(name, cpuCard);

  const p = buildElement('p', 'Play again?');
  const btn = buildSubmitBtn('Sure');

  return correctAnswer === undefined
    ? [h2, p, btn]
    : [h2, correctAnswer, p, btn];
};

const getYourCardContent = () => {
  const h2 = buildElement('h2', "That's your card!");
  const p1 = buildElement('p', 'The computer does not have the same card');
  const p2 = buildElement('p', 'Click on other cards to eliminate them!');
  const btn = buildSubmitBtn('OK');

  return [h2, p1, p2, btn];
};

const getFinalAnswerContent = () => {
  const h2 = buildElement('h2', 'Ready to answer?');
  const p1 = buildElement('p', 'Click on a card to guess');
  const p2 = buildElement('p', 'If your guess is wrong, you will lose!');
  const btn = buildSubmitBtn('OK');

  return [h2, p1, p2, btn];
};

const getHelpContent = () => {
  const h2 = buildElement('h2', 'Click on a guess from the left side');
  const p1 = buildElement('p', "Then flip cards that don't match the answer");
  const p2 = buildElement('p', 'If you are done flipping, click Done');
  const p3 = buildElement('p', 'To submit an answer, click Answer');
  const btn = buildSubmitBtn('OK');

  return [h2, p1, p2, p3, btn];
};

const getResponseContent = (question, hasTrait, isPlayerGuess) => {
  const response = hasTrait === true ? 'Yes!' : 'No';
  const ul = document.createElement('ul');
  const btn = buildSubmitBtn('OK');

  if (!isPlayerGuess) {
    const cpuLi = buildElement('li', 'Computer Guess');
    cpuLi.style.textDecoration = 'underline';
    ul.append(cpuLi);
  }
  const qLi = buildElement('li', question);
  const rLi = buildElement('li', response);
  ul.append(qLi, rLi);

  return [ul, btn];
};

const getPrevGuessesContent = (player) => {
  const list = getGuessList(player);
  const ul = document.createElement('ul');
  const btn = buildSubmitBtn('OK');

  if (list.length > 0) {
    const items = list.map((i) => {
      const { hasTrait, question } = i;
      const response = hasTrait === true ? 'Yes!' : 'No';
      return buildElement('li', `${question} - ${response}`);
    });

    ul.append(...items);
  } else {
    const li = buildElement('li', 'No Guesses Yet!');
    ul.append(li);
  }

  return [ul, btn];
};

const getLetterModalContent = () => {
  const h2 = buildElement('h2', 'Enter a letter to guess');
  const hiddenP = buildElement('p', 'Please enter a valid letter');
  hiddenP.style.visibility = 'hidden';
  const input = document.createElement('input');
  input.id = 'guess-again';
  const btn = buildSubmitBtn('Submit');

  return [h2, hiddenP, input, btn];
};

export {
  getConfirmGuessContent,
  getEndGameContent,
  getFinalAnswerContent,
  getHelpContent,
  getLetterModalContent,
  getPrevGuessesContent,
  getResponseContent,
  getYourCardContent,
};
