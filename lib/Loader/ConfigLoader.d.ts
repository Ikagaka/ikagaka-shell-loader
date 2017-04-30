/**
 * shell/master/descript.txt から Config 構造体を作る
 */
import { Config, JSONLike, Char } from "../Model/Config";
export declare function loadFromJSONLike(json: JSONLike): Promise<Config>;
export declare function loadCharConfig(char: JSONLike): Promise<Char>;
