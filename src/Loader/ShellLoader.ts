/**
 * shell/master/*** ディレクトリから shell モデルを構築する
 */


import {Shell} from "../Model/Shell";
import {Config, JSONLike, Char, BindGroup, Descript} from "../Model/Config";
import {SurfaceDefinitionTree, SurfaceDefinition, SurfaceElement} from "../Model/SurfaceDefinitionTree";
import * as SCL from "./ConfigLoader";
import * as STL from "./SurfaceDefinitionTreeLoader";
import * as SY from "surfaces_txt2yaml";
import * as Encoding from "encoding-japanese";
import {fastfind} from "../Util/";

export type Directory = {[filepath: string]: ()=> Promise<ArrayBuffer>};

export async function load(directory: Directory): Promise<Shell>{
  const {descript, descriptJSON, config} = await loadDescript(directory);
  const {surfacesTxt, surfaceDefTree} = await loadSurfacesTxt(directory);
  await loadSurfaceTable(directory);
  const _surfaceDefTree = await loadSurfacePNG(directory, surfaceDefTree);
  const shell = new Shell();
  
  shell.directory = directory;

  shell.descript = descript;
  shell.descriptJSON = descriptJSON;
  shell.config = config;

  shell.surfacesTxt = surfacesTxt;
  shell.surfaceDefTree = _surfaceDefTree;

  return shell;
}

// directoryからdescript.txtを探して descript
export async function loadDescript(directory: Directory): Promise<{descript:Descript, descriptJSON: JSONLike, config:Config}> {
  const name = fastfind(Object.keys(directory), "descript.txt");
  let descript: Descript = {};
  let descriptJSON: JSONLike = {};
  const file_getter = directory[name];
  if (!(file_getter instanceof Function)) {
    console.info("ShellModelLoader.loadDescript: descript.txt is not found");
  } else {
    const text = await file_getter();
    descript = parseDescript(convert(text));
    Object.keys(descript).forEach((key)=>{
      let _key = key
        .replace(/^sakura\./, "char0.")
        .replace(/^kero\./, "char1.");
      decolateJSONizeDescript<JSONLike, string>(descriptJSON, _key, descript[key]);
    });
  }
  // key-valueなdescriptをconfigへ変換
  const config = await SCL.loadFromJSONLike(descriptJSON);
  return {descript, descriptJSON, config};
}



// surfaces.txtを読んでsurfacesTxtに反映
export async function loadSurfacesTxt(directory: Directory): Promise<{ surfacesTxt: SY.SurfacesTxt, surfaceDefTree: SurfaceDefinitionTree }> {
  const filenames = findSurfacesTxt(Object.keys(directory));
  if(filenames.length === 0){
    console.info("ShellModelLoader.loadSurfacesTxt: surfaces.txt is not found");
  }
  const file_contents = await Promise.all(filenames.map((name)=> directory[name]()));
  const cat_text = file_contents.reduce((text, file_content)=> text + convert(file_content), "");
  const surfacesTxt = SY.txt_to_data(cat_text, {compatible: 'ssp-lazy'});
  return STL.loadSurfaceDefinitionTreeFromsurfacesTxt2Yaml(surfacesTxt)
  .then((surfaceDefTree)=>{
    return { surfacesTxt, surfaceDefTree };
  });
}


// surfacetable.txtを読む予定
export async function loadSurfaceTable(directory: Directory): Promise<void> {
  const surfacetable_name = Object.keys(directory).filter((name)=> /^surfacetable.*\.txt$/i.test(name))[0] || "";
  if(surfacetable_name === ""){
    console.info("ShellModelLoader.loadSurfaceTable", "surfacetable.txt is not found.");
  }else{
    const content = await directory[surfacetable_name]();
    const txt = convert(content);
    console.info("ShellModelLoader.loadSurfaceTable", "surfacetable.txt is not supported yet.");
    // TODO
  }
  return Promise.resolve();
}

