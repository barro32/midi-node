import Board from './js/Board';
import Player from './js/Player';

const board = new Board(8, 16);
const player = new Player(1, 2, board);
board.addPlayer(player);
board.drawPlayers();

const playerLoop = window.setInterval(board.drawPlayers.bind(board), 500);
const beatLoop = window.setInterval(board.step.bind(board), 500);

document.addEventListener('keydown', e => player.input(e.key));
