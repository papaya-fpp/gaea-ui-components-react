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
var Icon_1 = __importDefault(require("../Icon"));
var responsiveObserve_1 = require("../_util/responsiveObserve");
/**
 * Primary UI component for user interaction
 */
var Button = function (_a) {
    var _b = _a.primary, primary = _b === void 0 ? false : _b, _c = _a.danger, danger = _c === void 0 ? false : _c, _d = _a.disabled, disabled = _d === void 0 ? false : _d, _e = _a.size, size = _e === void 0 ? 'medium' : _e, backgroundColor = _a.backgroundColor, label = _a.label, children = _a.children, icon = _a.icon, loading = _a.loading, style = _a.style, className = _a.className, props = __rest(_a, ["primary", "danger", "disabled", "size", "backgroundColor", "label", "children", "icon", "loading", "style", "className"]);
    var prefixCls = (0, responsiveObserve_1.getPrefixCls)('button');
    var mode = primary ? "".concat(prefixCls, "--primary") : "".concat(prefixCls, "--secondary");
    var dangerState = danger ? (primary ? "".concat(prefixCls, "--danger-primary") : "".concat(prefixCls, "--danger-secondary")) : '';
    var disabledState = disabled || loading ? "".concat(prefixCls, "--disabled") : '';
    var loadingState = loading ? "".concat(prefixCls, "--loading") : '';
    return (react_1.default.createElement("button", __assign({ type: "button", className: ["".concat(prefixCls), "".concat(prefixCls, "--").concat(size), mode, disabledState, dangerState, loadingState, className].join(' '), style: __assign({ backgroundColor: backgroundColor }, style) }, props),
        react_1.default.createElement("div", { className: ["".concat(prefixCls, "-text")].join(' ') },
            icon && react_1.default.createElement(Icon_1.default, { className: ["".concat(prefixCls, "--icon")].join(' '), name: icon }),
            loading && react_1.default.createElement(Icon_1.default, { className: ["".concat(prefixCls, "--icon"), "".concat(prefixCls, "--loading-icon")].join(' '), name: "Spinnerjiazai1" }),
            !children && label && (react_1.default.createElement("div", { className: ["".concat(prefixCls, "--label")].join(' ') }, label)),
            children && (react_1.default.createElement("div", { className: ["".concat(prefixCls, "--label")].join(' ') }, children)))));
};
exports.default = Button;
