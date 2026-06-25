export default class Player {
	constructor(note, beat, board) {
		this.note = note;
		this.beat = beat;
		this.board = board;
	}

	up() {
		if (this.note > 0) {
			this.note--;
		}
	}
	down() {
		if (this.note < this.board.notes - 1) {
			this.note++;
		}
	}
	left() {
		if (this.beat > 0) {
			this.beat--;
		}
	}
	right() {
		if (this.beat < this.board.beats - 1) {
			this.beat++;
		}
	}
	markTile() {
		this.board.markTile(this.note, this.beat);
	}
	clearPattern() {
		this.board.clearMarks();
	}

	input(key) {
		if (key === 'ArrowUp') this.up();
		if (key === 'ArrowDown') this.down();
		if (key === 'ArrowLeft') this.left();
		if (key === 'ArrowRight') this.right();
		if (key === ' ') this.markTile();
		if (key === 'Escape') this.clearPattern();
	}
}
