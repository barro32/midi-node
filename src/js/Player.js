export default class Player {
	constructor(note, beat, board) {
		this.note = note;
		this.beat = beat;
		this.board = board;
	}

	up() {
		if(this.note > 0) {
			this.note--;
		}
	}
	down() {
		if(this.note < 8) {
			this.note++;
		}
	}
	left() {
		if(this.beat > 0) {
			this.beat--;
		}
	}
	right() {
		if(this.beat < 16) {
			this.beat++;
		}
	}
	markTile() {
		this.board.markTile(this.note, this.beat);
	}
	stopSound() {
		this.board.stopSound();
	}

	input(key) {
		if(key === 'ArrowUp') this.up();
		if(key === 'ArrowDown') this.down();
		if(key === 'ArrowLeft') this.left();
		if(key === 'ArrowRight') this.right();
		if(key === ' ') this.markTile();
		if(key === 'Escape') this.stopSound();
	}
}