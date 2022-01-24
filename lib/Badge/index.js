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
var Badge = function (_a) {
    var _b;
    var _c = _a.count, count = _c === void 0 ? 0 : _c, _d = _a.overflowCount, overflowCount = _d === void 0 ? 99 : _d, dot = _a.dot, children = _a.children, className = _a.className, style = _a.style, _e = _a.size, size = _e === void 0 ? 'default' : _e, other = __rest(_a, ["count", "overflowCount", "dot", "children", "className", "style", "size"]);
    var prefixCls = (0, responsiveObserve_1.getPrefixCls)('badge');
    var classes = (0, classnames_1.default)(prefixCls, className);
    var supClasses = (0, classnames_1.default)("".concat(prefixCls, "-sup"), (_b = {},
        _b["".concat(prefixCls, "-dot")] = dot,
        _b["".concat(prefixCls, "-count")] = !dot,
        _b["".concat(prefixCls, "-").concat(size)] = !dot,
        _b));
    var number = count > overflowCount ? "".concat(overflowCount, "+") : "".concat(count);
    return (react_1.default.createElement("div", __assign({ className: classes }, other, { style: style }),
        children,
        (dot || parseInt(number) > 0) && react_1.default.createElement("sup", { className: supClasses }, dot ? '' : number)));
};
exports.default = Badge;
