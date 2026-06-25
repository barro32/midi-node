import frequencies from './frequencies';

export default class Board {
	constructor(notes, beats) {
		this.notes = notes;
		this.beats = beats;
		this.tiles = [];
		this.beat = 0;
		this.players = [];
		this.frequencies = frequencies;
		this.waveform = 'sine';
		this.noteLength = 0.18;
		this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
		this.masterGain = this.audioContext.createGain();
		this.masterGain.gain.value = 0.25;
		this.masterGain.connect(this.audioContext.destination);

		this.build();
	}

	build() {
		const board = document.querySelector('.board');
		board.innerHTML = '';

		for (let note = 0; note < this.notes; note++) {
			for (let beat = 0; beat < this.beats; beat++) {
				let tile = document.createElement('button');
				tile.type = 'button';
				tile.classList.add('tile', `tile-${note}-${beat}`);
				tile.classList.toggle('beat', !(beat % 2));
				tile.dataset.beat = beat;
				tile.dataset.note = note;
				tile.dataset.frequency = this.frequencies[note];
				tile.setAttribute('aria-label', `Toggle note ${note + 1}, beat ${beat + 1}`);
				tile.addEventListener('click', () => this.toggleTile(note, beat));
				board.appendChild(tile);
			}
		}

		this.tiles = document.querySelectorAll('.tile');
	}

	clearBoard() {
		for (let tile of this.tiles) {
			tile.classList.remove('player');
		}
	}

	clearMarks() {
		for (let tile of this.tiles) {
			tile.classList.remove('mark');
		}
	}

	addPlayer(player) {
		this.players.push(player);
	}

	drawPlayers() {
		this.clearBoard();
		this.players.forEach(player => {
			const tileClass = `tile-${player.note}-${player.beat}`;
			const tile = document.getElementsByClassName(tileClass);
			if (tile[0]) tile[0].classList.add('player');
		});
	}

	step() {
		[...this.tiles].forEach(tile => {
			tile.classList.remove('now');
			if (Number(tile.getAttribute('data-beat')) === this.beat) {
				tile.classList.add('now');
				if (tile.classList.contains('mark')) {
					this.playSound(tile.getAttribute('data-frequency'));
				}
			}
		});
		this.beat = this.beat < this.beats - 1 ? this.beat + 1 : 0;
	}

	markTile(note, beat) {
		this.toggleTile(note, beat);
	}

	toggleTile(note, beat) {
		const tile = document.querySelector(`.tile-${note}-${beat}`);
		if (tile) tile.classList.toggle('mark');
	}

	setWaveform(waveform) {
		this.waveform = waveform;
	}

	setVolume(volume) {
		this.masterGain.gain.value = Number(volume);
	}

	async resumeAudio() {
		if (this.audioContext.state === 'suspended') {
			await this.audioContext.resume();
		}
	}

	playSound(freq) {
		const now = this.audioContext.currentTime;
		const oscillator = this.audioContext.createOscillator();
		const envelope = this.audioContext.createGain();

		oscillator.type = this.waveform;
		oscillator.frequency.value = Number(freq);

		envelope.gain.setValueAtTime(0, now);
		envelope.gain.linearRampToValueAtTime(1, now + 0.01);
		envelope.gain.exponentialRampToValueAtTime(0.001, now + this.noteLength);

		oscillator.connect(envelope);
		envelope.connect(this.masterGain);

		oscillator.start(now);
		oscillator.stop(now + this.noteLength + 0.03);
	}
}
