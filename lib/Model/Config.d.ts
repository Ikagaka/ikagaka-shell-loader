export declare type Descript = {
    [key: string]: string;
};
export declare type JSONLike = string | number | {
    [key: string]: JSONLike;
};
export declare class Config {
    seriko: Seriko;
    menu: Menu;
    char: Char[];
    bindgroup: {
        [charId: number]: {
            [bindgroupId: number]: boolean;
        };
    };
    enableRegion: boolean;
    position: "fixed" | "absolute";
    constructor();
}
export declare class Seriko {
    use_self_alpha: boolean;
    paint_transparent_region_black: boolean;
    alignmenttodesktop: "top" | "bottom" | "left" | "right" | "free";
    zorder: number[];
    stickyWindow: number[];
    constructor();
}
export declare class Menu {
    value: boolean;
    constructor();
}
export declare class Char {
    menu: "auto" | "hidden";
    menuitem: number[];
    defaultX: number;
    defaultY: number;
    defaultLeft: number;
    defaultTop: number;
    balloon: {
        offsetX: number;
        offsetY: number;
        alignment: "none" | "left" | "right";
    };
    seriko: {
        alignmenttodesktop: "top" | "bottom" | "left" | "right" | "free";
    };
    bindgroup: BindGroup[];
    constructor();
}
export declare class BindGroup {
    name: {
        category: string;
        parts: string;
        thumbnail: string;
    };
    default: boolean;
    addid: number[];
    constructor(category: string, parts: string, thumbnail?: string, _default?: boolean);
}
export declare function isBind(config: Config, scopeId: number, animId: number): boolean;
export declare function getAlignmenttodesktop(config: Config, scopeId: number): "top" | "bottom" | "left" | "right" | "free";
