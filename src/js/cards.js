import { openYourCardModal } from './modal';

const names = [
  'Al',
  'Amy',
  'Ben',
  'Carmen',
  'Daniel',
  'David',
  'Emma',
  'Eric',
  'Farah',
  'Gabe',
  'Joe',
  'Jordan',
  'Katie',
  'Laura',
  'Leo',
  'Lily',
  'Liz',
  'Mia',
  'Mike',
  'Nick',
  'Olivia',
  'Rachel',
  'Sam',
  'Sofia',
];

const createCard = (name) => {
  const card = document.createElement('div');
  card.id = `${name}-card`;
  card.className = 'card';

  const img = document.createElement('img');
  img.id = `${name}-img`;
  img.className = 'card-img';
  img.src = `/${name}.png`;

  const p = document.createElement('p');
  p.className = 'card-name';
  p.textContent = name;

  card.append(img, p);
  return card;
};

const createFlippedCard = () => {
  const div = document.createElement('div');
  div.className = 'card-back';
  const img = document.createElement('img');
  img.className = 'img-flipped';
  img.src = '/logo-transparent.png';
  div.append(img);
  return div;
};

const flipCard = (card) => {
  const isFlipped = card.classList.contains('flipped');
  if (isFlipped) {
    const img = card.querySelector('.card-back');
    img.remove();
  } else {
    card.append(createFlippedCard());
  }
  card.classList.toggle('flipped');
};

const addCardListeners = (name) => {
  const cards = document.querySelectorAll('#board .card');
  for (const card of cards) {
    if (card.id === `${name}-card`) {
      card.addEventListener('click', openYourCardModal);
    } else {
      card.addEventListener('click', () => flipCard(card));
    }
  }
};

const getRandomPerson = () => {
  const index = Math.floor(Math.random() * names.length);
  return names[index];
};

const getAllCards = () => {
  const used = [];
  const cards = [];
  while (cards.length < names.length) {
    const person = getRandomPerson();
    if (!used.includes(person)) {
      used.push(person);
      cards.push(createCard(person));
    }
  }
  return cards;
};

const flipAllCards = () => {
  const cards = document.querySelectorAll('#board .card');
  for (const card of cards) {
    flipCard(card);
  }
};

export {
  addCardListeners,
  createCard,
  flipAllCards,
  flipCard,
  getAllCards,
  getRandomPerson,
  names,
};
