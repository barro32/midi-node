import Board from './Board.js';
import Player from './Player.js';

const board = new Board(8, 16);
board.build();
const player = new Player(1, 2);
console.log(player);
board.addPlayer(player);

// const loop = window.setInterval(board.drawPlayers.bind(board), 500);

document.addEventListener('keydown', (e) => {
	player.input(e.key);
});
