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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupContext = void 0;
var React = __importStar(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var omit_1 = __importDefault(require("../_util/omit"));
var Checkbox_1 = __importDefault(require("./Checkbox"));
var responsiveObserve_1 = require("../_util/responsiveObserve");
exports.GroupContext = React.createContext(null);
var InternalCheckboxGroup = function (_a, ref) {
    var defaultValue = _a.defaultValue, children = _a.children, _b = _a.options, options = _b === void 0 ? [] : _b, customizePrefixCls = _a.prefixCls, className = _a.className, style = _a.style, onChange = _a.onChange, restProps = __rest(_a, ["defaultValue", "children", "options", "prefixCls", "className", "style", "onChange"]);
    var _c = React.useState(restProps.value || defaultValue || []), value = _c[0], setValue = _c[1];
    var _d = React.useState([]), registeredValues = _d[0], setRegisteredValues = _d[1];
    React.useEffect(function () {
        if ('value' in restProps) {
            setValue(restProps.value || []);
        }
    }, [restProps.value]);
    var getOptions = function () {
        return options.map(function (option) {
            if (typeof option === 'string') {
                return {
                    label: option,
                    value: option,
                };
            }
            return option;
        });
    };
    var cancelValue = function (val) {
        setRegisteredValues(function (prevValues) { return prevValues.filter(function (v) { return v !== val; }); });
    };
    var registerValue = function (val) {
        setRegisteredValues(function (prevValues) { return __spreadArray(__spreadArray([], prevValues, true), [val], false); });
    };
    var toggleOption = function (option) {
        var optionIndex = value.indexOf(option.value);
        var newValue = __spreadArray([], value, true);
        if (optionIndex === -1) {
            newValue.push(option.value);
        }
        else {
            newValue.splice(optionIndex, 1);
        }
        if (!('value' in restProps)) {
            setValue(newValue);
        }
        var opts = getOptions();
        onChange === null || onChange === void 0 ? void 0 : onChange(newValue
            .filter(function (val) { return registeredValues.indexOf(val) !== -1; })
            .sort(function (a, b) {
            var indexA = opts.findIndex(function (opt) { return opt.value === a; });
            var indexB = opts.findIndex(function (opt) { return opt.value === b; });
            return indexA - indexB;
        }));
    };
    var prefixCls = (0, responsiveObserve_1.getPrefixCls)('checkbox', customizePrefixCls);
    var groupPrefixCls = "".concat(prefixCls, "-group");
    var domProps = (0, omit_1.default)(restProps, ['value', 'disabled']);
    if (options && options.length > 0) {
        children = getOptions().map(function (option) { return (React.createElement(Checkbox_1.default, { prefixCls: prefixCls, key: option.value.toString(), disabled: 'disabled' in option ? option.disabled : restProps.disabled, value: option.value, checked: value.indexOf(option.value) !== -1, onChange: option.onChange, className: "".concat(groupPrefixCls, "-item"), style: option.style }, option.label)); });
    }
    var context = {
        toggleOption: toggleOption,
        value: value,
        disabled: restProps.disabled,
        name: restProps.name,
        registerValue: registerValue,
        cancelValue: cancelValue,
    };
    var classString = (0, classnames_1.default)(groupPrefixCls, className);
    return (React.createElement("div", __assign({ className: classString, style: style }, domProps, { ref: ref }),
        React.createElement(exports.GroupContext.Provider, { value: context }, children)));
};
var CheckboxGroup = React.forwardRef(InternalCheckboxGroup);
exports.default = React.memo(CheckboxGroup);
