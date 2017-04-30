'use strict';
var _PowerAssertRecorder1 = function () {
    function PowerAssertRecorder() {
        this.captured = [];
    }
    PowerAssertRecorder.prototype._capt = function _capt(value, espath) {
        this.captured.push({
            value: value,
            espath: espath
        });
        return value;
    };
    PowerAssertRecorder.prototype._expr = function _expr(value, source) {
        var capturedValues = this.captured;
        this.captured = [];
        return {
            powerAssertContext: {
                value: value,
                events: capturedValues
            },
            source: source
        };
    };
    return PowerAssertRecorder;
}();
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator['throw'](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, '__esModule', { value: true });
const SU = require('../Util/index');
const ST = require('../Model/SurfaceDefinitionTree');
const ST2Y = require('surfaces_txt2yaml');
const SC = require('../Model/Config');
const SCL = require('../Loader/ConfigLoader');
const SL = require('../Loader/ShellLoader');
const narloader_1 = require('narloader');
window['SurfaceTree'] = ST;
window['SurfaceUtil'] = SU;
window['SurfacesTxt2Yaml'] = ST2Y;
const QUnit = require('qunitjs');
const empower = require('empower');
const formatter = require('power-assert-formatter');
const qunitTap = require('qunit-tap');
empower(QUnit.assert, formatter(), { destructive: true });
qunitTap(QUnit, function () {
    console.log.apply(console, arguments);
}, { showSourceOnFailure: false });
function cvt(a) {
    return Object.keys(a).reduce((o, key) => (o[key] = () => Promise.resolve(a[key]), o), {});
}
QUnit.module('SurfaceUtil');
QUnit.test('SurfaceUtil.find', assert => {
    var _rec1 = new _PowerAssertRecorder1();
    var _rec2 = new _PowerAssertRecorder1();
    var _rec3 = new _PowerAssertRecorder1();
    const paths = [
        'surface0.png',
        'surface10.png',
        'elements/element0.png'
    ];
    let results = SU.find(paths, './surface0.png');
    assert.ok(_rec1._expr(_rec1._capt(_rec1._capt(_rec1._capt(results, 'arguments/0/left/object')[0], 'arguments/0/left') === _rec1._capt(_rec1._capt(paths, 'arguments/0/right/object')[0], 'arguments/0/right'), 'arguments/0'), {
        content: 'assert.ok(results[0] === paths[0])',
        filepath: 'lib/Test/index.js',
        line: 39
    }));
    results = SU.find(paths, 'SURFACE10.PNG');
    assert.ok(_rec2._expr(_rec2._capt(_rec2._capt(_rec2._capt(results, 'arguments/0/left/object')[0], 'arguments/0/left') === _rec2._capt(_rec2._capt(paths, 'arguments/0/right/object')[1], 'arguments/0/right'), 'arguments/0'), {
        content: 'assert.ok(results[0] === paths[1])',
        filepath: 'lib/Test/index.js',
        line: 41
    }));
    results = SU.find(paths, 'elements\\element0.png');
    assert.ok(_rec3._expr(_rec3._capt(_rec3._capt(_rec3._capt(results, 'arguments/0/left/object')[0], 'arguments/0/left') === _rec3._capt(_rec3._capt(paths, 'arguments/0/right/object')[2], 'arguments/0/right'), 'arguments/0'), {
        content: 'assert.ok(results[0] === paths[2])',
        filepath: 'lib/Test/index.js',
        line: 43
    }));
});
QUnit.test('SurfaceUtil.choice', assert => {
    var _rec4 = new _PowerAssertRecorder1();
    var _rec5 = new _PowerAssertRecorder1();
    var _rec6 = new _PowerAssertRecorder1();
    let results = (() => {
        let arr = [];
        for (let i = 0; i < 1000; i++) {
            arr.push(SU.choice([
                1,
                2,
                3
            ]));
        }
        return arr;
    })();
    let a = results.reduce((count, val) => val === 1 ? count + 1 : count, 0) / results.length;
    assert.ok(_rec4._expr(_rec4._capt(_rec4._capt(0.2 < _rec4._capt(a, 'arguments/0/left/right'), 'arguments/0/left') && _rec4._capt(_rec4._capt(a, 'arguments/0/right/left') < 0.4, 'arguments/0/right'), 'arguments/0'), {
        content: 'assert.ok(0.2 < a && a < 0.4)',
        filepath: 'lib/Test/index.js',
        line: 50
    }));
    let b = results.reduce((count, val) => val === 2 ? count + 1 : count, 0) / results.length;
    assert.ok(_rec5._expr(_rec5._capt(_rec5._capt(0.2 < _rec5._capt(b, 'arguments/0/left/right'), 'arguments/0/left') && _rec5._capt(_rec5._capt(b, 'arguments/0/right/left') < 0.4, 'arguments/0/right'), 'arguments/0'), {
        content: 'assert.ok(0.2 < b && b < 0.4)',
        filepath: 'lib/Test/index.js',
        line: 52
    }));
    let c = results.reduce((count, val) => val === 3 ? count + 1 : count, 0) / results.length;
    assert.ok(_rec6._expr(_rec6._capt(_rec6._capt(0.2 < _rec6._capt(c, 'arguments/0/left/right'), 'arguments/0/left') && _rec6._capt(_rec6._capt(c, 'arguments/0/right/left') < 0.4, 'arguments/0/right'), 'arguments/0'), {
        content: 'assert.ok(0.2 < c && c < 0.4)',
        filepath: 'lib/Test/index.js',
        line: 54
    }));
});
QUnit.test('SurfaceUtil.scope', assert => {
    var _rec7 = new _PowerAssertRecorder1();
    var _rec8 = new _PowerAssertRecorder1();
    var _rec9 = new _PowerAssertRecorder1();
    assert.ok(_rec7._expr(_rec7._capt('sakura' === _rec7._capt(_rec7._capt(SU, 'arguments/0/right/callee/object').scope(0), 'arguments/0/right'), 'arguments/0'), {
        content: 'assert.ok("sakura" === SU.scope(0))',
        filepath: 'lib/Test/index.js',
        line: 57
    }));
    assert.ok(_rec8._expr(_rec8._capt('kero' === _rec8._capt(_rec8._capt(SU, 'arguments/0/right/callee/object').scope(1), 'arguments/0/right'), 'arguments/0'), {
        content: 'assert.ok("kero" === SU.scope(1))',
        filepath: 'lib/Test/index.js',
        line: 58
    }));
    assert.ok(_rec9._expr(_rec9._capt('char2' === _rec9._capt(_rec9._capt(SU, 'arguments/0/right/callee/object').scope(2), 'arguments/0/right'), 'arguments/0'), {
        content: 'assert.ok("char2" === SU.scope(2))',
        filepath: 'lib/Test/index.js',
        line: 59
    }));
});
QUnit.test('SurfaceUtil.unscope', assert => {
    var _rec10 = new _PowerAssertRecorder1();
    var _rec11 = new _PowerAssertRecorder1();
    var _rec12 = new _PowerAssertRecorder1();
    assert.ok(_rec10._expr(_rec10._capt(0 === _rec10._capt(_rec10._capt(SU, 'arguments/0/right/callee/object').unscope('sakura'), 'arguments/0/right'), 'arguments/0'), {
        content: 'assert.ok(0 === SU.unscope("sakura"))',
        filepath: 'lib/Test/index.js',
        line: 62
    }));
    assert.ok(_rec11._expr(_rec11._capt(1 === _rec11._capt(_rec11._capt(SU, 'arguments/0/right/callee/object').unscope('kero'), 'arguments/0/right'), 'arguments/0'), {
        content: 'assert.ok(1 === SU.unscope("kero"))',
        filepath: 'lib/Test/index.js',
        line: 63
    }));
    assert.ok(_rec12._expr(_rec12._capt(2 === _rec12._capt(_rec12._capt(SU, 'arguments/0/right/callee/object').unscope('char2'), 'arguments/0/right'), 'arguments/0'), {
        content: 'assert.ok(2 === SU.unscope("char2"))',
        filepath: 'lib/Test/index.js',
        line: 64
    }));
});
QUnit.module('ShellConfigLoader');
QUnit.test('ShellConfigLoader.loadFromJSONLike', assert => __awaiter(this, void 0, void 0, function* () {
    var _rec13 = new _PowerAssertRecorder1();
    var _rec14 = new _PowerAssertRecorder1();
    var _rec15 = new _PowerAssertRecorder1();
    var _rec16 = new _PowerAssertRecorder1();
    var _rec17 = new _PowerAssertRecorder1();
    var _rec18 = new _PowerAssertRecorder1();
    var _rec19 = new _PowerAssertRecorder1();
    var _rec20 = new _PowerAssertRecorder1();
    var _rec21 = new _PowerAssertRecorder1();
    var _rec22 = new _PowerAssertRecorder1();
    var _rec23 = new _PowerAssertRecorder1();
    const dir = yield narloader_1.NarLoader.loadFromURL('/nar/mobilemaster.nar');
    const dic = cvt(dir.getDirectory('shell/master').asArrayBuffer());
    const descript = yield SL.loadDescript(dic);
    const config = yield SCL.loadFromJSONLike(descript.descript);
    assert.ok(_rec13._expr(_rec13._capt(_rec13._capt(_rec13._capt(_rec13._capt(descript, 'arguments/0/left/object/object').descript, 'arguments/0/left/object')['charset'], 'arguments/0/left') === 'Shift_JIS', 'arguments/0'), {
        content: 'assert.ok(descript.descript["charset"] === "Shift_JIS")',
        filepath: 'lib/Test/index.js',
        line: 72,
        generator: true
    }));
    assert.ok(_rec14._expr(_rec14._capt(_rec14._capt(_rec14._capt(_rec14._capt(descript, 'arguments/0/left/object/object').descript, 'arguments/0/left/object')['sakura.balloon.offsetx'], 'arguments/0/left') === '21', 'arguments/0'), {
        content: 'assert.ok(descript.descript["sakura.balloon.offsetx"] === "21")',
        filepath: 'lib/Test/index.js',
        line: 73,
        generator: true
    }));
    assert.ok(_rec15._expr(_rec15._capt(_rec15._capt(_rec15._capt(_rec15._capt(descript, 'arguments/0/left/object/object').descript, 'arguments/0/left/object')['seriko.paint_transparent_region_black'], 'arguments/0/left') === '0', 'arguments/0'), {
        content: 'assert.ok(descript.descript["seriko.paint_transparent_region_black"] === "0")',
        filepath: 'lib/Test/index.js',
        line: 74,
        generator: true
    }));
    assert.ok(_rec16._expr(_rec16._capt(_rec16._capt(_rec16._capt(config, 'arguments/0/left/object').seriko, 'arguments/0/left') instanceof _rec16._capt(_rec16._capt(SC, 'arguments/0/right/object').Seriko, 'arguments/0/right'), 'arguments/0'), {
        content: 'assert.ok(config.seriko instanceof SC.Seriko)',
        filepath: 'lib/Test/index.js',
        line: 75,
        generator: true
    }));
    assert.ok(_rec17._expr(_rec17._capt(_rec17._capt(_rec17._capt(_rec17._capt(config, 'arguments/0/left/object/object').seriko, 'arguments/0/left/object').use_self_alpha, 'arguments/0/left') === false, 'arguments/0'), {
        content: 'assert.ok(config.seriko.use_self_alpha === false)',
        filepath: 'lib/Test/index.js',
        line: 76,
        generator: true
    }));
    assert.ok(_rec18._expr(_rec18._capt(_rec18._capt(_rec18._capt(_rec18._capt(config, 'arguments/0/left/object/object').seriko, 'arguments/0/left/object').alignmenttodesktop, 'arguments/0/left') === 'bottom', 'arguments/0'), {
        content: 'assert.ok(config.seriko.alignmenttodesktop === "bottom")',
        filepath: 'lib/Test/index.js',
        line: 77,
        generator: true
    }));
    assert.ok(_rec19._expr(_rec19._capt(_rec19._capt(_rec19._capt(config, 'arguments/0/left/object').menu, 'arguments/0/left') instanceof _rec19._capt(_rec19._capt(SC, 'arguments/0/right/object').Menu, 'arguments/0/right'), 'arguments/0'), {
        content: 'assert.ok(config.menu instanceof SC.Menu)',
        filepath: 'lib/Test/index.js',
        line: 78,
        generator: true
    }));
    assert.ok(_rec20._expr(_rec20._capt(_rec20._capt(_rec20._capt(config, 'arguments/0/left/object').char, 'arguments/0/left') instanceof _rec20._capt(Array, 'arguments/0/right'), 'arguments/0'), {
        content: 'assert.ok(config.char instanceof Array)',
        filepath: 'lib/Test/index.js',
        line: 79,
        generator: true
    }));
    assert.ok(_rec21._expr(_rec21._capt(_rec21._capt(_rec21._capt(config, 'arguments/0/left/object').bindgroup, 'arguments/0/left') instanceof _rec21._capt(Array, 'arguments/0/right'), 'arguments/0'), {
        content: 'assert.ok(config.bindgroup instanceof Array)',
        filepath: 'lib/Test/index.js',
        line: 80,
        generator: true
    }));
    assert.ok(_rec22._expr(_rec22._capt(_rec22._capt(typeof _rec22._capt(_rec22._capt(config, 'arguments/0/left/argument/object').enableRegion, 'arguments/0/left/argument'), 'arguments/0/left') === 'boolean', 'arguments/0'), {
        content: 'assert.ok(typeof config.enableRegion === "boolean")',
        filepath: 'lib/Test/index.js',
        line: 81,
        generator: true
    }));
    assert.ok(_rec23._expr(_rec23._capt(_rec23._capt(typeof _rec23._capt(_rec23._capt(config, 'arguments/0/left/argument/object').position, 'arguments/0/left/argument'), 'arguments/0/left') === 'string', 'arguments/0'), {
        content: 'assert.ok(typeof config.position === "string")',
        filepath: 'lib/Test/index.js',
        line: 82,
        generator: true
    }));
}));
QUnit.module('SurfaceTreeLoader');
QUnit.test('SurfaceTreeLoader.loadSurfacesTxt', assert => __awaiter(this, void 0, void 0, function* () {
    var _rec24 = new _PowerAssertRecorder1();
    var _rec25 = new _PowerAssertRecorder1();
    var _rec29 = new _PowerAssertRecorder1();
    var _rec30 = new _PowerAssertRecorder1();
    const nanikaDir = yield narloader_1.NarLoader.loadFromURL('../nar/mobilemaster.nar');
    const shellDir = cvt(nanikaDir.getDirectory('shell/master').asArrayBuffer());
    const surfaceTree = yield SL.loadSurfacesTxt(shellDir);
    const {aliases, surfaces, descript} = surfaceTree.surfaceDefTree;
    assert.ok(_rec24._expr(_rec24._capt(_rec24._capt(Array, 'arguments/0/callee/object').isArray(_rec24._capt(aliases, 'arguments/0/arguments/0')), 'arguments/0'), {
        content: 'assert.ok(Array.isArray(aliases))',
        filepath: 'lib/Test/index.js',
        line: 90,
        generator: true
    }));
    assert.ok(_rec25._expr(_rec25._capt(_rec25._capt(Array, 'arguments/0/callee/object').isArray(_rec25._capt(surfaces, 'arguments/0/arguments/0')), 'arguments/0'), {
        content: 'assert.ok(Array.isArray(surfaces))',
        filepath: 'lib/Test/index.js',
        line: 91,
        generator: true
    }));
    surfaces.forEach(srf => {
        var _rec26 = new _PowerAssertRecorder1();
        var _rec27 = new _PowerAssertRecorder1();
        var _rec28 = new _PowerAssertRecorder1();
        const {elements, collisions, animations, balloons, points} = srf;
        assert.ok(_rec26._expr(_rec26._capt(_rec26._capt(_rec26._capt(Array, 'arguments/0/left/callee/object').isArray(_rec26._capt(elements, 'arguments/0/left/arguments/0')), 'arguments/0/left') && _rec26._capt(_rec26._capt(elements, 'arguments/0/right/callee/object').every(elm => elm instanceof ST.SurfaceElement), 'arguments/0/right'), 'arguments/0'), {
            content: 'assert.ok(Array.isArray(elements) && elements.every(elm => elm instanceof ST.SurfaceElement))',
            filepath: 'lib/Test/index.js',
            line: 94
        }));
        assert.ok(_rec27._expr(_rec27._capt(_rec27._capt(_rec27._capt(Array, 'arguments/0/left/callee/object').isArray(_rec27._capt(collisions, 'arguments/0/left/arguments/0')), 'arguments/0/left') && _rec27._capt(_rec27._capt(collisions, 'arguments/0/right/callee/object').every(col => col instanceof ST.SurfaceCollision), 'arguments/0/right'), 'arguments/0'), {
            content: 'assert.ok(Array.isArray(collisions) && collisions.every(col => col instanceof ST.SurfaceCollision))',
            filepath: 'lib/Test/index.js',
            line: 95
        }));
        assert.ok(_rec28._expr(_rec28._capt(_rec28._capt(_rec28._capt(Array, 'arguments/0/left/callee/object').isArray(_rec28._capt(animations, 'arguments/0/left/arguments/0')), 'arguments/0/left') && _rec28._capt(_rec28._capt(animations, 'arguments/0/right/callee/object').every(anm => anm instanceof ST.SurfaceAnimation), 'arguments/0/right'), 'arguments/0'), {
            content: 'assert.ok(Array.isArray(animations) && animations.every(anm => anm instanceof ST.SurfaceAnimation))',
            filepath: 'lib/Test/index.js',
            line: 96
        }));
    });
    assert.ok(_rec29._expr(_rec29._capt(_rec29._capt(_rec29._capt(descript, 'arguments/0/left/object').collisionSort, 'arguments/0/left') === 'ascend', 'arguments/0'), {
        content: 'assert.ok(descript.collisionSort === "ascend")',
        filepath: 'lib/Test/index.js',
        line: 98,
        generator: true
    }));
    assert.ok(_rec30._expr(_rec30._capt(_rec30._capt(_rec30._capt(descript, 'arguments/0/left/object').animationSort, 'arguments/0/left') === 'ascend', 'arguments/0'), {
        content: 'assert.ok(descript.animationSort === "ascend")',
        filepath: 'lib/Test/index.js',
        line: 99,
        generator: true
    }));
}));
QUnit.module('ShellLoader');
QUnit.test('load', assert => __awaiter(this, void 0, void 0, function* () {
    var _rec31 = new _PowerAssertRecorder1();
    var _rec32 = new _PowerAssertRecorder1();
    const nanikaDir = yield narloader_1.NarLoader.loadFromURL('../nar/mobilemaster.nar');
    const shellDir = cvt(nanikaDir.getDirectory('shell/master').asArrayBuffer());
    const shell = yield SL.load(shellDir);
    assert.ok(_rec31._expr(_rec31._capt(_rec31._capt(_rec31._capt(shell, 'arguments/0/left/callee/object').getBindGroups(0), 'arguments/0/left') !== null, 'arguments/0'), {
        content: 'assert.ok(shell.getBindGroups(0) !== null)',
        filepath: 'lib/Test/index.js',
        line: 106,
        generator: true
    }));
    assert.ok(_rec32._expr(_rec32._capt(_rec32._capt(_rec32._capt(shell, 'arguments/0/left/callee/object').getSurfaceAlias(0, 0), 'arguments/0/left') !== null, 'arguments/0'), {
        content: 'assert.ok(shell.getSurfaceAlias(0, 0) !== null)',
        filepath: 'lib/Test/index.js',
        line: 107,
        generator: true
    }));
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9UZXN0L2luZGV4LmpzIl0sIm5hbWVzIjpbIl9Qb3dlckFzc2VydFJlY29yZGVyMSIsIlBvd2VyQXNzZXJ0UmVjb3JkZXIiLCJjYXB0dXJlZCIsInByb3RvdHlwZSIsIl9jYXB0IiwidmFsdWUiLCJlc3BhdGgiLCJwdXNoIiwiX2V4cHIiLCJzb3VyY2UiLCJjYXB0dXJlZFZhbHVlcyIsInBvd2VyQXNzZXJ0Q29udGV4dCIsImV2ZW50cyIsIl9fYXdhaXRlciIsInRoaXNBcmciLCJfYXJndW1lbnRzIiwiUCIsImdlbmVyYXRvciIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZnVsZmlsbGVkIiwic3RlcCIsIm5leHQiLCJlIiwicmVqZWN0ZWQiLCJyZXN1bHQiLCJkb25lIiwidGhlbiIsImFwcGx5IiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwiU1UiLCJyZXF1aXJlIiwiU1QiLCJTVDJZIiwiU0MiLCJTQ0wiLCJTTCIsIm5hcmxvYWRlcl8xIiwid2luZG93IiwiUVVuaXQiLCJlbXBvd2VyIiwiZm9ybWF0dGVyIiwicXVuaXRUYXAiLCJhc3NlcnQiLCJkZXN0cnVjdGl2ZSIsImNvbnNvbGUiLCJsb2ciLCJhcmd1bWVudHMiLCJzaG93U291cmNlT25GYWlsdXJlIiwiY3Z0IiwiYSIsImtleXMiLCJyZWR1Y2UiLCJvIiwia2V5IiwibW9kdWxlIiwidGVzdCIsIl9yZWMxIiwiX3JlYzIiLCJfcmVjMyIsInBhdGhzIiwicmVzdWx0cyIsImZpbmQiLCJvayIsImNvbnRlbnQiLCJmaWxlcGF0aCIsImxpbmUiLCJfcmVjNCIsIl9yZWM1IiwiX3JlYzYiLCJhcnIiLCJpIiwiY2hvaWNlIiwiY291bnQiLCJ2YWwiLCJsZW5ndGgiLCJiIiwiYyIsIl9yZWM3IiwiX3JlYzgiLCJfcmVjOSIsInNjb3BlIiwiX3JlYzEwIiwiX3JlYzExIiwiX3JlYzEyIiwidW5zY29wZSIsIl9yZWMxMyIsIl9yZWMxNCIsIl9yZWMxNSIsIl9yZWMxNiIsIl9yZWMxNyIsIl9yZWMxOCIsIl9yZWMxOSIsIl9yZWMyMCIsIl9yZWMyMSIsIl9yZWMyMiIsIl9yZWMyMyIsImRpciIsIk5hckxvYWRlciIsImxvYWRGcm9tVVJMIiwiZGljIiwiZ2V0RGlyZWN0b3J5IiwiYXNBcnJheUJ1ZmZlciIsImRlc2NyaXB0IiwibG9hZERlc2NyaXB0IiwiY29uZmlnIiwibG9hZEZyb21KU09OTGlrZSIsInNlcmlrbyIsIlNlcmlrbyIsInVzZV9zZWxmX2FscGhhIiwiYWxpZ25tZW50dG9kZXNrdG9wIiwibWVudSIsIk1lbnUiLCJjaGFyIiwiQXJyYXkiLCJiaW5kZ3JvdXAiLCJlbmFibGVSZWdpb24iLCJwb3NpdGlvbiIsIl9yZWMyNCIsIl9yZWMyNSIsIl9yZWMyOSIsIl9yZWMzMCIsIm5hbmlrYURpciIsInNoZWxsRGlyIiwic3VyZmFjZVRyZWUiLCJsb2FkU3VyZmFjZXNUeHQiLCJhbGlhc2VzIiwic3VyZmFjZXMiLCJzdXJmYWNlRGVmVHJlZSIsImlzQXJyYXkiLCJmb3JFYWNoIiwic3JmIiwiX3JlYzI2IiwiX3JlYzI3IiwiX3JlYzI4IiwiZWxlbWVudHMiLCJjb2xsaXNpb25zIiwiYW5pbWF0aW9ucyIsImJhbGxvb25zIiwicG9pbnRzIiwiZXZlcnkiLCJlbG0iLCJTdXJmYWNlRWxlbWVudCIsImNvbCIsIlN1cmZhY2VDb2xsaXNpb24iLCJhbm0iLCJTdXJmYWNlQW5pbWF0aW9uIiwiY29sbGlzaW9uU29ydCIsImFuaW1hdGlvblNvcnQiLCJfcmVjMzEiLCJfcmVjMzIiLCJzaGVsbCIsImxvYWQiLCJnZXRCaW5kR3JvdXBzIiwiZ2V0U3VyZmFjZUFsaWFzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLElBQUFBLHFCQUFBO0FBQUEsYUFBQUMsbUJBQUE7QUFBQSxhQUFBQyxRQUFBO0FBQUE7QUFBQSxJQUFBRCxtQkFBQSxDQUFBRSxTQUFBLENBQUFDLEtBQUEsWUFBQUEsS0FBQSxDQUFBQyxLQUFBLEVBQUFDLE1BQUE7QUFBQSxhQUFBSixRQUFBLENBQUFLLElBQUE7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QUFBLENBQVk2RCxTQUFaLENBQXNCQyxXQUF0QixDQUFrQyx5QkFBbEMsQ0FBeEIsQ0FEd0U7QUFBQSxJQUV4RSxNQUFNd0IsUUFBQSxHQUFXMUUsR0FBQSxDQUFJeUUsU0FBQSxDQUFVckIsWUFBVixDQUF1QixjQUF2QixFQUF1Q0MsYUFBdkMsRUFBSixDQUFqQixDQUZ3RTtBQUFBLElBR3hFLE1BQU1pRCxLQUFBLEdBQVEsTUFBTW5ILEVBQUEsQ0FBR29ILElBQUgsQ0FBUTdCLFFBQVIsQ0FBcEIsQ0FId0U7QUFBQSxJQUl4RWhGLE1BQUEsQ0FBT29CLEVBQVAsQ0FBVXNGLE1BQUEsQ0FBQWhKLEtBQUEsQ0FBQWdKLE1BQUEsQ0FBQXBKLEtBQUEsQ0FBQW9KLE1BQUEsQ0FBQXBKLEtBQUEsQ0FBQW9KLE1BQUEsQ0FBQXBKLEtBQUEsQ0FBQXNKLEtBQUEsb0NBQU1FLGFBQU4sQ0FBb0IsQ0FBcEIsMkJBQTJCLElBQTNCO0FBQUEsUUFBQXpGLE9BQUE7QUFBQSxRQUFBQyxRQUFBO0FBQUEsUUFBQUMsSUFBQTtBQUFBLFFBQUFwRCxTQUFBO0FBQUEsTUFBVixFQUp3RTtBQUFBLElBS3hFNkIsTUFBQSxDQUFPb0IsRUFBUCxDQUFVdUYsTUFBQSxDQUFBakosS0FBQSxDQUFBaUosTUFBQSxDQUFBckosS0FBQSxDQUFBcUosTUFBQSxDQUFBckosS0FBQSxDQUFBcUosTUFBQSxDQUFBckosS0FBQSxDQUFBc0osS0FBQSxvQ0FBTUcsZUFBTixDQUFzQixDQUF0QixFQUF5QixDQUF6QiwyQkFBZ0MsSUFBaEM7QUFBQSxRQUFBMUYsT0FBQTtBQUFBLFFBQUFDLFFBQUE7QUFBQSxRQUFBQyxJQUFBO0FBQUEsUUFBQXBELFNBQUE7QUFBQSxNQUFWLEVBTHdFO0FBQUEsQ0FBN0MsQ0FBL0IiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgU1UgPSByZXF1aXJlKFwiLi4vVXRpbC9pbmRleFwiKTtcbmNvbnN0IFNUID0gcmVxdWlyZShcIi4uL01vZGVsL1N1cmZhY2VEZWZpbml0aW9uVHJlZVwiKTtcbmNvbnN0IFNUMlkgPSByZXF1aXJlKFwic3VyZmFjZXNfdHh0MnlhbWxcIik7XG5jb25zdCBTQyA9IHJlcXVpcmUoXCIuLi9Nb2RlbC9Db25maWdcIik7XG5jb25zdCBTQ0wgPSByZXF1aXJlKFwiLi4vTG9hZGVyL0NvbmZpZ0xvYWRlclwiKTtcbmNvbnN0IFNMID0gcmVxdWlyZShcIi4uL0xvYWRlci9TaGVsbExvYWRlclwiKTtcbmNvbnN0IG5hcmxvYWRlcl8xID0gcmVxdWlyZShcIm5hcmxvYWRlclwiKTtcbndpbmRvd1tcIlN1cmZhY2VUcmVlXCJdID0gU1Q7XG53aW5kb3dbXCJTdXJmYWNlVXRpbFwiXSA9IFNVO1xud2luZG93W1wiU3VyZmFjZXNUeHQyWWFtbFwiXSA9IFNUMlk7XG5jb25zdCBRVW5pdCA9IHJlcXVpcmUoXCJxdW5pdGpzXCIpO1xuY29uc3QgZW1wb3dlciA9IHJlcXVpcmUoJ2VtcG93ZXInKTtcbmNvbnN0IGZvcm1hdHRlciA9IHJlcXVpcmUoJ3Bvd2VyLWFzc2VydC1mb3JtYXR0ZXInKTtcbmNvbnN0IHF1bml0VGFwID0gcmVxdWlyZShcInF1bml0LXRhcFwiKTtcbi8vUVVuaXQuY29uZmlnLmF1dG9zdGFydCA9IGZhbHNlO1xuZW1wb3dlcihRVW5pdC5hc3NlcnQsIGZvcm1hdHRlcigpLCB7IGRlc3RydWN0aXZlOiB0cnVlIH0pO1xucXVuaXRUYXAoUVVuaXQsIGZ1bmN0aW9uICgpIHsgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTsgfSwgeyBzaG93U291cmNlT25GYWlsdXJlOiBmYWxzZSB9KTtcbmZ1bmN0aW9uIGN2dChhKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGEpLnJlZHVjZSgobywga2V5KSA9PiAob1trZXldID0gKCkgPT4gUHJvbWlzZS5yZXNvbHZlKGFba2V5XSksIG8pLCB7fSk7XG59XG5RVW5pdC5tb2R1bGUoJ1N1cmZhY2VVdGlsJyk7XG5RVW5pdC50ZXN0KFwiU3VyZmFjZVV0aWwuZmluZFwiLCAoYXNzZXJ0KSA9PiB7XG4gICAgY29uc3QgcGF0aHMgPSBbXG4gICAgICAgIFwic3VyZmFjZTAucG5nXCIsXG4gICAgICAgIFwic3VyZmFjZTEwLnBuZ1wiLFxuICAgICAgICBcImVsZW1lbnRzL2VsZW1lbnQwLnBuZ1wiXG4gICAgXTtcbiAgICBsZXQgcmVzdWx0cyA9IFNVLmZpbmQocGF0aHMsIFwiLi9zdXJmYWNlMC5wbmdcIik7XG4gICAgYXNzZXJ0Lm9rKHJlc3VsdHNbMF0gPT09IHBhdGhzWzBdKTtcbiAgICByZXN1bHRzID0gU1UuZmluZChwYXRocywgXCJTVVJGQUNFMTAuUE5HXCIpO1xuICAgIGFzc2VydC5vayhyZXN1bHRzWzBdID09PSBwYXRoc1sxXSk7XG4gICAgcmVzdWx0cyA9IFNVLmZpbmQocGF0aHMsIFwiZWxlbWVudHNcXFxcZWxlbWVudDAucG5nXCIpO1xuICAgIGFzc2VydC5vayhyZXN1bHRzWzBdID09PSBwYXRoc1syXSk7XG59KTtcblFVbml0LnRlc3QoXCJTdXJmYWNlVXRpbC5jaG9pY2VcIiwgKGFzc2VydCkgPT4ge1xuICAgIGxldCByZXN1bHRzID0gKCgpID0+IHsgbGV0IGFyciA9IFtdOyBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDA7IGkrKykge1xuICAgICAgICBhcnIucHVzaChTVS5jaG9pY2UoWzEsIDIsIDNdKSk7XG4gICAgfSByZXR1cm4gYXJyOyB9KSgpO1xuICAgIGxldCBhID0gcmVzdWx0cy5yZWR1Y2UoKChjb3VudCwgdmFsKSA9PiB2YWwgPT09IDEgPyBjb3VudCArIDEgOiBjb3VudCksIDApIC8gcmVzdWx0cy5sZW5ndGg7XG4gICAgYXNzZXJ0Lm9rKDAuMiA8IGEgJiYgYSA8IDAuNCk7XG4gICAgbGV0IGIgPSByZXN1bHRzLnJlZHVjZSgoKGNvdW50LCB2YWwpID0+IHZhbCA9PT0gMiA/IGNvdW50ICsgMSA6IGNvdW50KSwgMCkgLyByZXN1bHRzLmxlbmd0aDtcbiAgICBhc3NlcnQub2soMC4yIDwgYiAmJiBiIDwgMC40KTtcbiAgICBsZXQgYyA9IHJlc3VsdHMucmVkdWNlKCgoY291bnQsIHZhbCkgPT4gdmFsID09PSAzID8gY291bnQgKyAxIDogY291bnQpLCAwKSAvIHJlc3VsdHMubGVuZ3RoO1xuICAgIGFzc2VydC5vaygwLjIgPCBjICYmIGMgPCAwLjQpO1xufSk7XG5RVW5pdC50ZXN0KFwiU3VyZmFjZVV0aWwuc2NvcGVcIiwgKGFzc2VydCkgPT4ge1xuICAgIGFzc2VydC5vayhcInNha3VyYVwiID09PSBTVS5zY29wZSgwKSk7XG4gICAgYXNzZXJ0Lm9rKFwia2Vyb1wiID09PSBTVS5zY29wZSgxKSk7XG4gICAgYXNzZXJ0Lm9rKFwiY2hhcjJcIiA9PT0gU1Uuc2NvcGUoMikpO1xufSk7XG5RVW5pdC50ZXN0KFwiU3VyZmFjZVV0aWwudW5zY29wZVwiLCAoYXNzZXJ0KSA9PiB7XG4gICAgYXNzZXJ0Lm9rKDAgPT09IFNVLnVuc2NvcGUoXCJzYWt1cmFcIikpO1xuICAgIGFzc2VydC5vaygxID09PSBTVS51bnNjb3BlKFwia2Vyb1wiKSk7XG4gICAgYXNzZXJ0Lm9rKDIgPT09IFNVLnVuc2NvcGUoXCJjaGFyMlwiKSk7XG59KTtcblFVbml0Lm1vZHVsZSgnU2hlbGxDb25maWdMb2FkZXInKTtcblFVbml0LnRlc3QoJ1NoZWxsQ29uZmlnTG9hZGVyLmxvYWRGcm9tSlNPTkxpa2UnLCAoYXNzZXJ0KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgY29uc3QgZGlyID0geWllbGQgbmFybG9hZGVyXzEuTmFyTG9hZGVyLmxvYWRGcm9tVVJMKFwiL25hci9tb2JpbGVtYXN0ZXIubmFyXCIpO1xuICAgIGNvbnN0IGRpYyA9IGN2dChkaXIuZ2V0RGlyZWN0b3J5KFwic2hlbGwvbWFzdGVyXCIpLmFzQXJyYXlCdWZmZXIoKSk7XG4gICAgY29uc3QgZGVzY3JpcHQgPSB5aWVsZCBTTC5sb2FkRGVzY3JpcHQoZGljKTtcbiAgICBjb25zdCBjb25maWcgPSB5aWVsZCBTQ0wubG9hZEZyb21KU09OTGlrZShkZXNjcmlwdC5kZXNjcmlwdCk7XG4gICAgYXNzZXJ0Lm9rKGRlc2NyaXB0LmRlc2NyaXB0W1wiY2hhcnNldFwiXSA9PT0gXCJTaGlmdF9KSVNcIik7XG4gICAgYXNzZXJ0Lm9rKGRlc2NyaXB0LmRlc2NyaXB0W1wic2FrdXJhLmJhbGxvb24ub2Zmc2V0eFwiXSA9PT0gXCIyMVwiKTtcbiAgICBhc3NlcnQub2soZGVzY3JpcHQuZGVzY3JpcHRbXCJzZXJpa28ucGFpbnRfdHJhbnNwYXJlbnRfcmVnaW9uX2JsYWNrXCJdID09PSBcIjBcIik7XG4gICAgYXNzZXJ0Lm9rKGNvbmZpZy5zZXJpa28gaW5zdGFuY2VvZiBTQy5TZXJpa28pO1xuICAgIGFzc2VydC5vayhjb25maWcuc2VyaWtvLnVzZV9zZWxmX2FscGhhID09PSBmYWxzZSk7XG4gICAgYXNzZXJ0Lm9rKGNvbmZpZy5zZXJpa28uYWxpZ25tZW50dG9kZXNrdG9wID09PSBcImJvdHRvbVwiKTtcbiAgICBhc3NlcnQub2soY29uZmlnLm1lbnUgaW5zdGFuY2VvZiBTQy5NZW51KTtcbiAgICBhc3NlcnQub2soY29uZmlnLmNoYXIgaW5zdGFuY2VvZiBBcnJheSk7XG4gICAgYXNzZXJ0Lm9rKGNvbmZpZy5iaW5kZ3JvdXAgaW5zdGFuY2VvZiBBcnJheSk7XG4gICAgYXNzZXJ0Lm9rKHR5cGVvZiBjb25maWcuZW5hYmxlUmVnaW9uID09PSBcImJvb2xlYW5cIik7XG4gICAgYXNzZXJ0Lm9rKHR5cGVvZiBjb25maWcucG9zaXRpb24gPT09IFwic3RyaW5nXCIpO1xufSkpO1xuUVVuaXQubW9kdWxlKCdTdXJmYWNlVHJlZUxvYWRlcicpO1xuUVVuaXQudGVzdCgnU3VyZmFjZVRyZWVMb2FkZXIubG9hZFN1cmZhY2VzVHh0JywgKGFzc2VydCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIGNvbnN0IG5hbmlrYURpciA9IHlpZWxkIG5hcmxvYWRlcl8xLk5hckxvYWRlci5sb2FkRnJvbVVSTCgnLi4vbmFyL21vYmlsZW1hc3Rlci5uYXInKTtcbiAgICBjb25zdCBzaGVsbERpciA9IGN2dChuYW5pa2FEaXIuZ2V0RGlyZWN0b3J5KCdzaGVsbC9tYXN0ZXInKS5hc0FycmF5QnVmZmVyKCkpO1xuICAgIGNvbnN0IHN1cmZhY2VUcmVlID0geWllbGQgU0wubG9hZFN1cmZhY2VzVHh0KHNoZWxsRGlyKTtcbiAgICBjb25zdCB7IGFsaWFzZXMsIHN1cmZhY2VzLCBkZXNjcmlwdCB9ID0gc3VyZmFjZVRyZWUuc3VyZmFjZURlZlRyZWU7XG4gICAgYXNzZXJ0Lm9rKEFycmF5LmlzQXJyYXkoYWxpYXNlcykpO1xuICAgIGFzc2VydC5vayhBcnJheS5pc0FycmF5KHN1cmZhY2VzKSk7XG4gICAgc3VyZmFjZXMuZm9yRWFjaCgoc3JmKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgZWxlbWVudHMsIGNvbGxpc2lvbnMsIGFuaW1hdGlvbnMsIGJhbGxvb25zLCBwb2ludHMgfSA9IHNyZjtcbiAgICAgICAgYXNzZXJ0Lm9rKEFycmF5LmlzQXJyYXkoZWxlbWVudHMpICYmIGVsZW1lbnRzLmV2ZXJ5KChlbG0pID0+IGVsbSBpbnN0YW5jZW9mIFNULlN1cmZhY2VFbGVtZW50KSk7XG4gICAgICAgIGFzc2VydC5vayhBcnJheS5pc0FycmF5KGNvbGxpc2lvbnMpICYmIGNvbGxpc2lvbnMuZXZlcnkoKGNvbCkgPT4gY29sIGluc3RhbmNlb2YgU1QuU3VyZmFjZUNvbGxpc2lvbikpO1xuICAgICAgICBhc3NlcnQub2soQXJyYXkuaXNBcnJheShhbmltYXRpb25zKSAmJiBhbmltYXRpb25zLmV2ZXJ5KChhbm0pID0+IGFubSBpbnN0YW5jZW9mIFNULlN1cmZhY2VBbmltYXRpb24pKTtcbiAgICB9KTtcbiAgICBhc3NlcnQub2soZGVzY3JpcHQuY29sbGlzaW9uU29ydCA9PT0gXCJhc2NlbmRcIik7XG4gICAgYXNzZXJ0Lm9rKGRlc2NyaXB0LmFuaW1hdGlvblNvcnQgPT09IFwiYXNjZW5kXCIpO1xufSkpO1xuUVVuaXQubW9kdWxlKCdTaGVsbExvYWRlcicpO1xuUVVuaXQudGVzdCgnbG9hZCcsIChhc3NlcnQpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICBjb25zdCBuYW5pa2FEaXIgPSB5aWVsZCBuYXJsb2FkZXJfMS5OYXJMb2FkZXIubG9hZEZyb21VUkwoJy4uL25hci9tb2JpbGVtYXN0ZXIubmFyJyk7XG4gICAgY29uc3Qgc2hlbGxEaXIgPSBjdnQobmFuaWthRGlyLmdldERpcmVjdG9yeSgnc2hlbGwvbWFzdGVyJykuYXNBcnJheUJ1ZmZlcigpKTtcbiAgICBjb25zdCBzaGVsbCA9IHlpZWxkIFNMLmxvYWQoc2hlbGxEaXIpO1xuICAgIGFzc2VydC5vayhzaGVsbC5nZXRCaW5kR3JvdXBzKDApICE9PSBudWxsKTtcbiAgICBhc3NlcnQub2soc2hlbGwuZ2V0U3VyZmFjZUFsaWFzKDAsIDApICE9PSBudWxsKTtcbn0pKTtcbiJdfQ==

