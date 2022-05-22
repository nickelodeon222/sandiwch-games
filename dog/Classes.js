var Vector2 = /** @class */ (function () {
    function Vector2(x, y) {
        this.x = x;
        this.y = y;
    }
    Object.defineProperty(Vector2.prototype, "magnitude", {
        get: function () {
            return Math.hypot(this.x, this.y);
        },
        enumerable: false,
        configurable: true
    });
    Vector2.prototype.add = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var x = this.x, y = this.y;
        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
            var vector = args_1[_a];
            x += vector.x;
            y += vector.y;
        }
        return new Vector2(x, y);
    };
    Vector2.add = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var x = 0, y = 0;
        for (var _a = 0, args_2 = args; _a < args_2.length; _a++) {
            var vector = args_2[_a];
            x += vector.x;
            y += vector.y;
        }
        return new Vector2(x, y);
    };
    return Vector2;
}());
export { Vector2 };
var Entity = /** @class */ (function () {
    function Entity(sprite, position) {
        this.position = position;
        this.sprite = sprite;
        Engine.entities.push(this);
        this.update = null;
        console.log(Engine.entities);
    }
    return Entity;
}());
export { Entity };
var Sprite = /** @class */ (function () {
    function Sprite(src, position) {
        var _this = this;
        this.ready = false;
        this.image = new Image();
        this.position = position;
        this.ctx = ctx;
        this.image.src = src;
        this.image.onload = function () {
            _this.ready = true;
        };
        console.log("ehlp");
    }
    return Sprite;
}());
export { Sprite };
function render(time) {
    Engine.deltaTime = time - prevTime;
    prevTime = time;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (var _i = 0, _a = Engine.entities; _i < _a.length; _i++) {
        var entity = _a[_i];
        if (entity.update !== null) {
            entity.update();
        }
        ctx.drawImage(entity.sprite.image, entity.sprite.position.x, entity.sprite.position.y);
    }
    requestAnimationFrame(render);
}
var prevTime;
export var Engine = {
    init: function (canvas) {
        if (!(canvas instanceof HTMLCanvasElement))
            throw "Canvas was not passed";
        var localctx = canvas.getContext("2d");
        if (!(localctx instanceof CanvasRenderingContext2D)) {
            throw "Could not initialize Engine";
        }
        ctx = localctx;
        window.requestAnimationFrame(render);
    },
    entities: [],
    deltaTime: 0
};
var ctx;
