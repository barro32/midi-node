/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Board_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Player_js__ = __webpack_require__(2);



const board = new __WEBPACK_IMPORTED_MODULE_0__Board_js__["a" /* default */](8, 16);
const player = new __WEBPACK_IMPORTED_MODULE_1__Player_js__["a" /* default */](1, 2);
board.addPlayer(player);
board.drawPlayers();

const playerLoop = window.setInterval(board.drawPlayers.bind(board), 500);
const beatLoop = window.setInterval(board.step.bind(board), 500);

document.addEventListener('keydown', (e) => {
	player.input(e.key);
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Board {
	constructor(notes, beats) {
		this.notes = notes;
		this.beats = beats;
		this.tiles = [];
		this.beat = 0;
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
				let tile = document.createElement('div');
				tile.classList.add('tile-' + i + '-' + j);
				tile.classList.add('tile');
				tile.dataset.beat = j;
				tile.dataset.note = i;
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

	step() {
		for(let tile of this.tiles) {
			tile.classList.remove('now');
		}
		const tiles = document.querySelectorAll('[data-beat="'+this.beat+'"]');
		for(let tile of tiles) {
			tile.classList.add('now');
		}
		if(this.beat < this.beats) {
			this.beat++;
		} else {
			this.beat = 0;
		}
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Board;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Player {
	constructor(note, beat) {
		this.note = note;
		this.beat = beat;
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

	input(key) {
		if(key === 'ArrowUp') this.up();
		if(key === 'ArrowDown') this.down();
		if(key === 'ArrowLeft') this.left();
		if(key === 'ArrowRight') this.right();
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Player;


/***/ })
/******/ ]);