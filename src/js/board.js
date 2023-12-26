import { flipCard, getAllCards } from './cards';

const createBoard = () => {
  const board = document.createElement('div');
  board.id = 'board';
  const cards = getAllCards();
  for (const card of cards) {
    flipCard(card);
    board.append(card);
  }
  return board;
};

export default createBoard;
