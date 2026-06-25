import Board from './js/Board';
import Player from './js/Player';

const board = new Board(8, 16);
const player = new Player(1, 2, board);
let beatLoop;
let playerLoop;
let tempo = 120;

board.addPlayer(player);
board.drawPlayers();

function beatDuration() {
	return 60000 / tempo / 2;
}

function start() {
	board.resumeAudio();
	window.clearInterval(beatLoop);
	window.clearInterval(playerLoop);
	playerLoop = window.setInterval(board.drawPlayers.bind(board), 50);
	beatLoop = window.setInterval(board.step.bind(board), beatDuration());
}

function stop() {
	window.clearInterval(beatLoop);
	window.clearInterval(playerLoop);
}

start();

document.addEventListener('keydown', e => {
	if (e.key === ' ') e.preventDefault();
	player.input(e.key);
});

const controls = document.querySelectorAll('.controls button');
[...controls].forEach(c => c.addEventListener('click', () => player.input(c.dataset.key)));

document.querySelector('.transport__start').addEventListener('click', start);
document.querySelector('.transport__stop').addEventListener('click', stop);
document.querySelector('.transport__clear').addEventListener('click', () => board.clearMarks());

document.querySelector('.layer-toggle__input').addEventListener('change', e => {
	board.setLayer(e.target.checked ? 'drums' : 'synth');
	document.querySelector('.layer-toggle__label').textContent = e.target.checked ? 'drums' : 'synth';
});

document.querySelector('.synth__waveform').addEventListener('change', e => {
	board.setWaveform(e.target.value);
});

document.querySelector('.synth__volume').addEventListener('input', e => {
	board.setVolume(e.target.value);
});

document.querySelector('.transport__tempo').addEventListener('input', e => {
	tempo = Number(e.target.value);
	document.querySelector('.transport__tempo-value').textContent = tempo;
	start();
});
