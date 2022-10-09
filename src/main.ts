import './style.css'
import app from './app'

document.querySelector<HTMLDivElement>('#app').innerHTML = "";
document.querySelector<HTMLDivElement>('#app')?.append(app.view);
