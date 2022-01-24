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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var React = __importStar(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var useMergedState_1 = __importDefault(require("../_util/hook/useMergedState"));
var KeyCode_1 = __importDefault(require("../_util/KeyCode"));
var RcSwitch = React.forwardRef(function (_a, ref) {
    var _b;
    var _c = _a.prefixCls, prefixCls = _c === void 0 ? 'rc-switch' : _c, className = _a.className, checked = _a.checked, defaultChecked = _a.defaultChecked, disabled = _a.disabled, loadingIcon = _a.loadingIcon, checkedChildren = _a.checkedChildren, unCheckedChildren = _a.unCheckedChildren, onClick = _a.onClick, onChange = _a.onChange, onKeyDown = _a.onKeyDown, restProps = __rest(_a, ["prefixCls", "className", "checked", "defaultChecked", "disabled", "loadingIcon", "checkedChildren", "unCheckedChildren", "onClick", "onChange", "onKeyDown"]);
    var _d = (0, useMergedState_1.default)(false, {
        value: checked,
        defaultValue: defaultChecked,
    }), innerChecked = _d[0], setInnerChecked = _d[1];
    function triggerChange(newChecked, event) {
        var mergedChecked = innerChecked;
        if (!disabled) {
            mergedChecked = newChecked;
            setInnerChecked(mergedChecked);
            onChange === null || onChange === void 0 ? void 0 : onChange(mergedChecked, event);
        }
        return mergedChecked;
    }
    function onInternalKeyDown(e) {
        if (e.which === KeyCode_1.default.LEFT) {
            triggerChange(false, e);
        }
        else if (e.which === KeyCode_1.default.RIGHT) {
            triggerChange(true, e);
        }
        onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(e);
    }
    function onInternalClick(e) {
        var ret = triggerChange(!innerChecked, e);
        // [Legacy] trigger onClick with value
        onClick === null || onClick === void 0 ? void 0 : onClick(ret, e);
    }
    var switchClassName = (0, classnames_1.default)(prefixCls, className, (_b = {},
        _b["".concat(prefixCls, "-checked")] = innerChecked,
        _b["".concat(prefixCls, "-disabled")] = disabled,
        _b));
    return (React.createElement("button", __assign({}, restProps, { type: "button", role: "switch", "aria-checked": innerChecked, disabled: disabled, className: switchClassName, ref: ref, onKeyDown: onInternalKeyDown, onClick: onInternalClick }),
        loadingIcon,
        React.createElement("span", { className: "".concat(prefixCls, "-inner") }, innerChecked ? checkedChildren : unCheckedChildren)));
});
RcSwitch.displayName = 'RcSwitch';
exports.default = RcSwitch;
