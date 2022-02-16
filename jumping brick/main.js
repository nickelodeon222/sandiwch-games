import { createProgram, createShader, setRectangle } from './helper.mjs'

const gl = document.querySelector('canvas').getContext('webgl');

const vsSrc = document.querySelector('#vertex-shader-2d').text;
const fsSrc = document.querySelector('#fragment-shader-2d').text;

const vs = createShader(gl, gl.VERTEX_SHADER, vsSrc);
const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSrc);

const program = createProgram(gl, vs, fs);

const posAttribLocat = gl.getAttribLocation(program, 'a_position');
const posBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);

const rect = {
    x: 100,
    y: 0,
    width: 600,
    height: 300
}

setRectangle(gl, rect.x, rect.y, rect.width, rect.height);

gl.clearColor(1, 1, 1, 1);

gl.useProgram(program);

gl.enableVertexAttribArray(posAttribLocat);

gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);

const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");

gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);


function render() {
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

render()

// gameplay code
const keyMap = {};
document.onkeydown = document.onkeyup = ev => {
    keyMap[ev.key] = ev.type === 'keydown';
    if (ev.type === 'keyup') delete keyMap[ev.key];
}

let yVel = 0;

function gameLoop() {
    if (keyMap['ArrowUp'] && !rect.y > 0) yVel += 10

    if (keyMap['ArrowRight']) rect.x += 10;

    if (keyMap['ArrowLeft']) rect.x -= 10;

    rect.y += yVel;

    if (rect.y < 0) {
        yVel = 0;
        rect.y = 0
    }
    

    yVel -= 0.2;
    setRectangle(gl, rect.x, rect.y, rect.width, rect.height);

    render()
}

setInterval(gameLoop, 10)