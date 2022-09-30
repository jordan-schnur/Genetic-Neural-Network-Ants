import * as PIXI from "pixi.js";
import ant from './images/sample.png';

let app = new PIXI.Application({ width: 641, height: 360, backgroundColor: 0xFFFFFF });

console.log("Heyo")

let sprite = PIXI.Sprite.from(ant);

app.stage.addChild(sprite);

let elapsed = 0.0;
app.ticker.add((delta) => {
	elapsed += delta;
	sprite.x = 100.0 + Math.cos(elapsed / 50.0) * 100.0;
});

export default app;
