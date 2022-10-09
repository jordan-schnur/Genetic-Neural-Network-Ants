import * as PIXI from "pixi.js";
import { Container, NineSlicePlane, Sprite, Texture } from "pixi.js";
import uiBoxSrc from '../images/ui-box.png';
import closeSrc from '../images/close.png';
import { Vector2 } from "@math.gl/core";
import Params from "../classes/Params";
import { EventType } from "../event/EventType";
import { EventEmitter } from "eventemitter3";
import { Allocator } from "stretch-layout";

export default class Window extends EventEmitter {
	private readonly _autogrow: boolean;
	private readonly closeSprite: Sprite;
	private readonly window: NineSlicePlane;
	protected readonly _container: Container;
	protected _height: number;
	protected _position: Vector2 = new Vector2(100, 100);
	protected _width: number;
	private _title: string = "A Random Window";
	private allocator = new Allocator();
	private onClose: (window: Window) => void;
	private titleObject: PIXI.Text;

	// TODO: Add overloaded constructors to support autogrow first
	constructor(title: string, autogrow: boolean = false, width: number = 400, height: number = 200) {
		super();
		this._width = width;
		this._height = height;
		this._title = title;
		this._autogrow = autogrow;

		this._container = new Container();
		// this._container.width = this._width;
		// this._container.height = this._height;
		this._container.x = 200;
		this._container.y = 200;

		let a = Sprite.from(Texture.WHITE);
		this._container.addChild(a);
		a.height = 100;
		a.width = 100;
		a.x = 100;
		a.y = 100;

		this.window = new NineSlicePlane(Texture.from(uiBoxSrc), 19, 19, 19, 19);
		this.window.width = this._width;
		this.window.height = this._height;
		this._container.addChild(this.window);

		// this._container.on('click')

		this.closeSprite = Sprite.from(closeSrc);
		this.closeSprite.y = 6;
		this.closeSprite.x = this._container.width - 19 - 10;
		this.closeSprite.width = 19;
		this.closeSprite.height = 19;
		this.closeSprite.interactive = true;

		this.closeSprite.on('click', (e) => {
			console.log(e);

			this.emit(EventType.Close, { object1: "object1" }, { object2: "object2" })
			this._container.destroy();
		});

		this.onClose = () => {};

		this._container.addChild(this.closeSprite);

		this.titleObject = new PIXI.Text(this.title, new PIXI.TextStyle(Params.DefaultHeaderTextStyle));
		this.titleObject.y = this.titleObject.height / 2;
		this.titleObject.x = 5;

		this._container.addChild(this.titleObject);
	}

	get autogrow(): boolean {
		return this._autogrow;
	}

	get container(): Container {
		return this._container;
	}

	get height(): number {
		return this._height;
	}

	set height(value: number) {
		this._height = value;
	}

	get position(): Vector2 {
		return this._position;
	}

	set position(value: Vector2) {
		this._position = value;
	}

	get title(): string {
		return this._title;
	}

	set title(value: string) {
		this._title = value;
	}

	get width(): number {
		return this._width;
	}

	set width(value: number) {
		this._width = value;
	}
}
