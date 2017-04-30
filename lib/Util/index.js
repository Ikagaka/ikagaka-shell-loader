"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function extend() {
    let options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
    // Handle a deep copy situation
    if (typeof target === "boolean") {
        deep = target;
        // Skip the boolean and the target
        target = arguments[i] || {};
        i++;
    }
    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== "object" && !(target instanceof Function)) {
        target = {};
    }
    // Extend jQuery itself if only one argument is passed
    if (i === length) {
        target = this;
        i--;
    }
    for (; i < length; i++) {
        // Only deal with non-null/undefined values
        if ((options = arguments[i]) != null) {
            // Extend the base object
            for (name in options) {
                src = target[name];
                copy = options[name];
                // Prevent never-ending loop
                if (target === copy) {
                    continue;
                }
                // Recurse if we're merging plain objects or arrays
                if (deep && copy && (isPlainObject(copy) ||
                    (copyIsArray = Array.isArray(copy)))) {
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && Array.isArray(src) ? src : [];
                    }
                    else {
                        clone = src && isPlainObject(src) ? src : {};
                    }
                    // Never move original objects, clone them
                    target[name] = extend(deep, clone, copy);
                    // Don't bring in undefined values
                }
                else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }
    // Return the modified object
    return target;
}
exports.extend = extend;
function isPlainObject(obj) {
    // Detect obvious negatives
    // Use toString instead of jQuery.type to catch host objects
    if (!obj || toString.call(obj) !== "[object Object]") {
        return false;
    }
    const proto = Object.getPrototypeOf(obj);
    // Objects with no prototype (e.g., `Object.create( null )`) are plain
    if (!proto) {
        return true;
    }
    // Objects with prototype are plain iff they were constructed by a global Object function
    const Ctor = Object.prototype.hasOwnProperty.call(proto, "constructor") && proto.constructor;
    return typeof Ctor === "function" && Object.prototype.toString.call(Ctor) === Object.prototype.toString.call(Object);
}
// find filename that matches arg "filename" from arg "paths"
// filename: in surface.txt, as ./surface0.png,　surface0.PNG, .\element\element0.PNG ...
function find(paths, filename) {
    filename = filename.split("\\").join("/");
    if (filename.slice(0, 2) === "./") {
        filename = filename.slice(2);
    }
    const reg = new RegExp("^" + filename.replace(".", "\.") + "$", "i");
    const hits = paths.filter((key) => reg.test(key));
    return hits;
}
exports.find = find;
// 検索打ち切って高速化
function fastfind(paths, filename) {
    filename = filename.split("\\").join("/");
    if (filename.slice(0, 2) === "./") {
        filename = filename.slice(2);
    }
    const reg = new RegExp("^" + filename.replace(".", "\.") + "$", "i");
    for (let i = 0; i < paths.length; i++) {
        if (reg.test(paths[i])) {
            return paths[i];
        }
    }
    return "";
}
exports.fastfind = fastfind;
// copy canvas as new object
// this copy technic is faster than getImageData full copy, but some pixels are bad copy.
// see also: http://stackoverflow.com/questions/4405336/how-to-copy-contents-of-one-canvas-to-another-canvas-locally
function copy(cnv) {
    const _copy = document.createElement("canvas");
    const ctx = _copy.getContext("2d");
    _copy.width = cnv.width;
    _copy.height = cnv.height;
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(cnv, 0, 0); // type hack
    return _copy;
}
exports.copy = copy;
function has(dir, path) {
    return fastfind(Object.keys(dir), path);
}
exports.has = has;
function get(dir, path) {
    let key = "";
    if ((key = this.has(dir, path)) === "") {
        return Promise.reject("file not find");
    }
    return Promise.resolve(dir[key]);
}
exports.get = get;
// 0 -> sakura
function scope(scopeId) {
    return scopeId === 0 ? "sakura"
        : scopeId === 1 ? "kero"
            : "char" + scopeId;
}
exports.scope = scope;
// sakura -> 0
// parse error -> -1
function unscope(charId) {
    return charId === "sakura" ? 0
        : charId === "kero" ? 1
            : Number((/^char(\d+)/.exec(charId) || ["", "-1"])[1]);
}
exports.unscope = unscope;
// [1,2,3] -> 1 or 2 or 3 as 33% probability
function choice(arr) {
    return arr[Math.ceil(Math.random() * 100 * (arr.length)) % arr.length];
}
exports.choice = choice;
