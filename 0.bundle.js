webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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
				break;
			case right:
				this.right();
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

	input(key) {
		console.log("key: " + key);
		if(keyIsDown(ArrowLeft) && squares[left])
			this.move(left);
		if(keyIsDown(ArrowRight) && squares[right])
			this.move(right);
		if(keyIsDown(ArrowUP) && squares[up])
			this.move(up);
		if(keyIsDown(ArrowDown) && squares[down])
			this.move(down);
	}
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Player;


/***/ })
]);