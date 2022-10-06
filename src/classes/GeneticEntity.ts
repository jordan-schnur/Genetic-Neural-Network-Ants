import Entity from "./Entity";
import { Vector2 } from "@math.gl/core";

export default class GeneticEntity extends Entity {
	private _fitness: number = 0;

	public reset(windowWidth: number, windowHeight: number) {
		this._position = new Vector2(Math.random() * windowWidth, Math.random() * windowHeight);
		this._rotation = Math.random() * Math.PI * 2
	}

	get fitness(): number {
		return this._fitness;
	}

	//http://www.ai-junkie.com/ann/evolved/nnt8.html
	set fitness(value: number) {
		this._fitness = value;
	}
}
