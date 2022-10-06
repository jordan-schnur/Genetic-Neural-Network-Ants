export default class Genome {
	private _weights: number[] = [];
	private _fitness: number = 0;

	constructor();
	constructor(w: number[]);
	constructor(w?: number[], f?: number) {
		this._weights = w ?? [];
		this._fitness = f ?? 0;
	}

	get fitness(): number {
		return this._fitness;
	}

	set fitness(value: number) {
		this._fitness = value;
	}

	get weights(): number[] {
		return this._weights;
	}

	set weights(value: number[]) {
		this._weights = value;
	}
}
