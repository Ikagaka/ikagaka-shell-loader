"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const SU = require("../Util/index");
const ST = require("../Model/SurfaceDefinitionTree");
const ST2Y = require("surfaces_txt2yaml");
const SC = require("../Model/Config");
const SCL = require("../Loader/ConfigLoader");
const SL = require("../Loader/ShellLoader");
const NarLoader = require("narloader");
window["SurfaceTree"] = ST;
window["SurfaceUtil"] = SU;
window["SurfacesTxt2Yaml"] = ST2Y;
const QUnit = require("qunitjs");
const empower = require('empower');
const formatter = require('power-assert-formatter');
const qunitTap = require("qunit-tap");
//QUnit.config.autostart = false;
empower(QUnit.assert, formatter(), { destructive: true });
qunitTap(QUnit, function () { console.log.apply(console, arguments); }, { showSourceOnFailure: false });
function cvt(a) {
    return a.childrenAllSync().reduce((o, file) => (o[a.relative(file.path).path] = () => Promise.resolve(file.readFileSync().buffer), o), {});
}
QUnit.module('SurfaceUtil');
QUnit.test("SurfaceUtil.find", (assert) => {
    const paths = [
        "surface0.png",
        "surface10.png",
        "elements/element0.png"
    ];
    let results = SU.find(paths, "./surface0.png");
    assert.ok(results[0] === paths[0]);
    results = SU.find(paths, "SURFACE10.PNG");
    assert.ok(results[0] === paths[1]);
    results = SU.find(paths, "elements\\element0.png");
    assert.ok(results[0] === paths[2]);
});
QUnit.test("SurfaceUtil.choice", (assert) => {
    let results = (() => { let arr = []; for (let i = 0; i < 1000; i++) {
        arr.push(SU.choice([1, 2, 3]));
    } return arr; })();
    let a = results.reduce(((count, val) => val === 1 ? count + 1 : count), 0) / results.length;
    assert.ok(0.2 < a && a < 0.4);
    let b = results.reduce(((count, val) => val === 2 ? count + 1 : count), 0) / results.length;
    assert.ok(0.2 < b && b < 0.4);
    let c = results.reduce(((count, val) => val === 3 ? count + 1 : count), 0) / results.length;
    assert.ok(0.2 < c && c < 0.4);
});
QUnit.test("SurfaceUtil.scope", (assert) => {
    assert.ok("sakura" === SU.scope(0));
    assert.ok("kero" === SU.scope(1));
    assert.ok("char2" === SU.scope(2));
});
QUnit.test("SurfaceUtil.unscope", (assert) => {
    assert.ok(0 === SU.unscope("sakura"));
    assert.ok(1 === SU.unscope("kero"));
    assert.ok(2 === SU.unscope("char2"));
});
QUnit.module('ShellConfigLoader');
QUnit.test('ShellConfigLoader.loadFromJSONLike', (assert) => __awaiter(this, void 0, void 0, function* () {
    const dir = yield NarLoader.loadFromURI("/nar/mobilemaster.nar");
    const dic = cvt(dir.new("shell/master"));
    const descript = yield SL.loadDescript(dic);
    const config = yield SCL.loadFromJSONLike(descript.descript);
    assert.ok(descript.descript["charset"] === "Shift_JIS");
    assert.ok(descript.descript["sakura.balloon.offsetx"] === "21");
    assert.ok(descript.descript["seriko.paint_transparent_region_black"] === "0");
    assert.ok(config.seriko instanceof SC.Seriko);
    assert.ok(config.seriko.use_self_alpha === false);
    assert.ok(config.seriko.alignmenttodesktop === "bottom");
    assert.ok(config.menu instanceof SC.Menu);
    assert.ok(config.char instanceof Array);
    assert.ok(config.bindgroup instanceof Array);
    assert.ok(typeof config.enableRegion === "boolean");
    assert.ok(typeof config.position === "string");
}));
QUnit.module('SurfaceTreeLoader');
QUnit.test('SurfaceTreeLoader.loadSurfacesTxt', (assert) => __awaiter(this, void 0, void 0, function* () {
    const nanikaDir = yield NarLoader.loadFromURI('../nar/mobilemaster.nar');
    const shellDir = cvt(nanikaDir.new('shell/master'));
    const surfaceTree = yield SL.loadSurfacesTxt(shellDir);
    const { aliases, surfaces, descript } = surfaceTree.surfaceDefTree;
    assert.ok(Array.isArray(aliases));
    assert.ok(Array.isArray(surfaces));
    surfaces.forEach((srf) => {
        const { elements, collisions, animations, balloons, points } = srf;
        assert.ok(Array.isArray(elements) && elements.every((elm) => elm instanceof ST.SurfaceElement));
        assert.ok(Array.isArray(collisions) && collisions.every((col) => col instanceof ST.SurfaceCollision));
        assert.ok(Array.isArray(animations) && animations.every((anm) => anm instanceof ST.SurfaceAnimation));
    });
    assert.ok(descript.collisionSort === "ascend");
    assert.ok(descript.animationSort === "ascend");
}));
QUnit.module('ShellLoader');
QUnit.test('load', (assert) => __awaiter(this, void 0, void 0, function* () {
    const nanikaDir = yield NarLoader.loadFromURI('../nar/mobilemaster.nar');
    const shellDir = cvt(nanikaDir.new('shell/master'));
    const shell = yield SL.load(shellDir);
    assert.ok(shell.getBindGroups(0) !== null);
    assert.ok(shell.getSurfaceAlias(0, 0) !== null);
}));
