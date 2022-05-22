export class Vector2 {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    get magnitude(): number {
        return Math.hypot(this.x, this.y)
    }

    add(...args: Vector2[]): Vector2 {
        let x: number = this.x, y: number = this.y;
        for (const vector of args) {
            x += vector.x;
            y += vector.y;
        }

        return new Vector2(x, y);
    }

    static add(...args: Vector2[]): Vector2 {
        let x: number = 0, y: number = 0;
        for (const vector of args) {
            x += vector.x;
            y += vector.y;
        }

        return new Vector2(x, y);
    }

}

export class Entity {
    position: Vector2;
    sprite: Sprite;
    constructor(sprite: Sprite, position: Vector2) {
        this.position = position;
        this.sprite = sprite;

        Engine.entities.push(this);

        this.update = null;

        console.log(Engine.entities)
    }

    update: (() => void) | null;
}

export class Sprite {
    position: Vector2;
    image: CanvasImageSource;
    ctx: CanvasRenderingContext2D;
    ready: boolean = false;

    constructor(src: string, position: Vector2) {
        this.image = new Image();
        this.position = position;
        this.ctx = ctx;
    
        this.image.src = src;

        this.image.onload = () => {
            this.ready = true;
        }
        console.log("ehlp")
    }


}

function render(time: DOMHighResTimeStamp) {
    Engine.deltaTime = time - prevTime;
    prevTime = time;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (const entity of Engine.entities) {
        if (entity.update !== null)
        {
            entity.update();
        }

        ctx.drawImage(entity.sprite.image, entity.sprite.position.x, entity.sprite.position.y);
            
    }


    requestAnimationFrame(render)
}

let prevTime: DOMHighResTimeStamp;


export const Engine =  {
    init(canvas: HTMLCanvasElement) {
        if (!(canvas instanceof HTMLCanvasElement)) throw "Canvas was not passed"

        const localctx = canvas.getContext("2d");

        if (!(localctx instanceof CanvasRenderingContext2D)) {
            throw "Could not initialize Engine"
        }

        ctx = localctx;

        window.requestAnimationFrame(render)
    },

    entities: <Entity[]> [],

    deltaTime: <number> 0
}

var ctx: CanvasRenderingContext2D;