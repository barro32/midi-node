import frequencies from './frequencies';

export default class Board {
	constructor(notes, beats) {
		this.notes = notes;
		this.beats = beats;
		this.tiles = [];
		this.beat = 0;
		this.frequencies = frequencies;

		this.audioContext = new window.AudioContext();
		this.build();
	}

	build() {
		const board = document.querySelector('.board');
		for (let note = 0; note < this.notes; note++) {
			for (let beat = 0; beat < this.beats; beat++) {
				let tile = document.createElement('div');
				tile.classList.add('tile', `tile-${note}-${beat}`);
				tile.classList.toggle('beat', !(beat % 2));
				tile.dataset.beat = beat;
				tile.dataset.note = note;
				tile.dataset.frequency = this.frequencies[note];
				board.appendChild(tile);
			}
		}
		this.tiles = document.querySelectorAll('.tile');
	}

	clearBoard() {
		for (let tile of this.tiles) {
			tile.classList.remove('player');
		}
	}

	addPlayer(player) {
		if (!this.players || !this.players.length) {
			this.players = [];
		}
		this.players.push(player);
	}

	drawPlayers() {
		this.clearBoard();
		this.players.forEach(player => {
			const tileClass = `tile-${player.note}-${player.beat}`;
			const tile = document.getElementsByClassName(tileClass);
			tile[0].classList.add('player');
		});
	}

	step() {
		[...this.tiles].forEach(tile => {
			tile.classList.remove('now');
			if (Number(tile.getAttribute('data-beat')) === this.beat) {
				tile.classList.add('now');
				if (tile.classList.contains('mark')) {
					this.playSound(tile.getAttribute('data-frequency'));
				}
			}
		});
		this.beat = this.beat < this.beats ? this.beat + 1 : 0;
	}

	markTile(note, beat) {
		document.querySelector(`.tile-${note}-${beat}`).classList.add('mark');
	}

	playSound(freq) {
		let osc = this.audioContext.createOscillator();
		osc.frequency.value = freq;
		osc.connect(this.audioContext.destination);
		osc.start();
		osc.stop(this.audioContext.currentTime + 0.5);
	}
}
