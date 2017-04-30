export declare class SurfaceDefinitionTree {
    readonly descript: SurfaceDescript;
    readonly surfaces: SurfaceDefinition[];
    readonly aliases: {
        [aliasname: string]: number[];
    }[];
    constructor(descript?: SurfaceDescript, surfaces?: SurfaceDefinition[], aliases?: {
        [aliasname: string]: number[];
    }[]);
}
export declare class SurfaceDescript {
    readonly collisionSort: string;
    readonly animationSort: string;
    constructor(collisionSort?: string, animationSort?: string);
}
export declare class SurfaceDefinition {
    readonly points: {
        basepos: {
            x: number | null;
            y: number | null;
        };
    };
    readonly balloons: {
        char: {
            offsetX: number;
            offsetY: number;
        }[];
        offsetX: number;
        offsetY: number;
    };
    readonly collisions: SurfaceCollision[];
    readonly animations: SurfaceAnimation[];
    readonly elements: SurfaceElement[];
    constructor(elements?: SurfaceElement[], collisions?: SurfaceCollision[], animations?: SurfaceAnimation[], balloons?: {
        char: {
            offsetX: number;
            offsetY: number;
        }[];
        offsetX: number;
        offsetY: number;
    }, points?: {
        basepos: {
            x: number | null;
            y: number | null;
        };
    });
    getRegion(offsetX: number, offsetY: number): string;
}
export declare class SurfaceElement {
    readonly type: string;
    readonly file: string;
    readonly x: number;
    readonly y: number;
    constructor(type: string, file: string, x?: number, y?: number);
}
export declare class SurfaceCollision {
    readonly name: string;
    readonly type: string;
    constructor(type: string, name: string);
}
export declare class SurfaceCollisionRect extends SurfaceCollision {
    readonly left: number;
    readonly top: number;
    readonly right: number;
    readonly bottom: number;
    constructor(name: string, left: number, top: number, right: number, bottom: number);
}
export declare class SurfaceCollisionEllipse extends SurfaceCollision {
    readonly left: number;
    readonly top: number;
    readonly right: number;
    readonly bottom: number;
    constructor(name: string, left: number, top: number, right: number, bottom: number);
}
export declare class SurfaceCollisionCircle extends SurfaceCollision {
    readonly centerX: number;
    readonly centerY: number;
    readonly radius: number;
    constructor(name: string, centerX: number, centerY: number, radius: number);
}
export declare class SurfaceCollisionPolygon extends SurfaceCollision {
    readonly coordinates: {
        x: number;
        y: number;
    }[];
    constructor(name: string, coordinates: {
        x: number;
        y: number;
    }[]);
}
export declare class SurfaceAnimation {
    readonly intervals: [string, number[]][];
    readonly options: [string, number[]][];
    readonly collisions: SurfaceCollision[];
    readonly patterns: SurfaceAnimationPattern[];
    constructor(intervals?: [string, number[]][], options?: [string, number[]][], collisions?: SurfaceCollision[], patterns?: SurfaceAnimationPattern[]);
    isBack(): boolean;
    getExclusives(): number[];
}
export declare class SurfaceAnimationPattern {
    readonly type: string;
    readonly surface: number;
    readonly wait: [number, number];
    readonly x: number;
    readonly y: number;
    readonly animation_ids: number[];
    constructor(type?: string, surface?: number, wait?: [number, number], x?: number, y?: number, animation_ids?: number[]);
}
