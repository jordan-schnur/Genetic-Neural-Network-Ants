import Entity from "./Entity";
import { Vector2 } from "@math.gl/core";

export default class Ant extends Entity {
	private _closestEggVector: Vector2;

	get closestEggVector(): Vector2 {
		return this._closestEggVector;
	}

	set closestEggVector(value: Vector2) {
		this._closestEggVector = value;
	}

}
