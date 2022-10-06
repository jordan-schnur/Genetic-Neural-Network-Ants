export default class Neuron {
	private readonly _numInputs: number;
	private _weights: number[];

	constructor(numInputs: number) {
		this._numInputs = numInputs;

		this._weights = [];

		for (let i = 0; i < this._numInputs + 1; i++) {
			this._weights.push(Math.random() - Math.random());
		}
	}

	get weights() {
		return this._weights;
	}

	set weights(value) {
		this._weights = value;
	}

	get numInputs(): number {
		return this._numInputs;
	}
}