// directory から surface*.png をelement0として読み込んで surfaceTree に反映
export function loadSurfacePNG(directory: Directory, tree: SurfaceDefinitionTree): Promise<SurfaceDefinitionTree>{
  const surfaceTree = tree.surfaces;
  const surface_names = Object.keys(directory).filter((filename)=> /^surface(\d+)\.png$/i.test(filename));
  surface_names.forEach((filename)=>{
    const n = Number((/^surface(\d+)\.png$/i.exec(filename)||["","NaN"])[1]);
    if(!isFinite(n)){ return; }
    // 存在した
    if(!( surfaceTree[n] instanceof SurfaceDefinition) ){
      // surfaces.txtで未定義なら追加
      surfaceTree[n] = new SurfaceDefinition();
      surfaceTree[n].elements[0] = new SurfaceElement("base", filename);
    }else if( !(surfaceTree[n].elements[0] instanceof SurfaceElement) ){
      // surfaces.txtで定義済みだけどelement0ではない
      surfaceTree[n].elements[0] = new SurfaceElement("base", filename);
    }else{
      // surfaces.txtでelement0まで定義済み
      console.info("SurfaceModelLoader.loadSurfacePNG: file", filename, "is rejected. alternative uses", surfaceTree[n].elements);
    }
  });
  return Promise.resolve(tree);
}



// convert some encoding txt file arraybuffer to js string
// TODO: use text-enconding & charset detection code
export function convert(buffer: ArrayBuffer):string{
  //return new TextDecoder('shift_jis').decode(buffer);
  return Encoding.codeToString(Encoding.convert(new Uint8Array(buffer), 'UNICODE', 'AUTO'));
}

export function findSurfacesTxt(filepaths: string[]): string[] {
  return filepaths.filter((name)=> /^surfaces.*\.txt$|^alias\.txt$/i.test(name));
}





export function decolateJSONizeDescript<T, S>(o: T, key: string, value: S): void {
  // オートマージ
  // dic["a.b.c"]="d"なテキストをJSON形式に変換している気がする
  let ptr = o;
  const props = key.split(".");
  for(let i=0; i<props.length; i++){
    const prop = props[i];
    const [_prop, num]:[string, string] = Array.prototype.slice.call(/^([^\d]+)(\d+)?$/.exec(prop)||["", "", ""], 1);
    const _num = Number(num);
    if(isFinite(_num)){
      if(!Array.isArray(ptr[_prop])){
        ptr[_prop] = [];
      }
      ptr[_prop][_num] = ptr[_prop][_num] || {};
      if(i !== props.length-1){
        ptr = ptr[_prop][_num];
      }else{
        if(ptr[_prop][_num] instanceof Object && Object.keys(ptr[_prop][_num]).length > 0){
          // descriptではまれに（というかmenu)だけjson化できない項目がある。形式は以下の通り。
          // menu, 0 -> menu.value
          // menu.font...
          // ヤケクソ気味にmenu=hogeをmenu.value=hogeとして扱っている
          // このifはその例外への対処である
          ptr[_prop][_num].value = Number(value) || value;
        }else{
          ptr[_prop][_num] = Number(value) || value;
        }
      }
    }else{
      ptr[_prop] = ptr[_prop] || {};
      if(i !== props.length-1){
        ptr = ptr[_prop];
      }else{
        if(ptr[_prop] instanceof Object && Object.keys(ptr[_prop]).length > 0){
          ptr[_prop].value = Number(value) || value;
        }else{
          ptr[_prop] = Number(value) || value;
        }
      }
    }
  }
  return;
}


// "hoge.huga, foo, bar\n" to {"hoge.huga": "foo, bar"}
export function parseDescript(text: string): {[key:string]:string}{
  text = text.replace(/(?:\r\n|\r|\n)/g, "\n"); // CRLF->LF
  while(true){// remove commentout
    const match = (/(?:(?:^|\s)\/\/.*)|^\s+?$/g.exec(text) || ["",""])[0];
    if(match.length === 0){ break; }
    text = text.replace(match, "");
  }
  const lines = text.split("\n");
  const _lines = lines.filter(function(line){ return line.length !== 0; }); // remove no content line
  const dic = _lines.reduce<{[key:string]:string}>(function(dic, line){
    const [key, ...vals] = line.split(",");
    const _key = key.trim();
    const val = vals.join(",").trim();
    dic[_key] = val;
    return dic;
  }, {});
  return dic;
}
