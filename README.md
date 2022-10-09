# Genetic Neural Network Ants

A template that allows rapid iteration with [PixiJS](https://pixijs.com/).

### Current Issues:

- In order to build the application an issue with Stretch Layout loading a WebAssembly file must be fixed. Navigate to
  node_modules > stretch-layout > stretch_layout.js. Replace line 1
  with `import * as wasm from './stretch_layout_bg.wasm';`
  - Fairly sure this is a vite build

## Setup Development

1. Clone Repository `git clone git@github.com:jordan-schnur/Genetic-Neural-Network-Ants.git`
2. Download dependencies `npm install`
3. Run app `npm start`
4. Navigate to [localhost:5173](http://localhost:5173)

## Build Application

1. `npm run build`
2. Navigate to /dist

## Goals

- [ ] Ants can learn and improve their survival odds
- [ ] Neural Network can be visualized
- [ ] UI Framework for Pixi

## Core Dependencies

- [Math.gl](https://math.gl/)
- [PixiJS](https://pixijs.com/)
- [Vite](https://vitejs.dev/)
- [Stretch](https://vislyhq.github.io/stretch/)
