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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setValues = exports.toArray = void 0;
function toArray(value) {
    if (value === undefined || value === null) {
        return [];
    }
    return Array.isArray(value) ? value : [value];
}
exports.toArray = toArray;
function internalSetValues(store, values) {
    var newStore = (Array.isArray(store) ? __spreadArray([], store, true) : __assign({}, store));
    if (!values) {
        return newStore;
    }
    Object.keys(values).forEach(function (key) {
        var prevValue = newStore[key];
        var value = values[key];
        // If both are object (but target is not array), we use recursion to set deep value
        var recursive = isObject(prevValue) && isObject(value);
        newStore[key] = recursive ? internalSetValues(prevValue, value || {}) : value;
    });
    return newStore;
}
function setValues(store) {
    var restValues = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        restValues[_i - 1] = arguments[_i];
    }
    return restValues.reduce(function (current, newStore) { return internalSetValues(current, newStore); }, store);
}
exports.setValues = setValues;
function isObject(obj) {
    return typeof obj === 'object' && obj !== null && Object.getPrototypeOf(obj) === Object.prototype;
}
