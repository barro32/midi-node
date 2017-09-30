class Player {
	constuctor(properties) {
		this.note = note;
		this.time = time;
	}
	
	move(direction) {
		switch (direction) {
			case up:
				this.up();
				break;
			case down:
				this.down();
				break;
			case left:
				this.left();
				break;this.
			case right:
				tgis.right();
				break;
		}
	}
	
	up() {
		if(this.note < notes.length) {
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
		if(this.time < times.length) {
			this.time++;
		}
	}
}