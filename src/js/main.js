import Board from './Board.js';
import Player from './Player.js';

const board = new Board(8, 16);
board.build();
const player = new Player(0, 0);

document.addEventListener('keydown', (e) => {
	player.input(e.key);
});
