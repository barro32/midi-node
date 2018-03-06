import frequencies from './frequencies';

export default class Board {
	constructor(notes, beats) {
		this.notes = notes;
		this.beats = beats;
		this.tiles = [];
		this.beat = 0;
		this.frequencies = frequencies;

		this.startOsc();
		this.build();
	}

	startOsc() {
		this.audioContext = new window.AudioContext();
		this.osc = this.audioContext.createOscillator();
		this.osc.type = 'square';
		this.osc.frequency.value = this.frequencies[0];
		this.osc.connect(this.audioContext.destination);

		this.osc.start();
	}

	build() {
		const board = document.getElementById('board');
		for(let i = 0; i <= this.notes; i++) {
			let row = document.createElement('div');
			row.classList.add = 'row';
			row.classList.add = 'row-' + i;
			board.appendChild(row);
			for(let j = 0; j <= this.beats; j++) {
				let tile = document.createElement('div');
				tile.classList.add('tile-' + i + '-' + j);
				tile.classList.add('tile');
				tile.dataset.beat = j;
				tile.dataset.note = i;
				tile.dataset.frequency = this.frequencies[i];
				row.appendChild(tile);
			}
		}
		this.tiles = document.getElementsByClassName('tile');
	}

	clearBoard() {
		for(let tile of this.tiles) {
			tile.classList.remove('player');
		}
	}

	addPlayer(player) {
		if(!this.players || !this.players.length) {
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
		for(let tile of this.tiles) {
			tile.classList.remove('now');
		}
		const tiles = document.querySelectorAll('[data-beat="'+this.beat+'"]');
		for(let tile of tiles) {
			tile.classList.add('now');
			if(tile.classList.contains('player')) {
				this.playSound(tile.getAttribute('data-frequency'));
			}
		}
		if(this.beat < this.beats) {
			this.beat++;
		} else {
			this.beat = 0;
		}
	}

	playSound(freq) {
		// this.osc.stop();
		this.osc.frequency.value = freq;
		// this.osc.start();
	}
}