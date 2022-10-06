import NeuronLayer from "./NeuronLayer";
import Params from "./Params";

export default class NeuralNetwork {
	private _numInputs: number;
	private _numOutputs: number;
	private _numHiddenLayers: number;
	private _neuronsPerHiddenLayer: number;
	private _layers: NeuronLayer[];

	constructor() {
		this._numInputs = Params.NumInputs;
		this._numOutputs = Params.NumOutputs;
		this._numHiddenLayers = Params.NumHidden;
		this._neuronsPerHiddenLayer = Params.NeuronsPerHiddenLayer;
		this._layers = [];

		this.initializeNeuralNetwork();
	}

	public getNumberOfWeights(): number {
		let weights = 0;

		// For each layer
		for (let i = 0; i < this._numHiddenLayers + 1; i++) {
			// For each weight
			for (let j = 0; j < this._layers[i].numNeurons; i++) {
				// For each neuron
				for (let k = 0; k < this._layers[i].neurons[j].numInputs; k++) {
					weights++;
				}
			}
		}

		return weights;
	}

	public getWeights(): number[] {
		let weights = [];

		// For each layer
		for (let i = 0; i < this._numHiddenLayers + 1; i++) {
			// For each weight
			for (let j = 0; j < this._layers[i].numNeurons; i++) {
				// For each neuron
				for (let k = 0; k < this._layers[i].neurons[j].numInputs; k++) {
					weights.push(this._layers[i].neurons[j].weights[k]);
				}
			}
		}

		return weights;
	}

	public putWeights(weights: number[]): void {
		let weight = 0;

		// For each layer
		for (let i = 0; i < this._numHiddenLayers + 1; i++) {
			// For each weight
			for (let j = 0; j < this._layers[i].numNeurons; i++) {
				// For each neuron
				for (let k = 0; k < this._layers[i].neurons[j].numInputs; k++) {
					this._layers[i].neurons[j].weights[k] = weights[weight++];
				}
			}
		}
	}

	public update(inputs: number[]): number[] {
		let outputs: number[] = [];

		let weight = 0;

		//First check that we have the correct amount of inputs
		if (inputs.length !== this._numInputs) {
			throw new DOMException('The wrong number of inputs were given. Expected: ' + this._numInputs + ' Found: ' + inputs.length);
		}

		for (let i = 0; i < this._numHiddenLayers; i++) {
			if (i > 0) {
				inputs = outputs;
			}

			outputs = [];

			weight = 0;

			// For each neuron sum the (inputs * correspsonding weights).
			// Pass the output through the sigmoid function to get the new output.
			for (let j = 0; j < this._layers[i].numNeurons; j++) {
				let netInput = 0;
				let numInputs = this.layers[i].neurons[j].numInputs;

				// For each weight
				for (let k = 0; k < numInputs - 1; k++) {
					netInput += this._layers[i].neurons[j].weights[k] * inputs[weight++];
				}

				// Add in the bias
				netInput += this._layers[i].neurons[j].weights[numInputs - 1] * Params.Bias;

				// We store the outputs from each layer as we generate them.
				// The combined activation is first filtered through the sigmoid function.
				outputs.push(this.sigmoid(netInput, Params.ActivationResponse));

				weight = 0;
			}
		}

		return outputs;
	}

	public sigmoid(activation: number, response: number) {
		return (1 / (1 + Math.exp(-activation / response)))
	}

	private initializeNeuralNetwork() {
		if (this._numHiddenLayers > 0) {
			// First hidden layer
			this._layers.push(new NeuronLayer(this._neuronsPerHiddenLayer, this._numInputs));

			for (let i = 0; i < this._numHiddenLayers - 1; i++) {
				this.layers.push(new NeuronLayer(this._neuronsPerHiddenLayer, this.neuronsPerHiddenLayer));
			}

			// Create output layer
			this.layers.push(new NeuronLayer(this._numOutputs, this.neuronsPerHiddenLayer));
		} else {
			// Create output layer
			this._layers.push(new NeuronLayer(this._numOutputs, this._numInputs));
		}
	}

	get neuronsPerHiddenLayer(): number {
		return this._neuronsPerHiddenLayer;
	}

	set neuronsPerHiddenLayer(value: number) {
		this._neuronsPerHiddenLayer = value;
	}

	get numHiddenLayers(): number {
		return this._numHiddenLayers;
	}

	set numHiddenLayers(value: number) {
		this._numHiddenLayers = value;
	}

	get numOutputs(): number {
		return this._numOutputs;
	}

	set numOutputs(value: number) {
		this._numOutputs = value;
	}

	get numInputs(): number {
		return this._numInputs;
	}

	set numInputs(value: number) {
		this._numInputs = value;
	}

	get layers(): NeuronLayer[] {
		return this._layers;
	}

	set layers(value: NeuronLayer[]) {
		this._layers = value;
	}
}
