/**
 * shell/master/*** ディレクトリから shell モデルを構築する
 */
import { Shell } from "../Model/Shell";
import { Config, JSONLike, Descript } from "../Model/Config";
import { SurfaceDefinitionTree } from "../Model/SurfaceDefinitionTree";
import * as SY from "surfaces_txt2yaml";
export declare type Directory = {
    [filepath: string]: () => Promise<ArrayBuffer>;
};
export declare function load(directory: Directory): Promise<Shell>;
export declare function loadDescript(directory: Directory): Promise<{
    descript: Descript;
    descriptJSON: JSONLike;
    config: Config;
}>;
export declare function loadSurfacesTxt(directory: Directory): Promise<{
    surfacesTxt: SY.SurfacesTxt;
    surfaceDefTree: SurfaceDefinitionTree;
}>;
export declare function loadSurfaceTable(directory: Directory): Promise<void>;
export declare function loadSurfacePNG(directory: Directory, tree: SurfaceDefinitionTree): Promise<SurfaceDefinitionTree>;
export declare function convert(buffer: ArrayBuffer): string;
export declare function findSurfacesTxt(filepaths: string[]): string[];
export declare function decolateJSONizeDescript<T, S>(o: T, key: string, value: S): void;
export declare function parseDescript(text: string): {
    [key: string]: string;
};
