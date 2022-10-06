import './style.css'
import app from './app'

document.querySelector<HTMLDivElement>('#app').innerHTML = "";
document.querySelector<HTMLDivElement>('#app')?.append(app.view);
window.addEventListener('resize', (e) => {
	console.log(document.querySelector<HTMLDivElement>('#app'));
	app.view.width = window.innerWidth;
	app.view.height = window.innerHeight;
});
