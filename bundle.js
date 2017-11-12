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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Board_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Player_js__ = __webpack_require__(1);



const board = new __WEBPACK_IMPORTED_MODULE_0__Board_js__["a" /* default */](8, 16);
board.build();
const player = new __WEBPACK_IMPORTED_MODULE_1__Player_js__["a" /* default */](0, 0);

document.addEventListener('keydown', (e) => {
	player.input(e.key);
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Player {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Player;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Board {
	constructor(properties) {
		this.notes = notes;
		this.times = times;

	}

	build() {
		console.log('hi');
		const board = document.getElementById('board');
		for(let i = 0; i <= this.notes; i++) {
			let row = document.createElement('div');
			row.className = 'row-' + i;
			board.appendChild(row);
			for(let j = 0; i <= this.times; j++) {
				let tile = document.createElement('div'); // TODO: add data attributes for row and col
				tile.classList.add('tile-' + i + '-' + j);
				tile.classList.add('tile');
				row.appendChild(tile);
			}
		}
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Board;


/***/ })
/******/ ]);