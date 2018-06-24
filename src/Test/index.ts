import * as SU from "../Util/index";
import * as ST from "../Model/SurfaceDefinitionTree";
import * as STL from "../Loader/SurfaceDefinitionTreeLoader";
import ST2Y = require("surfaces_txt2yaml");
import * as SC from "../Model/Config";
import * as SCL from "../Loader/ConfigLoader";
import * as SL from "../Loader/ShellLoader";
import * as NarLoader from "narloader";
import { NanikaContainerSyncDirectory } from "nanika-storage";
import * as SML from "../Loader/ShellLoader";
import * as SH from "../Model/Shell";


window["SurfaceTree"] = ST;
window["SurfaceUtil"] = SU;
window["SurfacesTxt2Yaml"] = ST2Y;

import QUnit = require('qunitjs');
const empower   = <Function>require('empower');
const formatter = <Function>require('power-assert-formatter');
const qunitTap  = <Function>require("qunit-tap");
//QUnit.config.autostart = false;
empower(QUnit.assert, formatter(), { destructive: true });
qunitTap(QUnit, function() { console.log.apply(console, arguments); }, {showSourceOnFailure: false});

function cvt(a: NanikaContainerSyncDirectory): {[a:string]: ()=> Promise<ArrayBuffer>} {
  return a.childrenAllSync().reduce((o,file)=> (o[a.relative(file.path).path] = ()=> Promise.resolve(file.readFileSync().buffer), o), {});
}



QUnit.module('SurfaceUtil');




QUnit.test("SurfaceUtil.find", (assert)=>{
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

QUnit.test("SurfaceUtil.choice", (assert)=>{
  let results = (()=>{ let arr:number[]=[]; for(let i=0;i<1000;i++){arr.push(SU.choice([1,2,3]));} return arr; })();
  let a = results.reduce(((count, val)=> val === 1 ? count+1 : count), 0)/results.length;
  assert.ok(0.2 < a && a < 0.4);
  let b = results.reduce(((count, val)=> val === 2 ? count+1 : count), 0)/results.length;
  assert.ok(0.2 < b && b < 0.4);
  let c = results.reduce(((count, val)=> val === 3 ? count+1 : count), 0)/results.length;
  assert.ok(0.2 < c && c < 0.4);
});


QUnit.test("SurfaceUtil.scope", (assert)=>{
  assert.ok("sakura" === SU.scope(0));
  assert.ok("kero" === SU.scope(1));
  assert.ok("char2" === SU.scope(2));
});

QUnit.test("SurfaceUtil.unscope", (assert)=>{
  assert.ok(0 === SU.unscope("sakura"));
  assert.ok(1 === SU.unscope("kero"));
  assert.ok(2 === SU.unscope("char2"));
});







QUnit.module('ShellConfigLoader');


QUnit.test('ShellConfigLoader.loadFromJSONLike', async (assert)=>{
  const dir = await NarLoader.loadFromURI("/nar/mobilemaster.nar");
  const dic = cvt(dir.new("shell/master") as NanikaContainerSyncDirectory);
  const descript = await SL.loadDescript(dic);
  const config = await SCL.loadFromJSONLike(descript.descript);

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
});



QUnit.module('SurfaceTreeLoader');

QUnit.test('SurfaceTreeLoader.loadSurfacesTxt', async (assert)=>{
  const nanikaDir = await NarLoader.loadFromURI('../nar/mobilemaster.nar');
  const shellDir = cvt(nanikaDir.new('shell/master') as NanikaContainerSyncDirectory);
  const surfaceTree = await SL.loadSurfacesTxt(shellDir);
  const {aliases, surfaces, descript} = surfaceTree.surfaceDefTree;
  assert.ok(Array.isArray(aliases));
  assert.ok(Array.isArray(surfaces));
  surfaces.forEach((srf)=>{
    const {elements, collisions, animations, balloons, points} = srf;
    assert.ok(Array.isArray(elements)   &&   elements.every((elm)=> elm instanceof ST.SurfaceElement ));
    assert.ok(Array.isArray(collisions) && collisions.every((col)=> col instanceof ST.SurfaceCollision ));
    assert.ok(Array.isArray(animations) && animations.every((anm)=> anm instanceof ST.SurfaceAnimation ));

  });
  assert.ok(descript.collisionSort === "ascend");
  assert.ok(descript.animationSort === "ascend");
});


QUnit.module('ShellLoader');

QUnit.test('load', async (assert)=>{
  const nanikaDir = await NarLoader.loadFromURI('../nar/mobilemaster.nar');
  const shellDir = cvt(nanikaDir.new('shell/master') as NanikaContainerSyncDirectory);
  const shell = await SL.load(shellDir);
  assert.ok(shell.getBindGroups(0) !== null);
  assert.ok(shell.getSurfaceAlias(0, 0) !== null);
});






