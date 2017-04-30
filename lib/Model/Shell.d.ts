import { SurfaceDefinitionTree } from "./SurfaceDefinitionTree";
import { Descript, JSONLike, Config } from "./Config";
import { SurfacesTxt } from "surfaces_txt2yaml";
export declare type Directory = {
    [filepath: string]: () => Promise<ArrayBuffer>;
};
export declare class Shell {
    /** filepathに 対応するファイルの reader */
    readonly directory: Directory;
    /** descript.txtをcsvと解釈した時の値 */
    readonly descript: Descript;
    /** descript.txtをjsonと解釈した時の値 */
    readonly descriptJSON: JSONLike;
    /** descript.txtから読み込めた設定の構造体 */
    readonly config: Config;
    /** SurfacesTxt2Yamlの内容 */
    readonly surfacesTxt: SurfacesTxt;
    /** このshell.jsが解釈しているShellのリソースツリー */
    readonly surfaceDefTree: SurfaceDefinitionTree;
    constructor(a: Directory, b: Descript, c: JSONLike, d: Config, e: SurfacesTxt, f: SurfaceDefinitionTree);
    getSurfaceAlias(scopeId: number, surfaceId: number | string): number | null;
    getBindGroups(scopeId: number): {
        category: string;
        parts: string;
        thumbnail: string;
    }[] | null;
}
