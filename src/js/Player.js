export default class Player {
	constuctor(properties) {
		this.note = note;
		this.time = time;
	}

	up() {
		if(this.note < 8) {
			this.note++;
		}
	}
	down() {
		if(this.note > 0) {
			this.note--;
		}
	}
	left() {
		if(this.time > 0) {
			this.time--;
		}
	}
	right() {
		if(this.time < 16) {
			this.time++;
		}
	}

	input(key) {
		if(key === 'ArrowUp') this.up();
		if(key === 'ArrowDown') this.down();
		if(key === 'ArrowLeft') this.left();
		if(key === 'ArrowRight') this.right();
	}
}