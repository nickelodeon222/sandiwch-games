import { Vector2, Engine, Sprite, Entity } from "./Classes.js"

Engine.init(document.querySelector('canvas'))

const sprite = new Sprite
(
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.2Zj3WtIb3-iFQjAqYJbnlwHaFA%26pid%3DApi&f=1", 
    new Vector2(10, 60),
);

const dog = new Entity(sprite, sprite.position);

const dogSpeed = 0.5;

dog.update = function() {
    if (keysdown["ArrowLeft"]) {
        dog.position.x -= dogSpeed * Engine.deltaTime;
    }

    if (keysdown['ArrowUp']) {
        dog.position.y -= dogSpeed * Engine.deltaTime;
    }

    if (keysdown["ArrowDown"]) {
        dog.position.y += dogSpeed * Engine.deltaTime;
    }

    if (keysdown['ArrowRight']) {
        dog.position.x += dogSpeed * Engine.deltaTime;
    }

    console.log(Engine.deltaTime)
}

const keysdown = {};

 /**
  * @param {KeyboardEvent} ev 
  */
function handleKeys(ev) {
    ev.preventDefault()
    keysdown[ev.code] = ev.type === "keydown";
}

window.addEventListener("keydown", handleKeys)
window.addEventListener("keyup", handleKeys)