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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var responsiveObserve_1 = require("../_util/responsiveObserve");
var Icon_1 = __importDefault(require("../Icon"));
var Avatar = function (_a) {
    var size = _a.size, src = _a.src, icon = _a.icon, _b = _a.shape, shape = _b === void 0 ? 'circle' : _b, children = _a.children, className = _a.className, style = _a.style, other = __rest(_a, ["size", "src", "icon", "shape", "children", "className", "style"]);
    var prefixCls = (0, responsiveObserve_1.getPrefixCls)('avatar');
    var classes = (0, classnames_1.default)(prefixCls, "".concat(prefixCls, "-").concat(shape), className);
    var sizeStyle = typeof size === 'number'
        ? {
            width: size,
            height: size,
            lineHeight: "".concat(size, "px"),
            fontSize: icon ? size / 2 : 18,
        }
        : {};
    var renderChildren = function () {
        if (children) {
            return children;
        }
        if (icon) {
            return react_1.default.createElement(Icon_1.default, { name: icon });
        }
        if (src) {
            return react_1.default.createElement("img", { src: src, alt: "" });
        }
        return null;
    };
    return (react_1.default.createElement("div", __assign({ className: classes }, other, { style: __assign(__assign({}, sizeStyle), style) }), renderChildren()));
};
exports.default = Avatar;
