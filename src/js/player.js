import { createCard, flipAllCards, flipCard, getRandomPerson } from './cards';
import { createPrevGuessList } from './guesses';

const createPlayerDisplay = () => {
  const displayDiv = document.createElement('div');
  displayDiv.id = 'player-display';

  const h1 = document.createElement('h1');
  h1.id = 'player-h1';
  h1.textContent = 'You:';

  const playerName = document.createElement('h2');
  playerName.id = 'player-name';

  displayDiv.append(h1, playerName);
  return displayDiv;
};

const cloneCard = (name) => {
  const playerCard = createCard(name);
  const playerContainer = document.querySelector('#player-container');
  playerContainer.append(playerCard);
};

const addPlayerGuessList = () => {
  const playerContainer = document.querySelector('#player-container');
  const prevGuesses = createPrevGuessList('player');

  playerContainer.append(prevGuesses);
};

const switchCardElement = (name) => {
  const card = document.querySelector(`#${name}-card`);
  card.classList.add('selected');
  setTimeout(() => {
    flipCard(card);
    cloneCard(name);
    addPlayerGuessList();
  }, 1000);

  setTimeout(() => {
    card.classList.remove('selected');
    flipAllCards();
  }, 3000);
};

const flash = () => {
  const name = getRandomPerson();
  const card = document.querySelector(`#${name}-card`);
  card.classList.add('selected');
  setTimeout(() => {
    card.classList.remove('selected');
  }, 100);
};

const selectionAnimation = (name) => {
  let count = 30;

  const loop = () => {
    if (count < 1) {
      switchCardElement(name);
    } else {
      count -= 1;
      flash();
      setTimeout(() => {
        loop();
      }, 100);
    }
  };

  loop();
};

const getPlayerCard = (cpuCard) => {
  let found = false;
  let name;
  while (!found) {
    name = getRandomPerson();
    if (name !== cpuCard) {
      found = true;
    }
  }
  return name;
};

const playerSetup = (name) => {
  selectionAnimation(name);
};

export { createPlayerDisplay, getPlayerCard, playerSetup };
