"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supportRef = exports.useComposeRef = exports.composeRef = exports.fillRef = void 0;
var react_is_1 = require("react-is");
var useMemo_1 = __importDefault(require("./hook/useMemo"));
function fillRef(ref, node) {
    if (typeof ref === 'function') {
        ref(node);
    }
    else if (typeof ref === 'object' && ref && 'current' in ref) {
        ref.current = node;
    }
}
exports.fillRef = fillRef;
/**
 * Merge refs into one ref function to support ref passing.
 */
function composeRef() {
    var refs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        refs[_i] = arguments[_i];
    }
    var refList = refs.filter(function (ref) { return ref; });
    if (refList.length <= 1) {
        return refList[0];
    }
    return function (node) {
        refs.forEach(function (ref) {
            fillRef(ref, node);
        });
    };
}
exports.composeRef = composeRef;
function useComposeRef() {
    var refs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        refs[_i] = arguments[_i];
    }
    return (0, useMemo_1.default)(function () { return composeRef.apply(void 0, refs); }, refs, function (prev, next) {
        return prev.length === next.length && prev.every(function (ref, i) { return ref === next[i]; });
    });
}
exports.useComposeRef = useComposeRef;
function supportRef(nodeOrComponent) {
    var _a, _b;
    var type = (0, react_is_1.isMemo)(nodeOrComponent)
        ? nodeOrComponent.type.type
        : nodeOrComponent.type;
    // Function component node
    if (typeof type === 'function' && !((_a = type.prototype) === null || _a === void 0 ? void 0 : _a.render)) {
        return false;
    }
    // Class component
    if (typeof nodeOrComponent === 'function' &&
        !((_b = nodeOrComponent.prototype) === null || _b === void 0 ? void 0 : _b.render)) {
        return false;
    }
    return true;
}
exports.supportRef = supportRef;
/* eslint-enable */ 
