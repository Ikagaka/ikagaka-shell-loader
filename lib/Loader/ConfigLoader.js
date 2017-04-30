"use strict";
/**
 * shell/master/descript.txt から Config 構造体を作る
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
const Config_1 = require("../Model/Config");
function loadFromJSONLike(json) {
    return __awaiter(this, void 0, void 0, function* () {
        const that = new Config_1.Config();
        const seriko = json["seriko"] != null ? json["seriko"] : {};
        const menu = json["menu"] != null ? json["menu"] : {};
        const char = (Array.isArray(json["char"]) ? json["char"] : []);
        // char*
        yield Promise.all(char.map((_char, id) => {
            return loadCharConfig(_char)
                .then((conf) => { that.char[id] = conf; });
        }));
        // descript.txtからbindgroup探してデフォルト値を反映
        that.char.forEach((_char, charId) => {
            that.bindgroup[charId] = [];
            _char.bindgroup.forEach((o, animId) => {
                that.bindgroup[charId][animId] = o.default;
            });
        });
        return that;
    });
}
exports.loadFromJSONLike = loadFromJSONLike;
function loadCharConfig(char) {
    return __awaiter(this, void 0, void 0, function* () {
        const that = new Config_1.Char();
        // char1.bindgroup[20].name = "装備,飛行装備" -> {category: "装備", parts: "飛行装備", thumbnail: ""};
        if (char["seriko"] != null && typeof char["seriko"]["alignmenttodesktop"] === "string") {
            switch (char["seriko"]["alignmenttodesktop"]) {
                case "left":
                    that.seriko.alignmenttodesktop = "left";
                    break;
                case "right":
                    that.seriko.alignmenttodesktop = "right";
                    break;
                case "top":
                    that.seriko.alignmenttodesktop = "top";
                    break;
                case "bottom":
                    that.seriko.alignmenttodesktop = "bottom";
                    break;
                case "free":
                    that.seriko.alignmenttodesktop = "free";
                    break;
                default: console.warn("ConfigLoader.loadCharConfig: unkown alignmenttodesktop type: ", char["seriko"]["alignmenttodesktop"]);
            }
        }
        if (Array.isArray(char["bindgroup"])) {
            char["bindgroup"].forEach((bindgroup, id) => {
                if (bindgroup != null && typeof bindgroup["name"] === "string") {
                    const [category, parts, thumbnail] = bindgroup["name"].split(",").map((a) => a.trim());
                    that.bindgroup[id] = new Config_1.BindGroup(category, parts, thumbnail, !!Number(bindgroup["default"]));
                }
            });
        }
        /*
        // sakura.bindoption0.group = "アクセサリ,multiple" -> {category: "アクセサリ", options: "multiple"}
        if(Array.isArray(char["bindoption"])){
          char["bindoption"].forEach((bindoption)=>{
            if(typeof bindoption.group === "string"){
              const [category, ...options] = (""+bindoption.group).split(",").map((a)=>a.trim())
              bindoption.group = {category, options};
            }
          });
        }
        */
        return that;
    });
}
exports.loadCharConfig = loadCharConfig;
