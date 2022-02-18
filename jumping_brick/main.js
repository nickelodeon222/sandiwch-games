import { createProgram, createShader, setRectangle } from './helper.js'

// Create context

const gl = document.querySelector('canvas').getContext('webgl');

// Create shaders

const vsSrc = document.querySelector('#vertex-shader-2d').text;
const fsSrc = document.querySelector('#fragment-shader-2d').text;

const vs = createShader(gl, gl.VERTEX_SHADER, vsSrc);
const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSrc);

// Create program

const program = createProgram(gl, vs, fs);

// Create buffer

const posAttribLocat = gl.getAttribLocation(program, 'a_position');
const posBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);

// Create rectangle

const rect = {
    x: 100,
    y: 0,
    width: 600,
    height: 300
}

setRectangle(gl, rect.x, rect.y, rect.width, rect.height);

// use program and other stuff idk

gl.clearColor(1, 1, 1, 1);

gl.useProgram(program);

gl.enableVertexAttribArray(posAttribLocat);

const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");

gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

// Run the draw function

draw()

// code for handling key presses
let keyPressed = {};

document.addEventListener('keydown', handleKeyPresses);
document.addEventListener('keyup', handleKeyPresses);

// Unpress all keys if tabbed out
window.addEventListener('blur', () => keyPressed = {});

window.requestAnimationFrame(gameLoop);

// Code for "gameplay"

let yVel = 0;

function gameLoop(time) {
    // If something is happening, run this
    if (Object.keys(keyPressed) || rect.y > 0) {
        if ((keyPressed['arrowup'] || keyPressed['w'] || keyPressed[' ']) && !rect.y > 0) yVel += 15;

        if (keyPressed['arrowright'] || keyPressed['d']) rect.x += 20;
    
        if (keyPressed['arrowleft'] || keyPressed['a']) rect.x -= 20;
    
        rect.y += yVel;
    
        if (rect.y < 0) {
            yVel = 0;
            rect.y = 0;
        }
    
        // if (rect.x + rect.width >= gl.canvas.width) rect.x = gl.canvas.width - rect.width;
    
        // if (rect.x <= 0) rect.x = 0
        
    
        yVel -= 0.4;
        setRectangle(gl, rect.x, rect.y, rect.width, rect.height);
    
        draw()
        window.requestAnimationFrame(gameLoop)
    }

    // Otherwise pass
    else {
        window.requestAnimationFrame(gameLoop)
    }
}

function draw() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    const size = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.vertexAttribPointer(posAttribLocat, size, type, normalize, stride, offset)
    

    var primitiveType = gl.TRIANGLES;
    var count = 6;
    gl.drawArrays(primitiveType, 0, count);
}

/**@param {KeyboardEvent} ev */
function handleKeyPresses(ev) {
    keyPressed[ev.key.toLowerCase()] = ev.type === 'keydown';
    
    if (ev.type === 'keyup') delete keyPressed[ev.key];
}