import { Container, Sprite } from "pixi.js";
import { Vector2 } from "@math.gl/core";

export default class Entity {
	private static idCounter: number = 0;
	private readonly _sprite: Sprite;
	private readonly _container: Container;
	protected _rotation = 0;
	protected _position: Vector2;
	protected readonly _id: number;

	constructor(sprite: Sprite, position: Vector2 = new Vector2(0, 0)) {
		this._sprite = sprite;
		this._position = position;
		this._container = new Container();
		this._container.interactive = true;

		this._container.addChild(this._sprite);
		this._container.on('click', () => {
			console.log("Clicked on Entity#" + this._id);
		});

		// this._container.addEventListener

		this._id = Entity.idCounter;
		Entity.idCounter++;
	}

	public update() {
		this._container.x = this._position.x;
		this._container.y = this._position.y;
		this._container.rotation = this._rotation;
	}

	get rotation(): number {
		return this._rotation;
	}

	set rotation(value: number) {
		this._rotation = value;
	}

	get id(): number {
		return this._id;
	}

	get sprite(): Sprite {
		return this._sprite;
	}

	get position(): Vector2 {
		return this._position;
	}

	set position(value: Vector2) {
		this._position = value;
	}

	get container(): Container {
		return this._container;
	}
}
