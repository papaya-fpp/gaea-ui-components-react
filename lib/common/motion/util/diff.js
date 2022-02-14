"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.diffKeys = exports.parseKeys = exports.wrapKeyToObject = exports.STATUS_REMOVED = exports.STATUS_REMOVE = exports.STATUS_KEEP = exports.STATUS_ADD = void 0;
exports.STATUS_ADD = 'add';
exports.STATUS_KEEP = 'keep';
exports.STATUS_REMOVE = 'remove';
exports.STATUS_REMOVED = 'removed';
function wrapKeyToObject(key) {
    var keyObj;
    if (key && typeof key === 'object' && 'key' in key) {
        keyObj = key;
    }
    else {
        keyObj = { key: key };
    }
    return __assign(__assign({}, keyObj), { key: String(keyObj.key) });
}
exports.wrapKeyToObject = wrapKeyToObject;
function parseKeys(keys) {
    if (keys === void 0) { keys = []; }
    return keys.map(wrapKeyToObject);
}
exports.parseKeys = parseKeys;
function diffKeys(prevKeys, currentKeys) {
    if (prevKeys === void 0) { prevKeys = []; }
    if (currentKeys === void 0) { currentKeys = []; }
    var list = [];
    var currentIndex = 0;
    var currentLen = currentKeys.length;
    var prevKeyObjects = parseKeys(prevKeys);
    var currentKeyObjects = parseKeys(currentKeys);
    // Check prev keys to insert or keep
    prevKeyObjects.forEach(function (keyObj) {
        var hit = false;
        for (var i = currentIndex; i < currentLen; i += 1) {
            var currentKeyObj = currentKeyObjects[i];
            if (currentKeyObj.key === keyObj.key) {
                // New added keys should add before current key
                if (currentIndex < i) {
                    list = list.concat(currentKeyObjects
                        .slice(currentIndex, i)
                        .map(function (obj) { return (__assign(__assign({}, obj), { status: exports.STATUS_ADD })); }));
                    currentIndex = i;
                }
                list.push(__assign(__assign({}, currentKeyObj), { status: exports.STATUS_KEEP }));
                currentIndex += 1;
                hit = true;
                break;
            }
        }
        // If not hit, it means key is removed
        if (!hit) {
            list.push(__assign(__assign({}, keyObj), { status: exports.STATUS_REMOVE }));
        }
    });
    // Add rest to the list
    if (currentIndex < currentLen) {
        list = list.concat(currentKeyObjects
            .slice(currentIndex)
            .map(function (obj) { return (__assign(__assign({}, obj), { status: exports.STATUS_ADD })); }));
    }
    /**
     * Merge same key when it remove and add again:
     *    [1 - add, 2 - keep, 1 - remove] -> [1 - keep, 2 - keep]
     */
    var keys = {};
    list.forEach(function (_a) {
        var key = _a.key;
        keys[key] = (keys[key] || 0) + 1;
    });
    var duplicatedKeys = Object.keys(keys).filter(function (key) { return keys[key] > 1; });
    duplicatedKeys.forEach(function (matchKey) {
        // Remove `STATUS_REMOVE` node.
        list = list.filter(function (_a) {
            var key = _a.key, status = _a.status;
            return key !== matchKey || status !== exports.STATUS_REMOVE;
        });
        // Update `STATUS_ADD` to `STATUS_KEEP`
        list.forEach(function (node) {
            if (node.key === matchKey) {
                // eslint-disable-next-line no-param-reassign
                node.status = exports.STATUS_KEEP;
            }
        });
    });
    return list;
}
exports.diffKeys = diffKeys;
