import Genome from "./Genome";
import Params from "./Params";

export default class GeneticAlgorithm {
	private _population: Genome[];
	private _populationSize: number;
	private _chromosomeLength: number;
	private _totalFitness: number = 0;
	private _bestFitness: number = 0;
	private _averageFitness: number = 0;
	private _worstFitness: number = 9999999;
	private _fittestGenome: number = 0;
	private _mutationRate: number = Params.MutationRate;
	private _crossoverRate: number;
	private _generation: number = 0;

	constructor(populationSize: number, mutationRate: number, crossRate: number, numWeights: number) {
		this._populationSize = populationSize;
		this._mutationRate = mutationRate;
		this._crossoverRate = crossRate;
		this._chromosomeLength = numWeights;
		this._population = [];

		for (let i = 0; i < this._populationSize; i++) {
			this._population.push(new Genome());
			for (let j = 0; j < this.chromosomeLength; j++) {
				this._population[i].weights.push(Math.random() - Math.random());
			}
		}
	}

	/**
	 * Takes a population of Chromosomes and runs the algorithm through one cycle. Returns a new population of chromosomes.
	 * @param oldPopulation
	 */
	public epoch(oldPopulation: Genome[]): Genome[] {
		this._population = oldPopulation;

		this.reset();

		//TODO: Sort CGenAlg.cpp:149

		this.calculateBestWorstAverageTotal();

		let newPopulation: Genome[] = [];

		if ( !(Params.NumCopiesElite * Params.NumElite % 2) ) {
			this.grabNBest(Params.NumElite, Params.NumCopiesElite, newPopulation);
		}

		this._population = newPopulation;

		return this._population;
	}

	/**
	 * Given parents and offspring, preform crossover according to the GAs crossover rate
	 * @param mum
	 * @param dad
	 * @param baby1
	 * @param baby2
	 * @private
	 */
	private crossover(mum: number[], dad: number[], baby1: number[], baby2: number[]): void {
		if ( (Math.random() > this._crossoverRate) || (mum === dad) ) {
			baby1 = mum;
			baby2 = dad;
		}

		// Determine a crossover point
		let cp = Math.round(Math.random() * (this._chromosomeLength - 1));

		// Create the offspring
		for (let i = 0; i < cp; i++) {
			baby1.push(mum[i]);
			baby2.push(dad[i]);
		}

		for (let i = 0; i < mum.length; i++) {
			baby1.push(dad[i]);
			baby2.push(mum[i]);
		}
	}

	private mutate(chromosome: number[]) {
		for (let i = 0; i < chromosome.length; i++) {
			if ( Math.random() < this._mutationRate ) {
				chromosome[i] += (Math.random() - Math.random()) * Params.MaxPerturbation;
			}
		}
	}

	private chromosomeRoulette(): Genome | null {

		// Generate a random number between 0 and the total fitness
		let slice: number = Math.random() * this._totalFitness;
		let theChosenOne: Genome | null = null;
		let fittnessSoFar = 0;

		for (let i = 0; i < this._populationSize; i++) {
			fittnessSoFar += this._population[i].fitness;

			if ( fittnessSoFar >= slice ) {
				theChosenOne = this._population[i];

				break;
			}
		}

		return theChosenOne;
	}

	private grabNBest(best: number, numCopies: number, population: Genome[]): void {
		while (best--) {
			for (let i = 0; i < numCopies; i++) {
				population.push(this.population[(this.populationSize - 1) - best]);
			}
		}
	}

	/**
	 * Calculate the fittest and weakest genome. Also, calculation the average and total fitness scores.
	 * @private
	 */
	private calculateBestWorstAverageTotal(): void {
		this._totalFitness = 0;

		let highestSoFar = 0;
		let lowestSoFar = 999999999;

		for (let i = 0; i < this.populationSize; i++) {
			// Update fittest if necessary
			if ( this._population[i].fitness > highestSoFar ) {
				highestSoFar = this._population[i].fitness;
				this._fittestGenome = i;
				this._bestFitness = highestSoFar;
			}

			if ( this._population[i].fitness < lowestSoFar ) {
				lowestSoFar = this._population[i].fitness;

				this.worstFitness = lowestSoFar;
			}

			this.totalFitness += this._population[i].fitness;
		}

		this._averageFitness = this._totalFitness / this._populationSize;
	}

	/**
	 * Reset all relevant variables ready for a new generation
	 * @private
	 */
	private reset(): void {
		this._totalFitness = 0;
		this._bestFitness = 0;
		this._worstFitness = 0;
		this._averageFitness = 0;
	}

	get generation(): number {
		return this._generation;
	}

	set generation(value: number) {
		this._generation = value;
	}

	get crossoverRate(): number {
		return this._crossoverRate;
	}

	set crossoverRate(value: number) {
		this._crossoverRate = value;
	}

	get mutationRate(): number {
		return this._mutationRate;
	}

	set mutationRate(value: number) {
		this._mutationRate = value;
	}

	get fittestGenome(): number {
		return this._fittestGenome;
	}

	set fittestGenome(value: number) {
		this._fittestGenome = value;
	}

	get worstFitness(): number {
		return this._worstFitness;
	}

	set worstFitness(value: number) {
		this._worstFitness = value;
	}

	get averageFitness(): number {
		this._averageFitness = this._totalFitness / this._populationSize;

		return this._averageFitness;
	}

	set averageFitness(value: number) {
		this._averageFitness = value;
	}

	get bestFitness(): number {
		return this._bestFitness;
	}

	set bestFitness(value: number) {
		this._bestFitness = value;
	}

	get totalFitness(): number {
		return this._totalFitness;
	}

	set totalFitness(value: number) {
		this._totalFitness = value;
	}

	get chromosomeLength(): number {
		return this._chromosomeLength;
	}

	set chromosomeLength(value: number) {
		this._chromosomeLength = value;
	}

	get populationSize(): number {
		return this._populationSize;
	}

	set populationSize(value: number) {
		this._populationSize = value;
	}

	get population(): Genome[] {
		return this._population;
	}

	set population(value: Genome[]) {
		this._population = value;
	}
}
