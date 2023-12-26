import createBoard from './board';
import { createComputerDisplay } from './computer';
import { createGuessList } from './guesses';
import { createPlayerDisplay } from './player';

const initialSetup = () => {
  const boardContainer = document.querySelector('#board-container');
  const board = createBoard();
  boardContainer.append(board);

  const guessesContainer = document.querySelector('#guesses-container');
  const guessList = createGuessList();
  guessesContainer.append(guessList);

  const computerContainer = document.querySelector('#computer-container');
  const computerDisplayDiv = createComputerDisplay();
  computerContainer.append(computerDisplayDiv);

  const playerContainer = document.querySelector('#player-container');
  const playerDisplayDiv = createPlayerDisplay();
  playerContainer.append(playerDisplayDiv);
};

export default initialSetup;
