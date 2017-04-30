export declare function extend(clone: any, copy: any): any;
export declare function extend(deep: boolean, clone: any, copy: any): any;
export declare function find(paths: string[], filename: string): string[];
export declare function fastfind(paths: string[], filename: string): string;
export declare function copy(cnv: HTMLCanvasElement | HTMLImageElement): HTMLCanvasElement;
export declare function has<T>(dir: {
    [key: string]: T;
}, path: string): string;
export declare function get<T>(dir: {
    [key: string]: T;
}, path: string): Promise<T>;
export declare function scope(scopeId: number): string;
export declare function unscope(charId: string): number;
export declare function choice<T>(arr: T[]): T;
