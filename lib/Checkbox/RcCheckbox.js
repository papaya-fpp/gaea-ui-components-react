"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
// eslint-disable-next-line import/no-extraneous-dependencies
var react_1 = __importStar(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var Checkbox = /** @class */ (function (_super) {
    __extends(Checkbox, _super);
    function Checkbox(props) {
        var _this = _super.call(this, props) || this;
        _this.handleChange = function (e) {
            var _a = _this.props, disabled = _a.disabled, onChange = _a.onChange;
            if (disabled) {
                return;
            }
            if (!('checked' in _this.props)) {
                _this.setState({
                    checked: e.target.checked,
                });
            }
            if (onChange) {
                onChange({
                    target: __assign(__assign({}, _this.props), { checked: e.target.checked }),
                    stopPropagation: function () {
                        e.stopPropagation();
                    },
                    preventDefault: function () {
                        e.preventDefault();
                    },
                    nativeEvent: e.nativeEvent,
                });
            }
        };
        _this.saveInput = function (node) {
            _this.input = node;
        };
        var checked = 'checked' in props ? props.checked : props.defaultChecked;
        _this.state = {
            checked: checked,
        };
        return _this;
    }
    Checkbox.getDerivedStateFromProps = function (props, state) {
        if ('checked' in props) {
            return __assign(__assign({}, state), { checked: props.checked });
        }
        return null;
    };
    Checkbox.prototype.focus = function () {
        this.input.focus();
    };
    Checkbox.prototype.blur = function () {
        this.input.blur();
    };
    Checkbox.prototype.render = function () {
        var _a;
        var _b = this.props, prefixCls = _b.prefixCls, className = _b.className, style = _b.style, name = _b.name, id = _b.id, type = _b.type, disabled = _b.disabled, readOnly = _b.readOnly, tabIndex = _b.tabIndex, onClick = _b.onClick, onFocus = _b.onFocus, onBlur = _b.onBlur, onKeyDown = _b.onKeyDown, onKeyPress = _b.onKeyPress, onKeyUp = _b.onKeyUp, autoFocus = _b.autoFocus, value = _b.value, required = _b.required, others = __rest(_b, ["prefixCls", "className", "style", "name", "id", "type", "disabled", "readOnly", "tabIndex", "onClick", "onFocus", "onBlur", "onKeyDown", "onKeyPress", "onKeyUp", "autoFocus", "value", "required"]);
        var globalProps = Object.keys(others).reduce(function (prev, key) {
            if (key.substr(0, 5) === 'aria-' || key.substr(0, 5) === 'data-' || key === 'role') {
                // eslint-disable-next-line no-param-reassign
                prev[key] = others[key];
            }
            return prev;
        }, {});
        var checked = this.state.checked;
        var classString = (0, classnames_1.default)(prefixCls, className, (_a = {},
            _a["".concat(prefixCls, "-checked")] = checked,
            _a["".concat(prefixCls, "-disabled")] = disabled,
            _a));
        return (react_1.default.createElement("span", { className: classString, style: style },
            react_1.default.createElement("input", __assign({ name: name, id: id, type: type, required: required, readOnly: readOnly, disabled: disabled, tabIndex: tabIndex, className: "".concat(prefixCls, "-input"), checked: !!checked, onClick: onClick, onFocus: onFocus, onBlur: onBlur, onKeyUp: onKeyUp, onKeyDown: onKeyDown, onKeyPress: onKeyPress, onChange: this.handleChange, autoFocus: autoFocus, ref: this.saveInput, value: value }, globalProps)),
            react_1.default.createElement("span", { className: "".concat(prefixCls, "-inner") })));
    };
    Checkbox.defaultProps = {
        prefixCls: 'rc-checkbox',
        className: '',
        style: {},
        type: 'checkbox',
        defaultChecked: false,
        onFocus: function () { },
        onBlur: function () { },
        onChange: function () { },
        onKeyDown: function () { },
        onKeyPress: function () { },
        onKeyUp: function () { },
    };
    return Checkbox;
}(react_1.Component));
exports.default = Checkbox;
