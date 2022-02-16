declare export function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader;

declare export function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram;

declare export function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement): void;

declare export function setRectangle(gl:WebGLRenderingContext, x: number, y:number, width: number, height: number): void;

