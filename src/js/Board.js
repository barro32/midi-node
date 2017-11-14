export default class Board {
	constructor(notes, times) {
		this.notes = notes;
		this.times = times;
	}

	build() {
		const board = document.getElementById('board');
		for(let i = 0; i <= this.notes; i++) {
			let row = document.createElement('div');
			row.className = 'row-' + i;
			board.appendChild(row);
			for(let j = 0; j <= this.times; j++) {
				let tile = document.createElement('div'); // TODO: add data attributes for row and col
				tile.classList.add('tile-' + i + '-' + j);
				tile.classList.add('tile');
				row.appendChild(tile);
			}
		}
	}
}