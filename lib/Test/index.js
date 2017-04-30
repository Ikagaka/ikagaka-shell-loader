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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9UZXN0L2luZGV4LmpzIl0sIm5hbWVzIjpbIl9Qb3dlckFzc2VydFJlY29yZGVyMSIsIlBvd2VyQXNzZXJ0UmVjb3JkZXIiLCJjYXB0dXJlZCIsInByb3RvdHlwZSIsIl9jYXB0IiwidmFsdWUiLCJlc3BhdGgiLCJwdXNoIiwiX2V4cHIiLCJzb3VyY2UiLCJjYXB0dXJlZFZhbHVlcyIsInBvd2VyQXNzZXJ0Q29udGV4dCIsImV2ZW50cyIsIl9fYXdhaXRlciIsInRoaXNBcmciLCJfYXJndW1lbnRzIiwiUCIsImdlbmVyYXRvciIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZnVsZmlsbGVkIiwic3RlcCIsIm5leHQiLCJlIiwicmVqZWN0ZWQiLCJyZXN1bHQiLCJkb25lIiwidGhlbiIsImFwcGx5IiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwiU1UiLCJyZXF1aXJlIiwiU1QiLCJTVDJZIiwiU0MiLCJTQ0wiLCJTTCIsIm5hcmxvYWRlcl8xIiwid2luZG93IiwiUVVuaXQiLCJlbXBvd2VyIiwiZm9ybWF0dGVyIiwicXVuaXRUYXAiLCJhc3NlcnQiLCJkZXN0cnVjdGl2ZSIsImNvbnNvbGUiLCJsb2ciLCJhcmd1bWVudHMiLCJzaG93U291cmNlT25GYWlsdXJlIiwiY3Z0IiwiYSIsImtleXMiLCJyZWR1Y2UiLCJvIiwia2V5IiwibW9kdWxlIiwidGVzdCIsIl9yZWMxIiwiX3JlYzIiLCJfcmVjMyIsInBhdGhzIiwicmVzdWx0cyIsImZpbmQiLCJvayIsImNvbnRlbnQiLCJmaWxlcGF0aCIsImxpbmUiLCJfcmVjNCIsIl9yZWM1IiwiX3JlYzYiLCJhcnIiLCJpIiwiY2hvaWNlIiwiY291bnQiLCJ2YWwiLCJsZW5ndGgiLCJiIiwiYyIsIl9yZWM3IiwiX3JlYzgiLCJfcmVjOSIsInNjb3BlIiwiX3JlYzEwIiwiX3JlYzExIiwiX3JlYzEyIiwidW5zY29wZSIsIl9yZWMxMyIsIl9yZWMxNCIsIl9yZWMxNSIsIl9yZWMxNiIsIl9yZWMxNyIsIl9yZWMxOCIsIl9yZWMxOSIsIl9yZWMyMCIsIl9yZWMyMSIsIl9yZWMyMiIsIl9yZWMyMyIsImRpciIsIk5hckxvYWRlciIsImxvYWRGcm9tVVJMIiwiZGljIiwiZ2V0RGlyZWN0b3J5IiwiYXNBcnJheUJ1ZmZlciIsImRlc2NyaXB0IiwibG9hZERlc2NyaXB0IiwiY29uZmlnIiwibG9hZEZyb21KU09OTGlrZSIsInNlcmlrbyIsIlNlcmlrbyIsInVzZV9zZWxmX2FscGhhIiwiYWxpZ25tZW50dG9kZXNrdG9wIiwibWVudSIsIk1lbnUiLCJjaGFyIiwiQXJyYXkiLCJiaW5kZ3JvdXAiLCJlbmFibGVSZWdpb24iLCJwb3NpdGlvbiIsIl9yZWMyNCIsIl9yZWMyNSIsIl9yZWMyOSIsIl9yZWMzMCIsIm5hbmlrYURpciIsInNoZWxsRGlyIiwic3VyZmFjZVRyZWUiLCJsb2FkU3VyZmFjZXNUeHQiLCJhbGlhc2VzIiwic3VyZmFjZXMiLCJzdXJmYWNlRGVmVHJlZSIsImlzQXJyYXkiLCJmb3JFYWNoIiwic3JmIiwiX3JlYzI2IiwiX3JlYzI3IiwiX3JlYzI4IiwiZWxlbWVudHMiLCJjb2xsaXNpb25zIiwiYW5pbWF0aW9ucyIsImJhbGxvb25zIiwicG9pbnRzIiwiZXZlcnkiLCJlbG0iLCJTdXJmYWNlRWxlbWVudCIsImNvbCIsIlN1cmZhY2VDb2xsaXNpb24iLCJhbm0iLCJTdXJmYWNlQW5pbWF0aW9uIiwiY29sbGlzaW9uU29ydCIsImFuaW1hdGlvblNvcnQiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsSUFBQUEscUJBQUE7QUFBQSxhQUFBQyxtQkFBQTtBQUFBLGFBQUFDLFFBQUE7QUFBQTtBQUFBLElBQUFELG1CQUFBLENBQUFFLFNBQUEsQ0FBQUMsS0FBQSxZQUFBQSxLQUFBLENBQUFDLEtBQUEsRUFBQUMsTUFBQTtBQUFBLGFBQUFKLFFBQUEsQ0FBQUssSUFBQTtBQUFBLFlBQUFGLEtBQUEsRUFBQUEsS0FBQTtBQUFBLFlBQUFDLE1BQUEsRUFBQUEsTUFBQTtBQUFBO0FBQUEsZUFB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QUFBQyxJQUFBO0FBQUEsVUFBVixFQUpzQjtBQUFBLEtBQTFCLEVBUHFHO0FBQUEsSUFhckd2QixNQUFBLENBQU9vQixFQUFQLENBQVV5RCxNQUFBLENBQUFuSCxLQUFBLENBQUFtSCxNQUFBLENBQUF2SCxLQUFBLENBQUF1SCxNQUFBLENBQUF2SCxLQUFBLENBQUF1SCxNQUFBLENBQUF2SCxLQUFBLENBQUFzRyxRQUFBLDZCQUFTNEMsYUFBVCwwQkFBMkIsUUFBM0I7QUFBQSxRQUFBbkYsT0FBQTtBQUFBLFFBQUFDLFFBQUE7QUFBQSxRQUFBQyxJQUFBO0FBQUEsUUFBQXBELFNBQUE7QUFBQSxNQUFWLEVBYnFHO0FBQUEsSUFjckc2QixNQUFBLENBQU9vQixFQUFQLENBQVUwRCxNQUFBLENBQUFwSCxLQUFBLENBQUFvSCxNQUFBLENBQUF4SCxLQUFBLENBQUF3SCxNQUFBLENBQUF4SCxLQUFBLENBQUF3SCxNQUFBLENBQUF4SCxLQUFBLENBQUFzRyxRQUFBLDZCQUFTNkMsYUFBVCwwQkFBMkIsUUFBM0I7QUFBQSxRQUFBcEYsT0FBQTtBQUFBLFFBQUFDLFFBQUE7QUFBQSxRQUFBQyxJQUFBO0FBQUEsUUFBQXBELFNBQUE7QUFBQSxNQUFWLEVBZHFHO0FBQUEsQ0FBN0MsQ0FBNUQiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgU1UgPSByZXF1aXJlKFwiLi4vVXRpbC9pbmRleFwiKTtcbmNvbnN0IFNUID0gcmVxdWlyZShcIi4uL01vZGVsL1N1cmZhY2VEZWZpbml0aW9uVHJlZVwiKTtcbmNvbnN0IFNUMlkgPSByZXF1aXJlKFwic3VyZmFjZXNfdHh0MnlhbWxcIik7XG5jb25zdCBTQyA9IHJlcXVpcmUoXCIuLi9Nb2RlbC9Db25maWdcIik7XG5jb25zdCBTQ0wgPSByZXF1aXJlKFwiLi4vTG9hZGVyL0NvbmZpZ0xvYWRlclwiKTtcbmNvbnN0IFNMID0gcmVxdWlyZShcIi4uL0xvYWRlci9TaGVsbExvYWRlclwiKTtcbmNvbnN0IG5hcmxvYWRlcl8xID0gcmVxdWlyZShcIm5hcmxvYWRlclwiKTtcbndpbmRvd1tcIlN1cmZhY2VUcmVlXCJdID0gU1Q7XG53aW5kb3dbXCJTdXJmYWNlVXRpbFwiXSA9IFNVO1xud2luZG93W1wiU3VyZmFjZXNUeHQyWWFtbFwiXSA9IFNUMlk7XG5jb25zdCBRVW5pdCA9IHJlcXVpcmUoXCJxdW5pdGpzXCIpO1xuY29uc3QgZW1wb3dlciA9IHJlcXVpcmUoJ2VtcG93ZXInKTtcbmNvbnN0IGZvcm1hdHRlciA9IHJlcXVpcmUoJ3Bvd2VyLWFzc2VydC1mb3JtYXR0ZXInKTtcbmNvbnN0IHF1bml0VGFwID0gcmVxdWlyZShcInF1bml0LXRhcFwiKTtcbi8vUVVuaXQuY29uZmlnLmF1dG9zdGFydCA9IGZhbHNlO1xuZW1wb3dlcihRVW5pdC5hc3NlcnQsIGZvcm1hdHRlcigpLCB7IGRlc3RydWN0aXZlOiB0cnVlIH0pO1xucXVuaXRUYXAoUVVuaXQsIGZ1bmN0aW9uICgpIHsgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTsgfSwgeyBzaG93U291cmNlT25GYWlsdXJlOiBmYWxzZSB9KTtcbmZ1bmN0aW9uIGN2dChhKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGEpLnJlZHVjZSgobywga2V5KSA9PiAob1trZXldID0gKCkgPT4gUHJvbWlzZS5yZXNvbHZlKGFba2V5XSksIG8pLCB7fSk7XG59XG5RVW5pdC5tb2R1bGUoJ1N1cmZhY2VVdGlsJyk7XG5RVW5pdC50ZXN0KFwiU3VyZmFjZVV0aWwuZmluZFwiLCAoYXNzZXJ0KSA9PiB7XG4gICAgY29uc3QgcGF0aHMgPSBbXG4gICAgICAgIFwic3VyZmFjZTAucG5nXCIsXG4gICAgICAgIFwic3VyZmFjZTEwLnBuZ1wiLFxuICAgICAgICBcImVsZW1lbnRzL2VsZW1lbnQwLnBuZ1wiXG4gICAgXTtcbiAgICBsZXQgcmVzdWx0cyA9IFNVLmZpbmQocGF0aHMsIFwiLi9zdXJmYWNlMC5wbmdcIik7XG4gICAgYXNzZXJ0Lm9rKHJlc3VsdHNbMF0gPT09IHBhdGhzWzBdKTtcbiAgICByZXN1bHRzID0gU1UuZmluZChwYXRocywgXCJTVVJGQUNFMTAuUE5HXCIpO1xuICAgIGFzc2VydC5vayhyZXN1bHRzWzBdID09PSBwYXRoc1sxXSk7XG4gICAgcmVzdWx0cyA9IFNVLmZpbmQocGF0aHMsIFwiZWxlbWVudHNcXFxcZWxlbWVudDAucG5nXCIpO1xuICAgIGFzc2VydC5vayhyZXN1bHRzWzBdID09PSBwYXRoc1syXSk7XG59KTtcblFVbml0LnRlc3QoXCJTdXJmYWNlVXRpbC5jaG9pY2VcIiwgKGFzc2VydCkgPT4ge1xuICAgIGxldCByZXN1bHRzID0gKCgpID0+IHsgbGV0IGFyciA9IFtdOyBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDA7IGkrKykge1xuICAgICAgICBhcnIucHVzaChTVS5jaG9pY2UoWzEsIDIsIDNdKSk7XG4gICAgfSByZXR1cm4gYXJyOyB9KSgpO1xuICAgIGxldCBhID0gcmVzdWx0cy5yZWR1Y2UoKChjb3VudCwgdmFsKSA9PiB2YWwgPT09IDEgPyBjb3VudCArIDEgOiBjb3VudCksIDApIC8gcmVzdWx0cy5sZW5ndGg7XG4gICAgYXNzZXJ0Lm9rKDAuMiA8IGEgJiYgYSA8IDAuNCk7XG4gICAgbGV0IGIgPSByZXN1bHRzLnJlZHVjZSgoKGNvdW50LCB2YWwpID0+IHZhbCA9PT0gMiA/IGNvdW50ICsgMSA6IGNvdW50KSwgMCkgLyByZXN1bHRzLmxlbmd0aDtcbiAgICBhc3NlcnQub2soMC4yIDwgYiAmJiBiIDwgMC40KTtcbiAgICBsZXQgYyA9IHJlc3VsdHMucmVkdWNlKCgoY291bnQsIHZhbCkgPT4gdmFsID09PSAzID8gY291bnQgKyAxIDogY291bnQpLCAwKSAvIHJlc3VsdHMubGVuZ3RoO1xuICAgIGFzc2VydC5vaygwLjIgPCBjICYmIGMgPCAwLjQpO1xufSk7XG5RVW5pdC50ZXN0KFwiU3VyZmFjZVV0aWwuc2NvcGVcIiwgKGFzc2VydCkgPT4ge1xuICAgIGFzc2VydC5vayhcInNha3VyYVwiID09PSBTVS5zY29wZSgwKSk7XG4gICAgYXNzZXJ0Lm9rKFwia2Vyb1wiID09PSBTVS5zY29wZSgxKSk7XG4gICAgYXNzZXJ0Lm9rKFwiY2hhcjJcIiA9PT0gU1Uuc2NvcGUoMikpO1xufSk7XG5RVW5pdC50ZXN0KFwiU3VyZmFjZVV0aWwudW5zY29wZVwiLCAoYXNzZXJ0KSA9PiB7XG4gICAgYXNzZXJ0Lm9rKDAgPT09IFNVLnVuc2NvcGUoXCJzYWt1cmFcIikpO1xuICAgIGFzc2VydC5vaygxID09PSBTVS51bnNjb3BlKFwia2Vyb1wiKSk7XG4gICAgYXNzZXJ0Lm9rKDIgPT09IFNVLnVuc2NvcGUoXCJjaGFyMlwiKSk7XG59KTtcblFVbml0Lm1vZHVsZSgnU2hlbGxDb25maWdMb2FkZXInKTtcblFVbml0LnRlc3QoJ1NoZWxsQ29uZmlnTG9hZGVyLmxvYWRGcm9tSlNPTkxpa2UnLCAoYXNzZXJ0KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgY29uc3QgZGlyID0geWllbGQgbmFybG9hZGVyXzEuTmFyTG9hZGVyLmxvYWRGcm9tVVJMKFwiL25hci9tb2JpbGVtYXN0ZXIubmFyXCIpO1xuICAgIGNvbnN0IGRpYyA9IGN2dChkaXIuZ2V0RGlyZWN0b3J5KFwic2hlbGwvbWFzdGVyXCIpLmFzQXJyYXlCdWZmZXIoKSk7XG4gICAgY29uc3QgZGVzY3JpcHQgPSB5aWVsZCBTTC5sb2FkRGVzY3JpcHQoZGljKTtcbiAgICBjb25zdCBjb25maWcgPSB5aWVsZCBTQ0wubG9hZEZyb21KU09OTGlrZShkZXNjcmlwdC5kZXNjcmlwdCk7XG4gICAgYXNzZXJ0Lm9rKGRlc2NyaXB0LmRlc2NyaXB0W1wiY2hhcnNldFwiXSA9PT0gXCJTaGlmdF9KSVNcIik7XG4gICAgYXNzZXJ0Lm9rKGRlc2NyaXB0LmRlc2NyaXB0W1wic2FrdXJhLmJhbGxvb24ub2Zmc2V0eFwiXSA9PT0gXCIyMVwiKTtcbiAgICBhc3NlcnQub2soZGVzY3JpcHQuZGVzY3JpcHRbXCJzZXJpa28ucGFpbnRfdHJhbnNwYXJlbnRfcmVnaW9uX2JsYWNrXCJdID09PSBcIjBcIik7XG4gICAgYXNzZXJ0Lm9rKGNvbmZpZy5zZXJpa28gaW5zdGFuY2VvZiBTQy5TZXJpa28pO1xuICAgIGFzc2VydC5vayhjb25maWcuc2VyaWtvLnVzZV9zZWxmX2FscGhhID09PSBmYWxzZSk7XG4gICAgYXNzZXJ0Lm9rKGNvbmZpZy5zZXJpa28uYWxpZ25tZW50dG9kZXNrdG9wID09PSBcImJvdHRvbVwiKTtcbiAgICBhc3NlcnQub2soY29uZmlnLm1lbnUgaW5zdGFuY2VvZiBTQy5NZW51KTtcbiAgICBhc3NlcnQub2soY29uZmlnLmNoYXIgaW5zdGFuY2VvZiBBcnJheSk7XG4gICAgYXNzZXJ0Lm9rKGNvbmZpZy5iaW5kZ3JvdXAgaW5zdGFuY2VvZiBBcnJheSk7XG4gICAgYXNzZXJ0Lm9rKHR5cGVvZiBjb25maWcuZW5hYmxlUmVnaW9uID09PSBcImJvb2xlYW5cIik7XG4gICAgYXNzZXJ0Lm9rKHR5cGVvZiBjb25maWcucG9zaXRpb24gPT09IFwic3RyaW5nXCIpO1xufSkpO1xuUVVuaXQubW9kdWxlKCdTdXJmYWNlVHJlZUxvYWRlcicpO1xuUVVuaXQudGVzdCgnU3VyZmFjZVRyZWVMb2FkZXIubG9hZFN1cmZhY2VzVHh0JywgKGFzc2VydCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIGNvbnN0IG5hbmlrYURpciA9IHlpZWxkIG5hcmxvYWRlcl8xLk5hckxvYWRlci5sb2FkRnJvbVVSTCgnLi4vbmFyL21vYmlsZW1hc3Rlci5uYXInKTtcbiAgICBjb25zdCBzaGVsbERpciA9IGN2dChuYW5pa2FEaXIuZ2V0RGlyZWN0b3J5KCdzaGVsbC9tYXN0ZXInKS5hc0FycmF5QnVmZmVyKCkpO1xuICAgIGNvbnN0IHN1cmZhY2VUcmVlID0geWllbGQgU0wubG9hZFN1cmZhY2VzVHh0KHNoZWxsRGlyKTtcbiAgICBjb25zdCB7IGFsaWFzZXMsIHN1cmZhY2VzLCBkZXNjcmlwdCB9ID0gc3VyZmFjZVRyZWUuc3VyZmFjZURlZlRyZWU7XG4gICAgYXNzZXJ0Lm9rKEFycmF5LmlzQXJyYXkoYWxpYXNlcykpO1xuICAgIGFzc2VydC5vayhBcnJheS5pc0FycmF5KHN1cmZhY2VzKSk7XG4gICAgc3VyZmFjZXMuZm9yRWFjaCgoc3JmKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgZWxlbWVudHMsIGNvbGxpc2lvbnMsIGFuaW1hdGlvbnMsIGJhbGxvb25zLCBwb2ludHMgfSA9IHNyZjtcbiAgICAgICAgYXNzZXJ0Lm9rKEFycmF5LmlzQXJyYXkoZWxlbWVudHMpICYmIGVsZW1lbnRzLmV2ZXJ5KChlbG0pID0+IGVsbSBpbnN0YW5jZW9mIFNULlN1cmZhY2VFbGVtZW50KSk7XG4gICAgICAgIGFzc2VydC5vayhBcnJheS5pc0FycmF5KGNvbGxpc2lvbnMpICYmIGNvbGxpc2lvbnMuZXZlcnkoKGNvbCkgPT4gY29sIGluc3RhbmNlb2YgU1QuU3VyZmFjZUNvbGxpc2lvbikpO1xuICAgICAgICBhc3NlcnQub2soQXJyYXkuaXNBcnJheShhbmltYXRpb25zKSAmJiBhbmltYXRpb25zLmV2ZXJ5KChhbm0pID0+IGFubSBpbnN0YW5jZW9mIFNULlN1cmZhY2VBbmltYXRpb24pKTtcbiAgICB9KTtcbiAgICBhc3NlcnQub2soZGVzY3JpcHQuY29sbGlzaW9uU29ydCA9PT0gXCJhc2NlbmRcIik7XG4gICAgYXNzZXJ0Lm9rKGRlc2NyaXB0LmFuaW1hdGlvblNvcnQgPT09IFwiYXNjZW5kXCIpO1xufSkpO1xuIl19

