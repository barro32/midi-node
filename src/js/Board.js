export default class Board {
	constructor(notes, beats) {
		this.notes = notes;
		this.beats = beats;
		this.tiles = [];
		this.build();
	}

	build() {
		const board = document.getElementById('board');
		for(let i = 0; i <= this.notes; i++) {
			let row = document.createElement('div');
			row.classList.add = 'row';
			row.classList.add = 'row-' + i;
			board.appendChild(row);
			for(let j = 0; j <= this.beats; j++) {
				let tile = document.createElement('div'); // TODO: add data attributes for row and col
				tile.classList.add('tile-' + i + '-' + j);
				tile.classList.add('tile');
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
		for(let i in this.players) {
			const tileClass = `tile-${this.players[i].note}-${this.players[i].beat}`;
			const tile = document.getElementsByClassName(tileClass);
			tile[0].classList.add('player');
		}
	}
}