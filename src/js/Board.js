import frequencies from './frequencies';

const DRUMS = [
	{ name: 'kick' },
	{ name: 'snare' },
	{ name: 'closed hat' },
	{ name: 'open hat' },
	{ name: 'low tom' },
	{ name: 'mid tom' },
	{ name: 'clap' },
	{ name: 'rim' }
];

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
		this.layer = 'synth';
		this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
		this.masterGain = this.audioContext.createGain();
		this.masterGain.gain.value = 0.25;
		this.masterGain.connect(this.audioContext.destination);

		this.build();
	}

	build() {
		const board = document.querySelector('.board');
		board.innerHTML = '';
		board.classList.toggle('board--drums', this.layer === 'drums');

		for (let note = 0; note < this.notes; note++) {
			for (let beat = 0; beat < this.beats; beat++) {
				let tile = document.createElement('button');
				tile.type = 'button';
				tile.classList.add('tile', `tile-${note}-${beat}`);
				tile.classList.toggle('beat', !(beat % 2));
				tile.dataset.beat = beat;
				tile.dataset.note = note;
				tile.dataset.frequency = this.frequencies[note];
				tile.dataset.drum = DRUMS[note].name;
				tile.setAttribute('aria-label', this.tileLabel(note, beat));
				tile.addEventListener('click', () => this.toggleTile(note, beat));
				board.appendChild(tile);
			}
		}

		this.tiles = document.querySelectorAll('.tile');
	}

	tileLabel(note, beat) {
		if (this.layer === 'drums') {
			return `Toggle ${DRUMS[note].name}, beat ${beat + 1}`;
		}
		return `Toggle note ${note + 1}, beat ${beat + 1}`;
	}

	clearBoard() {
		for (let tile of this.tiles) {
			tile.classList.remove('player');
		}
	}

	clearMarks() {
		for (let tile of this.tiles) {
			tile.classList.remove(this.markClass());
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
				if (tile.classList.contains('mark-synth')) {
					this.playSound(tile.getAttribute('data-frequency'));
				}
				if (tile.classList.contains('mark-drums')) {
					this.playDrum(Number(tile.getAttribute('data-note')));
				}
			}
		});
		this.beat = this.beat < this.beats - 1 ? this.beat + 1 : 0;
	}

	markTile(note, beat) {
		this.toggleTile(note, beat);
	}

	markClass() {
		return this.layer === 'drums' ? 'mark-drums' : 'mark-synth';
	}

	toggleTile(note, beat) {
		const tile = document.querySelector(`.tile-${note}-${beat}`);
		if (tile) tile.classList.toggle(this.markClass());
	}

	setLayer(layer) {
		this.layer = layer;
		const board = document.querySelector('.board');
		board.classList.toggle('board--drums', layer === 'drums');
		[...this.tiles].forEach(tile => {
			tile.setAttribute('aria-label', this.tileLabel(Number(tile.dataset.note), Number(tile.dataset.beat)));
		});
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

	playDrum(note) {
		const drum = DRUMS[note].name;
		if (drum === 'kick') return this.playKick();
		if (drum === 'snare') return this.playNoiseDrum(0.16, 900, 0.7);
		if (drum === 'closed hat') return this.playNoiseDrum(0.05, 7000, 0.28);
		if (drum === 'open hat') return this.playNoiseDrum(0.22, 6500, 0.22);
		if (drum === 'low tom') return this.playTom(140);
		if (drum === 'mid tom') return this.playTom(220);
		if (drum === 'clap') return this.playNoiseDrum(0.09, 1500, 0.45);
		return this.playRim();
	}

	playKick() {
		const now = this.audioContext.currentTime;
		const oscillator = this.audioContext.createOscillator();
		const envelope = this.audioContext.createGain();

		oscillator.type = 'sine';
		oscillator.frequency.setValueAtTime(150, now);
		oscillator.frequency.exponentialRampToValueAtTime(45, now + 0.16);
		envelope.gain.setValueAtTime(1, now);
		envelope.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

		oscillator.connect(envelope);
		envelope.connect(this.masterGain);
		oscillator.start(now);
		oscillator.stop(now + 0.2);
	}

	playTom(freq) {
		const now = this.audioContext.currentTime;
		const oscillator = this.audioContext.createOscillator();
		const envelope = this.audioContext.createGain();

		oscillator.type = 'triangle';
		oscillator.frequency.setValueAtTime(freq, now);
		oscillator.frequency.exponentialRampToValueAtTime(freq * 0.6, now + 0.18);
		envelope.gain.setValueAtTime(0.8, now);
		envelope.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

		oscillator.connect(envelope);
		envelope.connect(this.masterGain);
		oscillator.start(now);
		oscillator.stop(now + 0.24);
	}

	playRim() {
		const now = this.audioContext.currentTime;
		const oscillator = this.audioContext.createOscillator();
		const envelope = this.audioContext.createGain();

		oscillator.type = 'square';
		oscillator.frequency.value = 1200;
		envelope.gain.setValueAtTime(0.4, now);
		envelope.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

		oscillator.connect(envelope);
		envelope.connect(this.masterGain);
		oscillator.start(now);
		oscillator.stop(now + 0.05);
	}

	playNoiseDrum(length, cutoff, gain) {
		const now = this.audioContext.currentTime;
		const bufferSize = this.audioContext.sampleRate * length;
		const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
		const output = buffer.getChannelData(0);
		const noise = this.audioContext.createBufferSource();
		const filter = this.audioContext.createBiquadFilter();
		const envelope = this.audioContext.createGain();

		for (let i = 0; i < bufferSize; i++) {
			output[i] = Math.random() * 2 - 1;
		}

		noise.buffer = buffer;
		filter.type = 'highpass';
		filter.frequency.value = cutoff;
		envelope.gain.setValueAtTime(gain, now);
		envelope.gain.exponentialRampToValueAtTime(0.001, now + length);

		noise.connect(filter);
		filter.connect(envelope);
		envelope.connect(this.masterGain);
		noise.start(now);
		noise.stop(now + length);
	}
}
