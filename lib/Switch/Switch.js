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
var RcSwitch_1 = __importDefault(require("./RcSwitch"));
var devWarning_1 = __importDefault(require("../_util/devWarning"));
var responsiveObserve_1 = require("../_util/responsiveObserve");
;
var Switch = react_1.default.forwardRef(function (_a, ref) {
    var _b;
    var customizePrefixCls = _a.prefixCls, customizeSize = _a.size, loading = _a.loading, _c = _a.className, className = _c === void 0 ? '' : _c, disabled = _a.disabled, props = __rest(_a, ["prefixCls", "size", "loading", "className", "disabled"]);
    (0, devWarning_1.default)('checked' in props || !('value' in props), 'Switch', '`value` is not a valid prop, do you mean `checked`?');
    var prefixCls = (0, responsiveObserve_1.getPrefixCls)('switch');
    var loadingIcon = (react_1.default.createElement("div", { className: "".concat(prefixCls, "-handle") }));
    var classes = (0, classnames_1.default)((_b = {},
        _b["".concat(prefixCls, "-small")] = customizeSize === 'small',
        _b["".concat(prefixCls, "-loading")] = loading,
        _b), className);
    return (react_1.default.createElement(RcSwitch_1.default, __assign({}, props, { prefixCls: prefixCls, className: classes, disabled: disabled || loading, ref: ref, loadingIcon: loadingIcon })));
});
Switch.displayName = 'Switch';
exports.default = react_1.default.memo(Switch);
