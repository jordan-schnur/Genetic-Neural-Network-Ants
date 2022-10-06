import Neuron from "./Neuron";

export default class NeuronLayer {
	private _numNeurons: number; //TODO: See if you can simply this
	private _neurons: Neuron[] = [];

	constructor(numNeurons: number, numInputsPerNeuron: number) {
		for (let i = 0; i < numNeurons; i++) {
			this._neurons.push(new Neuron(numInputsPerNeuron));
		}

		this._numNeurons = numNeurons;
	}

	get neurons(): Neuron[] {
		return this._neurons;
	}

	set neurons(value: Neuron[]) {
		this._neurons = value;
	}

	get numNeurons(): number {
		return this._numNeurons;
	}

	set numNeurons(value: number) {
		this._numNeurons = value;
	}
}
