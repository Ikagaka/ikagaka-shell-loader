"use strict";
/*
 * surfaces.txt の内容を構造化したもの
 */
Object.defineProperty(exports, "__esModule", { value: true });
class SurfaceDefinitionTree {
    //regions: { [scopeID: number]: {[regionName: string]: ToolTipElement}; }; // 謎
    constructor(descript = new SurfaceDescript(), surfaces = [], aliases = []) {
        this.descript = descript;
        this.surfaces = surfaces;
        this.aliases = aliases;
    }
}
exports.SurfaceDefinitionTree = SurfaceDefinitionTree;
class SurfaceDescript {
    constructor(collisionSort = "ascend", animationSort = "ascend") {
        this.collisionSort = collisionSort;
        this.animationSort = animationSort;
    }
}
exports.SurfaceDescript = SurfaceDescript;
class SurfaceDefinition {
    constructor(elements = [], collisions = [], animations = [], balloons = { char: [], offsetX: 0, offsetY: 0 }, points = { basepos: { x: null, y: null }
    }) {
        this.elements = elements;
        this.collisions = collisions;
        this.animations = animations;
        this.points = points;
        this.balloons = balloons;
    }
    getRegion(offsetX, offsetY) {
        return getRegion(this.collisions, offsetX, offsetY);
    }
}
exports.SurfaceDefinition = SurfaceDefinition;
class SurfaceElement {
    constructor(type, file, x = 0, y = 0) {
        this.type = type;
        this.file = file;
        this.x = x;
        this.y = y;
    }
}
exports.SurfaceElement = SurfaceElement;
class SurfaceCollision {
    constructor(type, name) {
        this.name = name;
        this.type = type;
    }
}
exports.SurfaceCollision = SurfaceCollision;
class SurfaceCollisionRect extends SurfaceCollision {
    constructor(name, left, top, right, bottom) {
        super("rect", name);
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }
}
exports.SurfaceCollisionRect = SurfaceCollisionRect;
class SurfaceCollisionEllipse extends SurfaceCollision {
    constructor(name, left, top, right, bottom) {
        super("ellipse", name);
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }
}
exports.SurfaceCollisionEllipse = SurfaceCollisionEllipse;
class SurfaceCollisionCircle extends SurfaceCollision {
    constructor(name, centerX, centerY, radius) {
        super("circle", name);
        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;
    }
}
exports.SurfaceCollisionCircle = SurfaceCollisionCircle;
class SurfaceCollisionPolygon extends SurfaceCollision {
    constructor(name, coordinates) {
        super("polygon", name);
        this.coordinates = coordinates;
    }
}
exports.SurfaceCollisionPolygon = SurfaceCollisionPolygon;
class SurfaceAnimation {
    constructor(intervals = [["never", []]], options = [], collisions = [], patterns = []) {
        this.intervals = intervals;
        this.options = options;
        this.collisions = collisions;
        this.patterns = patterns;
    }
    isBack() { return isBack(this); }
    getExclusives() { return getExclusives(this); }
}
exports.SurfaceAnimation = SurfaceAnimation;
class SurfaceAnimationPattern {
    constructor(type = "ovelay", surface = -1, wait = [0, 0], x = 0, y = 0, animation_ids = []) {
        this.type = type;
        this.surface = surface;
        this.wait = wait;
        this.x = x;
        this.y = y;
        this.animation_ids = animation_ids;
    }
}
exports.SurfaceAnimationPattern = SurfaceAnimationPattern;
function isBack(anim) {
    return anim.options.some(([opt, args]) => opt === "background");
}
function getExclusives(anim) {
    return anim.options.filter(([opt, args]) => opt === "exclusive").reduce((l, [opt, args]) => l.concat(args), []);
}
function getRegion(collisions, offsetX, offsetY) {
    // このサーフェスの定義 surfaceNode.collision と canvas と座標を比較して
    // collision設定されていれば name"hoge"
    // basepos 左上からの座標の位置が透明かそうでないか、当たり判定領域か、名前があるかを調べる
    // offsetX: number, offsetY: number は surfaceCanvas.basePosX からの相対座標である必要がある、間違ってもcanvas左上からにしてはいけない 
    const hitCols = collisions.filter((collision, colId) => {
        const { type, name } = collision;
        switch (collision.type) {
            case "rect":
                const { left, top, right, bottom } = collision;
                return (left < offsetX && offsetX < right && top < offsetY && offsetY < bottom) ||
                    (right < offsetX && offsetX < left && bottom < offsetX && offsetX < top);
            case "ellipse":
                const o = collision;
                const width = Math.abs(o.right - o.left);
                const height = Math.abs(o.bottom - o.top);
                return Math.pow((offsetX - (o.left + width / 2)) / (width / 2), 2) +
                    Math.pow((offsetY - (o.top + height / 2)) / (height / 2), 2) < 1;
            case "circle":
                const { radius, centerX, centerY } = collision;
                return Math.pow((offsetX - centerX) / radius, 2) + Math.pow((offsetY - centerY) / radius, 2) < 1;
            case "polygon":
                const { coordinates } = collision;
                const ptC = { x: offsetX, y: offsetY };
                const tuples = coordinates.reduce(((arr, { x, y }, i) => {
                    arr.push([
                        coordinates[i],
                        (!!coordinates[i + 1] ? coordinates[i + 1] : coordinates[0])
                    ]);
                    return arr;
                }), []);
                // TODO: acos使わない奴に変える
                const deg = tuples.reduce(((sum, [ptA, ptB]) => {
                    const vctA = [ptA.x - ptC.x, ptA.y - ptC.y];
                    const vctB = [ptB.x - ptC.x, ptB.y - ptC.y];
                    const dotP = vctA[0] * vctB[0] + vctA[1] * vctB[1];
                    const absA = Math.sqrt(vctA.map((a) => Math.pow(a, 2)).reduce((a, b) => a + b));
                    const absB = Math.sqrt(vctB.map((a) => Math.pow(a, 2)).reduce((a, b) => a + b));
                    const rad = Math.acos(dotP / (absA * absB));
                    return sum + rad;
                }), 0);
                return deg / (2 * Math.PI) >= 1;
            default:
                console.warn("SurfaceTree.getRegion: unkown collision type:", this.surfaceId, colId, name, collision);
                return false;
        }
    });
    if (hitCols.length > 0) {
        return hitCols[hitCols.length - 1].name;
    }
    return "";
}
