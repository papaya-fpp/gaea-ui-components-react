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
var RcCheckbox_1 = __importDefault(require("./RcCheckbox"));
var classnames_1 = __importDefault(require("classnames"));
var ref_1 = require("../_util/ref");
var Context_1 = __importDefault(require("./Context"));
var responsiveObserve_1 = require("../_util/responsiveObserve");
var devWarning_1 = __importDefault(require("../_util/devWarning"));
var InternalRadio = function (props, ref) {
    var _a;
    var context = React.useContext(Context_1.default);
    var innerRef = React.useRef();
    var mergedRef = (0, ref_1.composeRef)(ref, innerRef);
    React.useEffect(function () {
        (0, devWarning_1.default)(!('optionType' in props), 'Radio', '`optionType` is only support in Radio.Group.');
    }, []);
    var onChange = function (e) {
        var _a, _b;
        (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, e);
        (_b = context === null || context === void 0 ? void 0 : context.onChange) === null || _b === void 0 ? void 0 : _b.call(context, e);
    };
    var customizePrefixCls = props.prefixCls, className = props.className, children = props.children, style = props.style, restProps = __rest(props, ["prefixCls", "className", "children", "style"]);
    var prefixCls = (0, responsiveObserve_1.getPrefixCls)('radio', customizePrefixCls);
    var radioProps = __assign({}, restProps);
    if (context) {
        radioProps.name = context.name;
        radioProps.onChange = onChange;
        radioProps.checked = props.value === context.value;
        radioProps.disabled = props.disabled || context.disabled;
    }
    var wrapperClassString = (0, classnames_1.default)("".concat(prefixCls, "-wrapper"), (_a = {},
        _a["".concat(prefixCls, "-wrapper-checked")] = radioProps.checked,
        _a["".concat(prefixCls, "-wrapper-disabled")] = radioProps.disabled,
        _a), className);
    return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    React.createElement("label", { className: wrapperClassString, style: style, onMouseEnter: props.onMouseEnter, onMouseLeave: props.onMouseLeave },
        React.createElement(RcCheckbox_1.default, __assign({}, radioProps, { type: "radio", prefixCls: prefixCls, ref: mergedRef })),
        children !== undefined ? React.createElement("span", null, children) : null));
};
var Radio = React.forwardRef(InternalRadio);
Radio.displayName = 'Radio';
exports.default = Radio;
