"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * shell/master/*** 以下のリソースを一元管理するための バリアント型
 */
const Util = require("../Util/");
class Shell {
    constructor(a, b, c, d, e, f) {
        this.directory = a;
        this.descript = b;
        this.descriptJSON = c;
        this.config = d;
        this.surfacesTxt = e;
        this.surfaceDefTree = f;
    }
    getSurfaceAlias(scopeId, surfaceId) {
        return getSurfaceAlias(this, scopeId, surfaceId);
    }
    getBindGroups(scopeId) {
        return getBindGroups(this, scopeId);
    }
}
exports.Shell = Shell;
function getSurfaceAlias(shell, scopeId, surfaceId) {
    const { aliases, surfaces } = shell.surfaceDefTree;
    const type = Util.scope(scopeId);
    if (typeof surfaceId === "string" || typeof surfaceId === "number") {
        if (aliases[type] != null && aliases[type][surfaceId] != null) {
            // まずエイリアスを探す
            const _surfaceId = Util.choice(aliases[type][surfaceId]);
            return _surfaceId;
        }
        if (typeof surfaceId === "number") {
            // 通常の処理
            const _surfaceId = surfaceId;
            return _surfaceId;
        }
    }
    // そんなサーフェスはない
    console.warn("Shell.hasSurface: surface alias scope:", scopeId + "as" + type + ", id:" + surfaceId + " is not defined.");
    return null;
}
// 着せ替えメニュー用情報ていきょう
function getBindGroups(shell, scopeId) {
    const { char } = shell.config;
    if (char[scopeId] == null) {
        return null;
    }
    return char[scopeId].bindgroup.map((bindgroup, bindgroupId) => {
        return bindgroup.name;
    });
}
