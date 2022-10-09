import * as PIXI from "pixi.js";
import Window from "./Window";
import Params from "../classes/Params";

export default class TextWindow extends Window {
	private _text: string;
	private textObject: PIXI.Text;

	constructor(text: string, style: Object | PIXI.TextStyle = {}) {
		super();

		this._text = text;

		let textStyle = Object.assign(style, Params.DefaultHeaderTextStyle);
		this.textObject = new PIXI.Text(this.text, new PIXI.TextStyle(textStyle));
		this.textObject.y = this.textObject.height / 2;
		this.textObject.x = 5;
		this._container.addChild(this.textObject);
	}

	get text(): string {
		return this._text;
	}

	set text(value: string) {
		this._text = value;
	}

}
