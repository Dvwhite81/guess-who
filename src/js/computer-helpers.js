import { letters } from './computer';
import { checkNameForLetter } from './game-helpers';
import { categories } from './guesses';

const getUsedQuestions = (cpuGuesses) => {
  const results = [];

  for (const guess of cpuGuesses) {
    results.push(guess.question);
  }
  return results;
};

const getValidOptions = (usedQuestions) => {
  const validGuessOptions = [];

  for (const category of categories) {
    const { label, options } = category;
    for (const option of options) {
      const { question } = option;
      console.log('used:', usedQuestions);
      console.log('Q:', question);
      if (!usedQuestions.includes(question)) {
        const guessObj = { label, question };
        validGuessOptions.push(guessObj);
      }
    }
  }
  return validGuessOptions;
};

const handleLetter = (trait, possiblePeople) => {
  for (const person of possiblePeople) {
    if (checkNameForLetter(person, trait.letter)) {
      possiblePeople = possiblePeople.filter((p) => p !== person);
    }
  }
  return possiblePeople;
};

const handleOtherGuesses = (trait, hasTrait, possiblePeople) => {
  for (const person of possiblePeople) {
    if (
      (hasTrait === true && !person.traits.includes(trait)) ||
      (hasTrait === false && person.traits.includes(trait))
    ) {
      possiblePeople = possiblePeople.filter((p) => p !== person);
    }
  }
  return possiblePeople;
};

const cpuGetLetterInName = () => {
  const randomIndex = Math.floor(Math.random() * letters.length);
  return letters[randomIndex];
};

export {
  cpuGetLetterInName,
  getUsedQuestions,
  getValidOptions,
  handleLetter,
  handleOtherGuesses,
};
