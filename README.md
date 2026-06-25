# Midi - node

A small browser sequencer built with the Web Audio API.

## Features

- 8-note by 16-step sequencer grid
- Keyboard and mouse input
- Web Audio oscillator playback with a gain envelope to avoid clicks
- Selectable oscillator waveforms: sine, square, sawtooth, triangle
- Tempo and volume controls
- Start, stop, and clear controls

## Controls

- Arrow keys: move the cursor
- Space or click: toggle a note
- Escape: clear the pattern

## Development

```bash
npm install
npm run build
```

Open `app/index.html` in a browser.

## Notes

This started as a quick multiplayer music-game/sequencer experiment. It now acts as a simple Web Audio API demo: the grid schedules oscillator notes, applies a short gain envelope per note, and exposes basic synth controls in the browser.

https://barro32.gitlab.io/midi-node
