import 'the-new-css-reset/css/reset.css';
import '../styles/style.css';
import { startGame } from './game';
import initialSetup from './setup';
// Allow dist on git for vercel

initialSetup();
startGame();
