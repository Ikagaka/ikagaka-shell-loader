/*
 * shell/master/*** 以下のリソースを一元管理するための バリアント型
 */
import * as Util from "../Util/";
import {SurfaceDefinitionTree} from "./SurfaceDefinitionTree";
import {Descript, JSONLike, Config} from "./Config";
import {SurfacesTxt} from "surfaces_txt2yaml";

export type Directory = {[filepath: string]: ()=> Promise<ArrayBuffer>};

export class Shell {
  /** filepathに 対応するファイルの reader */
  directory: Directory; 

  /** descript.txtをcsvと解釈した時の値 */
  descript:     Descript; 
  /** descript.txtをjsonと解釈した時の値 */
  descriptJSON: JSONLike;
  /** descript.txtから読み込めた設定の構造体 */
  config:       Config;

  /** SurfacesTxt2Yamlの内容 */
  surfacesTxt: SurfacesTxt;
  /** このshell.jsが解釈しているShellのリソースツリー */
  surfaceDefTree: SurfaceDefinitionTree;
  
  constructor() {
    this.directory = {};

    this.descript = {};
    this.descriptJSON = {};
    this.config = new Config();

    this.surfacesTxt = <SurfacesTxt>{};
    this.surfaceDefTree = new SurfaceDefinitionTree();
  }
  getSurfaceAlias(scopeId: number, surfaceId: number|string): number | null {
    return getSurfaceAlias(this, scopeId, surfaceId);
  }
  getBindGroups(scopeId: number): {category: string, parts: string, thumbnail: string}[] | null {
    return getBindGroups(this, scopeId);
  }
}



function getSurfaceAlias(shell: Shell, scopeId: number, surfaceId: number|string): number | null {
  const {aliases, surfaces} = shell.surfaceDefTree;
  const type = Util.scope(scopeId);
  if(typeof surfaceId === "string" || typeof surfaceId === "number"){
    if(aliases[type] != null && aliases[type][surfaceId] != null){
      // まずエイリアスを探す
      const _surfaceId = Util.choice<number>(aliases[type][surfaceId]);
      return _surfaceId;
    }
    if(typeof surfaceId === "number"){
      // 通常の処理
      const _surfaceId = surfaceId;
      return _surfaceId;
    }
  }
  // そんなサーフェスはない
  console.warn("Shell.hasSurface: surface alias scope:", scopeId + "as" + type+ ", id:" + surfaceId + " is not defined.");
  return null;
}


// 着せ替えメニュー用情報ていきょう
function getBindGroups(shell: Shell, scopeId: number): {category: string, parts: string, thumbnail: string}[] | null {
  const {char} = shell.config;
  if(char[scopeId] == null){
    return null;
  }
  return char[scopeId].bindgroup.map((bindgroup, bindgroupId)=>{
    return bindgroup.name;
  });
}

