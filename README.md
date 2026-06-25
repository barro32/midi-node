# Midi - node

A small browser sequencer built with the Web Audio API.

https://barro32.github.io/midi-node/

## Features

- 8-note by 16-step sequencer grid
- Keyboard and mouse input
- Toggle between synth and drum layers
- Web Audio oscillator playback with a gain envelope to avoid clicks
- Synth drum sounds built with oscillators and filtered noise
- Selectable oscillator waveforms: sine, square, sawtooth, triangle
- Tempo and volume controls
- Start, stop, and clear controls

## Controls

- Arrow keys: move the cursor
- Space or click: toggle a step on the current layer
- Layer switch: move between synth notes and drums
- Escape: clear the current layer

## Development

```bash
npm install
npm run build
```

Open `app/index.html` in a browser.

## Notes

This started as a quick multiplayer music-game/sequencer experiment. It now acts as a simple Web Audio API demo: the grid schedules oscillator notes and synthetic drum hits, applies short gain envelopes, and exposes basic synth controls in the browser.

Deployed with GitHub Pages from the `app` directory after `npm run build`.
