import { SurfaceDefinitionTree } from "./SurfaceDefinitionTree";
import { Descript, JSONLike, Config } from "./Config";
import { SurfacesTxt } from "surfaces_txt2yaml";
export declare type Directory = {
    [filepath: string]: () => Promise<ArrayBuffer>;
};
export declare class Shell {
    /** filepathに 対応するファイルの reader */
    directory: Directory;
    /** descript.txtをcsvと解釈した時の値 */
    descript: Descript;
    /** descript.txtをjsonと解釈した時の値 */
    descriptJSON: JSONLike;
    /** descript.txtから読み込めた設定の構造体 */
    config: Config;
    /** SurfacesTxt2Yamlの内容 */
    surfacesTxt: SurfacesTxt;
    /** このshell.jsが解釈しているShellのリソースツリー */
    surfaceDefTree: SurfaceDefinitionTree;
    constructor();
    getSurfaceAlias(scopeId: number, surfaceId: number | string): number | null;
    getBindGroups(scopeId: number): {
        category: string;
        parts: string;
        thumbnail: string;
    }[] | null;
}
