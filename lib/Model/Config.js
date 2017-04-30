"use strict";
/*
 * shell/master/descript.txt および現在の シェル 状態を表す構造体
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    constructor() {
        this.seriko = new Seriko();
        this.menu = new Menu();
        this.char = [];
        // states
        this.bindgroup = [];
        this.enableRegion = false;
        this.position = "fixed";
    }
    isBind(scopeId, animId) {
        return isBind(this, scopeId, animId);
    }
    getAlignmenttodesktop(scopeId) {
        return getAlignmenttodesktop(this, scopeId);
    }
}
exports.Config = Config;
class Seriko {
    // \![set,sticky-window,スコープID,スコープID,...]のdescript版。タグを実行しなくてもあらかじめ設定できる。
    constructor() {
        this.use_self_alpha = false;
        this.paint_transparent_region_black = true;
        this.alignmenttodesktop = "bottom";
        this.zorder = [];
        this.stickyWindow = [];
    }
}
exports.Seriko = Seriko;
class Menu {
    /*font: {
      name: string; // オーナードローメニューに使用するフォント
      height: number; // オーナードローメニューに使用する文字の大きさ。
    };*/
    /*background: {
      bitmap: {
        filename: string; // バックグラウンド表示画像ファイル名。
      };
      font: {
        color: {
          r: number; // バックグラウンド文字色赤(0～255)
          b: number; // バックグラウンド文字色緑(0～255)
          g: number; // バックグラウンド文字色青(0～255)
        };
      };
      alignment: string; // バックグラウンド画像をrighttopで右寄せ、lefttopで左寄せ、centertopで中央寄せ。SSPのみrightbottom、leftbottom、centerbottomのような下方向固定も可。lefttop
    };*/
    /*
    foreground: {
      bitmap: {
        filename: string; // フォアグラウンド表示画像ファイル名。
      };
      font: {
        color: {
          r: number; // フォアグラウンド文字色赤(0～255)
          b: number; // フォアグラウンド文字色緑(0～255)
          g: number; // フォアグラウンド文字色青(0～255)
        };
      };
      alignment: string; // フォアグラウンド画像をrighttopで右寄せ、lefttopで左寄せ、centertopで中央寄せ。SSPのみrightbottom、leftbottom、centerbottomのような下方向固定も可。lefttop
    };*/
    /*
    sidebar?: {
      bitmap: {
        filename: string; // サイドバー表示画像ファイル名。
      };
      alignment: string; // サイドバー画像をtopで上寄せ、bottomで下寄せ。bottom
    };
    separator?: {
      color: {
        r: number; // セパレータ色赤(0～255)
        b: number; // セパレータ色緑(0～255)
        g: number; // セパレータ色青(0～255)
      };
    };*/
    /*disable: {// 選択不可文字
      font: {
        color: {
          r: number; // フォアグラウンド文字色赤(0～255)
          b: number; // フォアグラウンド文字色緑(0～255)
          g: number; // フォアグラウンド文字色青(0～255)
        };
      };
    }*/
    constructor() {
        this.value = false;
    }
}
exports.Menu = Menu;
class Char {
    /*
    bindoption: {
      // char*.bindoption*.group,カテゴリ名,オプション
      // その着せ替えカテゴリにオプションを設定。*は単に0から始まる通し番号(3人目以降)。
      // mustselectでパーツを必ず1つ選択、multipleで複数のパーツを選択可能。
      // オプションは+区切りで複数可。
      group: {
        category: string;
        options: string[]; //multiple | mustselect
      }
    }[];*/
    constructor() {
        this.menu = "auto";
        this.menuitem = [];
        this.defaultX = 0;
        this.defaultY = 0;
        this.defaultLeft = 0;
        this.defaultTop = 0;
        this.balloon = {
            offsetX: 0,
            offsetY: 0,
            alignment: "none"
        };
        this.seriko = { alignmenttodesktop: "bottom" };
        this.bindgroup = [];
    }
}
exports.Char = Char;
class BindGroup {
    // 着せ替えの同時実行設定。アニメーションID*番の着せ替えが有効になった（表示された）時に、addidとして指定した着せ替えも同時に有効にする。カンマ区切りで複数指定可。
    // 同時実行中の着せ替えは、元となった着せ替えが無効になった時点で無効になる。複数の着せ替えのaddidとして同一の着せ替えが同時実行指定されている場合、元となったすべての着せ替えが無効になるまで同時実行指定の着せ替えも無効にならない。
    constructor(category, parts, thumbnail = "", _default = false) {
        this.name = {
            category: category,
            parts: parts,
            thumbnail: thumbnail
        };
        this.default = _default;
        this.addid = [];
    }
}
exports.BindGroup = BindGroup;
function isBind(config, scopeId, animId) {
    const { bindgroup } = config;
    if (bindgroup[scopeId] == null) {
        return false;
    }
    if (bindgroup[scopeId][animId] === false) {
        return false;
    }
    return true;
}
function getAlignmenttodesktop(config, scopeId) {
    // config.char[surfaceId] は任意設定なので存在確認しないといけない
    if (config.char[scopeId] != null && typeof config.char[scopeId].seriko.alignmenttodesktop === "string") {
        // 個別設定
        return config.char[scopeId].seriko.alignmenttodesktop;
    }
    else {
        // 全体設定が初期値
        return config.seriko.alignmenttodesktop;
    }
}
