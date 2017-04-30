"use strict";
/**
 * shell/master/*** ディレクトリから shell モデルを構築する
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Shell_1 = require("../Model/Shell");
const SurfaceDefinitionTree_1 = require("../Model/SurfaceDefinitionTree");
const SCL = require("./ConfigLoader");
const STL = require("./SurfaceDefinitionTreeLoader");
const SY = require("surfaces_txt2yaml");
const Encoding = require("encoding-japanese");
const _1 = require("../Util/");
function load(directory) {
    return __awaiter(this, void 0, void 0, function* () {
        const { descript, descriptJSON, config } = yield loadDescript(directory);
        const { surfacesTxt, surfaceDefTree } = yield loadSurfacesTxt(directory);
        yield loadSurfaceTable(directory);
        const _surfaceDefTree = yield loadSurfacePNG(directory, surfaceDefTree);
        const shell = new Shell_1.Shell(directory, descript, descriptJSON, config, surfacesTxt, _surfaceDefTree);
        return shell;
    });
}
exports.load = load;
// directoryからdescript.txtを探して descript
function loadDescript(directory) {
    return __awaiter(this, void 0, void 0, function* () {
        const name = _1.fastfind(Object.keys(directory), "descript.txt");
        let descript = {};
        let descriptJSON = {};
        const file_getter = directory[name];
        if (!(file_getter instanceof Function)) {
            console.info("ShellModelLoader.loadDescript: descript.txt is not found");
        }
        else {
            const text = yield file_getter();
            descript = parseDescript(convert(text));
            Object.keys(descript).forEach((key) => {
                let _key = key
                    .replace(/^sakura\./, "char0.")
                    .replace(/^kero\./, "char1.");
                decolateJSONizeDescript(descriptJSON, _key, descript[key]);
            });
        }
        // key-valueなdescriptをconfigへ変換
        const config = yield SCL.loadFromJSONLike(descriptJSON);
        return { descript, descriptJSON, config };
    });
}
exports.loadDescript = loadDescript;
// surfaces.txtを読んでsurfacesTxtに反映
function loadSurfacesTxt(directory) {
    return __awaiter(this, void 0, void 0, function* () {
        const filenames = findSurfacesTxt(Object.keys(directory));
        if (filenames.length === 0) {
            console.info("ShellModelLoader.loadSurfacesTxt: surfaces.txt is not found");
        }
        const file_contents = yield Promise.all(filenames.map((name) => directory[name]()));
        const cat_text = file_contents.reduce((text, file_content) => text + convert(file_content), "");
        const surfacesTxt = SY.txt_to_data(cat_text, { compatible: 'ssp-lazy' });
        return STL.loadSurfaceDefinitionTreeFromsurfacesTxt2Yaml(surfacesTxt)
            .then((surfaceDefTree) => {
            return { surfacesTxt, surfaceDefTree };
        });
    });
}
exports.loadSurfacesTxt = loadSurfacesTxt;
// surfacetable.txtを読む予定
function loadSurfaceTable(directory) {
    return __awaiter(this, void 0, void 0, function* () {
        const surfacetable_name = Object.keys(directory).filter((name) => /^surfacetable.*\.txt$/i.test(name))[0] || "";
        if (surfacetable_name === "") {
            console.info("ShellModelLoader.loadSurfaceTable", "surfacetable.txt is not found.");
        }
        else {
            const content = yield directory[surfacetable_name]();
            const txt = convert(content);
            console.info("ShellModelLoader.loadSurfaceTable", "surfacetable.txt is not supported yet.");
            // TODO
        }
        return Promise.resolve();
    });
}
exports.loadSurfaceTable = loadSurfaceTable;
// directory から surface*.png をelement0として読み込んで surfaceTree に反映
function loadSurfacePNG(directory, tree) {
    const surfaceTree = tree.surfaces;
    const surface_names = Object.keys(directory).filter((filename) => /^surface(\d+)\.png$/i.test(filename));
    surface_names.forEach((filename) => {
        const n = Number((/^surface(\d+)\.png$/i.exec(filename) || ["", "NaN"])[1]);
        if (!isFinite(n)) {
            return;
        }
        // 存在した
        if (!(surfaceTree[n] instanceof SurfaceDefinitionTree_1.SurfaceDefinition)) {
            // surfaces.txtで未定義なら追加
            surfaceTree[n] = new SurfaceDefinitionTree_1.SurfaceDefinition();
            surfaceTree[n].elements[0] = new SurfaceDefinitionTree_1.SurfaceElement("base", filename);
        }
        else if (!(surfaceTree[n].elements[0] instanceof SurfaceDefinitionTree_1.SurfaceElement)) {
            // surfaces.txtで定義済みだけどelement0ではない
            surfaceTree[n].elements[0] = new SurfaceDefinitionTree_1.SurfaceElement("base", filename);
        }
        else {
            // surfaces.txtでelement0まで定義済み
            console.info("SurfaceModelLoader.loadSurfacePNG: file", filename, "is rejected. alternative uses", surfaceTree[n].elements);
        }
    });
    return Promise.resolve(tree);
}
exports.loadSurfacePNG = loadSurfacePNG;
// convert some encoding txt file arraybuffer to js string
// TODO: use text-enconding & charset detection code
function convert(buffer) {
    //return new TextDecoder('shift_jis').decode(buffer);
    return Encoding.codeToString(Encoding.convert(new Uint8Array(buffer), 'UNICODE', 'AUTO'));
}
exports.convert = convert;
function findSurfacesTxt(filepaths) {
    return filepaths.filter((name) => /^surfaces.*\.txt$|^alias\.txt$/i.test(name));
}
exports.findSurfacesTxt = findSurfacesTxt;
function decolateJSONizeDescript(o, key, value) {
    // オートマージ
    // dic["a.b.c"]="d"なテキストをJSON形式に変換している気がする
    let ptr = o;
    const props = key.split(".");
    for (let i = 0; i < props.length; i++) {
        const prop = props[i];
        const [_prop, num] = Array.prototype.slice.call(/^([^\d]+)(\d+)?$/.exec(prop) || ["", "", ""], 1);
        const _num = Number(num);
        if (isFinite(_num)) {
            if (!Array.isArray(ptr[_prop])) {
                ptr[_prop] = [];
            }
            ptr[_prop][_num] = ptr[_prop][_num] || {};
            if (i !== props.length - 1) {
                ptr = ptr[_prop][_num];
            }
            else {
                if (ptr[_prop][_num] instanceof Object && Object.keys(ptr[_prop][_num]).length > 0) {
                    // descriptではまれに（というかmenu)だけjson化できない項目がある。形式は以下の通り。
                    // menu, 0 -> menu.value
                    // menu.font...
                    // ヤケクソ気味にmenu=hogeをmenu.value=hogeとして扱っている
                    // このifはその例外への対処である
                    ptr[_prop][_num].value = Number(value) || value;
                }
                else {
                    ptr[_prop][_num] = Number(value) || value;
                }
            }
        }
        else {
            ptr[_prop] = ptr[_prop] || {};
            if (i !== props.length - 1) {
                ptr = ptr[_prop];
            }
            else {
                if (ptr[_prop] instanceof Object && Object.keys(ptr[_prop]).length > 0) {
                    ptr[_prop].value = Number(value) || value;
                }
                else {
                    ptr[_prop] = Number(value) || value;
                }
            }
        }
    }
    return;
}
exports.decolateJSONizeDescript = decolateJSONizeDescript;
// "hoge.huga, foo, bar\n" to {"hoge.huga": "foo, bar"}
function parseDescript(text) {
    text = text.replace(/(?:\r\n|\r|\n)/g, "\n"); // CRLF->LF
    while (true) {
        const match = (/(?:(?:^|\s)\/\/.*)|^\s+?$/g.exec(text) || ["", ""])[0];
        if (match.length === 0) {
            break;
        }
        text = text.replace(match, "");
    }
    const lines = text.split("\n");
    const _lines = lines.filter(function (line) { return line.length !== 0; }); // remove no content line
    const dic = _lines.reduce(function (dic, line) {
        const [key, ...vals] = line.split(",");
        const _key = key.trim();
        const val = vals.join(",").trim();
        dic[_key] = val;
        return dic;
    }, {});
    return dic;
}
exports.parseDescript = parseDescript;
