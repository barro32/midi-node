import Board from './Board.js';
import Player from './Player.js';

const board = new Board(8, 16);
const player = new Player(1, 2);
board.addPlayer(player);
board.drawPlayers();

const loop = window.setInterval(board.drawPlayers.bind(board), 500);

document.addEventListener('keydown', (e) => {
	player.input(e.key);
});
