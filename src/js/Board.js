export default class Board {
	constructor(notes, times) {
		this.notes = notes;
		this.times = times;
	}

	build() {
		const board = document.getElementById('board');
		for(let i = 0; i <= this.notes; i++) {
			let row = document.createElement('div');
			row.classList.add = 'row';
			row.classList.add = 'row-' + i;
			board.appendChild(row);
			for(let j = 0; j <= this.times; j++) {
				let tile = document.createElement('div'); // TODO: add data attributes for row and col
				tile.classList.add('tile-' + i + '-' + j);
				tile.classList.add('tile');
				row.appendChild(tile);
			}
		}
	}

	addPlayer(player) {
		console.log(player);
		if(!this.players || !this.players.length) {
			this.players = [];
		}
		this.players.push(player);
	}

	drawPlayers() {
		for(let player in this.players) {
			console.log(this.players[player].note, this.players[player].time);
			const tile = getElementByClass(`tile-${player.note}-${player.time}`);
			console.log(tile);
			tile.classList.add('player');
		}
	}
}