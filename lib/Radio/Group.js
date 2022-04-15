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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var useMergedState_1 = __importDefault(require("../_util/hook/useMergedState"));
var Radio_1 = __importDefault(require("./Radio"));
var SizeContext_1 = __importDefault(require("../ConfigProvider/SizeContext"));
var Context_1 = require("./Context");
var getDataOrAriaProps_1 = __importDefault(require("../_util/getDataOrAriaProps"));
var responsiveObserve_1 = require("../_util/responsiveObserve");
var RadioGroup = React.forwardRef(function (props, ref) {
    var size = React.useContext(SizeContext_1.default);
    var _a = (0, useMergedState_1.default)(props.defaultValue, {
        value: props.value,
    }), value = _a[0], setValue = _a[1];
    var onRadioChange = function (ev) {
        var lastValue = value;
        var val = ev.target.value;
        if (!('value' in props)) {
            setValue(val);
        }
        var onChange = props.onChange;
        if (onChange && val !== lastValue) {
            onChange(ev);
        }
    };
    var renderGroup = function () {
        var _a;
        var customizePrefixCls = props.prefixCls, _b = props.className, className = _b === void 0 ? '' : _b, options = props.options, optionType = props.optionType, _c = props.buttonStyle, buttonStyle = _c === void 0 ? 'outline' : _c, disabled = props.disabled, children = props.children, customizeSize = props.size, style = props.style, id = props.id, onMouseEnter = props.onMouseEnter, onMouseLeave = props.onMouseLeave;
        var prefixCls = (0, responsiveObserve_1.getPrefixCls)('radio', customizePrefixCls);
        var groupPrefixCls = "".concat(prefixCls, "-group");
        var childrenToRender = children;
        // 如果存在 options, 优先使用
        if (options && options.length > 0) {
            var optionsPrefixCls_1 = optionType === 'button' ? "".concat(prefixCls, "-button") : prefixCls;
            childrenToRender = options.map(function (option) {
                if (typeof option === 'string') {
                    // 此处类型自动推导为 string
                    return (React.createElement(Radio_1.default, { key: option, prefixCls: optionsPrefixCls_1, disabled: disabled, value: option, checked: value === option }, option));
                }
                // 此处类型自动推导为 { label: string value: string }
                return (React.createElement(Radio_1.default, { key: "radio-group-value-options-".concat(option.value), prefixCls: optionsPrefixCls_1, disabled: option.disabled || disabled, value: option.value, checked: value === option.value, style: option.style }, option.label));
            });
        }
        var mergedSize = customizeSize || size;
        var classString = (0, classnames_1.default)(groupPrefixCls, "".concat(groupPrefixCls, "-").concat(buttonStyle), (_a = {},
            _a["".concat(groupPrefixCls, "-").concat(mergedSize)] = mergedSize,
            _a), className);
        return (React.createElement("div", __assign({}, (0, getDataOrAriaProps_1.default)(props), { className: classString, style: style, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave, id: id, ref: ref }), childrenToRender));
    };
    return (React.createElement(Context_1.RadioGroupContextProvider, { value: {
            onChange: onRadioChange,
            value: value,
            disabled: props.disabled,
            name: props.name,
        } }, renderGroup()));
});
exports.default = React.memo(RadioGroup);
