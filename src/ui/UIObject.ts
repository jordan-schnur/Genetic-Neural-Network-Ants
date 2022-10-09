import { Vector2 } from "@math.gl/core";
import { Node } from "stretch-layout";
import { Container } from "pixi.js";
import UICanvas from "./UICanvas";

/**
 * The UIObject is a user facing User Interface object.
 *
 * @class
 */
export default abstract class UIObject extends Container {
	private _nodes: Node[] = [];
	private _position: Vector2 = new Vector2(0, 0);
	private _size: Vector2 = new Vector2(0, 0);

	constructor(uiCanvas: UICanvas) {
		super();

		uiCanvas.addChild(this);
	}

	get nodes(): Node[] {
		return this._nodes;
	}

	get position(): Vector2 {
		return this._position;
	}

	set position(value: Vector2) {
		this._position = value;
	}

	get size(): Vector2 {
		return this._size;
	}

	set size(value: Vector2) {
		this._size = value;
	}
}
