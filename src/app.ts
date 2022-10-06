import * as PIXI from "pixi.js";
import antSrc from './images/ant.png';
import eggsSrc from './images/eggs.png';
import Ant from "./classes/Ant";
import { Vector2 } from "@math.gl/core";
import Egg from "./classes/Egg";

const width = window.innerWidth;
const height = window.innerHeight;

function getRndInteger(min: number, max: number) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function getDistanceBetweenPoints(p1: Vector2, p2: Vector2) {
	return Math.sqrt(Math.pow(p2.x - p1.x, 2) - Math.pow(p2.y - p1.y, 2));
}

let app = new PIXI.Application({ width: width, height: height, backgroundColor: 0xFFFFFF });

let sprite = PIXI.Sprite.from(antSrc);
sprite.zIndex = 2;
let egg = PIXI.Sprite.from(eggsSrc);
egg.scale = { x: 0.5, y: 0.5 };
egg.zIndex = 1;
let paused = false;

let eggs: Egg[] = [];
let ants: Ant[] = [];

const antNum = 250;
const eggScale = 0.25;
const eggNum = antNum * eggScale;

for (let i = 0; i < eggNum; i++) {
	let pos = new Vector2(getRndInteger(0, width), getRndInteger(0, height));
	let eggSprite = PIXI.Sprite.from(eggsSrc);
	eggSprite.scale = { x: 0.25, y: 0.25 };
	let egg = new Egg(eggSprite, pos);
	egg.render();
	eggs.push(egg);
	app.stage.addChild(egg.container);
}

for (let i = 0; i < antNum; i++) {
	let pos = new Vector2(getRndInteger(0, width), getRndInteger(0, height));
	let antSprite = PIXI.Sprite.from(antSrc);
	antSprite.scale = { x: 0.25, y: 0.25 };
	let ant = new Ant(antSprite, pos);
	ant.render();
	ants.push(ant);
	app.stage.addChild(ant.container);
}

app.stage.addChild(egg);

const style = new PIXI.TextStyle({
	fontFamily: 'Arial',
	fontSize: 36,
	align: 'center',
	fontWeight: 'bold',
	fill: ['#ffffff'], // gradient
	stroke: '#4a1850',
	strokeThickness: 5,
	dropShadow: true,
	dropShadowColor: '#000000',
	dropShadowBlur: 4,
	dropShadowAngle: Math.PI / 6,
	dropShadowDistance: 6,
});

const richText = new PIXI.Text('Paused', style);

// noinspection TypeScriptValidateJSTypes
app.stage.addChild(richText);

richText.x = (width / 2) - (richText.width / 2);
richText.y = (richText.height / 2) + (height / 2);
richText.visible = paused;

document.addEventListener("keydown", (e) => {
	if ( e.code === "Space" ) {
		paused = !paused;
		richText.visible = paused;
	}
	console.log(e);
})

let elapsed = 0.0;
app.ticker.add((delta) => {
	elapsed += delta;
	console.log("Frame elapsed: " + elapsed);
	ants.forEach((ant) => {

		let closestEggDistance = 999999999;
		let closestEgg = null;
		for (const egg of eggs) {
			if ( closestEggDistance < getDistanceBetweenPoints(egg.position, ant.position) ) {
				closestEgg = egg;
			}
		}
		
		// p2 - p1
		ant.closestEggVector = new Vector2(egg.position.x - ant.position.x, egg.position.y - ant.position.y);

		ant.render();
	});
});

export default app;
