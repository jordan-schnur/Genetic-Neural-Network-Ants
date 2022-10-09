import { Application, Container } from "pixi.js";
import { Allocator, Node } from "stretch-layout";
import { Vector2 } from "@math.gl/core";

/**
 * The UICanvas is the root of the UI scene. It is powered by the Stretch Layout Engine, which gives it all the power of CSS Flexbox in a PIXI application.
 *
 * The UICanvas is not a UIObject, and the size will always be the height of the PIXI canvas.
 *
 * @see https://vislyhq.github.io/stretch/docs/javascript
 * @see https://github.com/pixijs/pixi-ui
 *
 * @class
 * @extends Container
 */
export default class UICanvas extends Container {
	private readonly allocator: Allocator = new Allocator();
	private _nodes: Node[] = [];
	private _size: Vector2 = new Vector2(0, 0);

	constructor(app: Application) {
		super();

		new ResizeObserver((entries) => {
			// If for some reason a canvas has a child element, select the final element. May need to revisit this one day.
			let lastEntry = entries[entries.length - 1];

			this._size.set(lastEntry.contentRect.width, lastEntry.contentRect.height);
		}).observe(app.view);

		this.on('added', (app: Container) => {
			this._width = app.width;
			this._height = app.height;
		});
	}

	get nodes(): Node[] {
		return this._nodes;
	}

	get size(): Vector2 {
		return this._size;
	}
}
