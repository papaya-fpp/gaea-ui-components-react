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
var RcCheckbox_1 = __importDefault(require("./RcCheckbox"));
var classnames_1 = __importDefault(require("classnames"));
var responsiveObserve_1 = require("../_util/responsiveObserve");
var devWarning_1 = __importDefault(require("../_util/devWarning"));
var Group_1 = require("./Group");
var InternalCheckbox = function (_a, ref) {
    var _b, _c;
    var customizePrefixCls = _a.prefixCls, className = _a.className, children = _a.children, _d = _a.indeterminate, indeterminate = _d === void 0 ? false : _d, style = _a.style, onMouseEnter = _a.onMouseEnter, onMouseLeave = _a.onMouseLeave, _e = _a.skipGroup, skipGroup = _e === void 0 ? false : _e, restProps = __rest(_a, ["prefixCls", "className", "children", "indeterminate", "style", "onMouseEnter", "onMouseLeave", "skipGroup"]);
    var checkboxGroup = react_1.default.useContext(Group_1.GroupContext);
    var prevValue = react_1.default.useRef(restProps.value);
    react_1.default.useEffect(function () {
        checkboxGroup === null || checkboxGroup === void 0 ? void 0 : checkboxGroup.registerValue(restProps.value);
        (0, devWarning_1.default)('checked' in restProps || !!checkboxGroup || !('value' in restProps), 'Checkbox', '`value` is not a valid prop, do you mean `checked`?');
    }, []);
    react_1.default.useEffect(function () {
        if (skipGroup) {
            return;
        }
        if (restProps.value !== prevValue.current) {
            checkboxGroup === null || checkboxGroup === void 0 ? void 0 : checkboxGroup.cancelValue(prevValue.current);
            checkboxGroup === null || checkboxGroup === void 0 ? void 0 : checkboxGroup.registerValue(restProps.value);
        }
        return function () { return checkboxGroup === null || checkboxGroup === void 0 ? void 0 : checkboxGroup.cancelValue(restProps.value); };
    }, [restProps.value]);
    var prefixCls = (0, responsiveObserve_1.getPrefixCls)('checkbox', customizePrefixCls);
    var checkboxProps = __assign({}, restProps);
    if (checkboxGroup && !skipGroup) {
        checkboxProps.onChange = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (restProps.onChange) {
                restProps.onChange.apply(restProps, args);
            }
            if (checkboxGroup.toggleOption) {
                checkboxGroup.toggleOption({ label: children, value: restProps.value });
            }
        };
        checkboxProps.name = checkboxGroup.name;
        checkboxProps.checked = checkboxGroup.value.indexOf(restProps.value) !== -1;
        checkboxProps.disabled = restProps.disabled || checkboxGroup.disabled;
    }
    var classString = (0, classnames_1.default)((_b = {},
        _b["".concat(prefixCls, "-wrapper")] = true,
        _b["".concat(prefixCls, "-wrapper-checked")] = checkboxProps.checked,
        _b["".concat(prefixCls, "-wrapper-disabled")] = checkboxProps.disabled,
        _b), className);
    var checkboxClass = (0, classnames_1.default)((_c = {},
        _c["".concat(prefixCls, "-indeterminate")] = indeterminate,
        _c));
    return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    react_1.default.createElement("label", { className: classString, style: style, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave },
        react_1.default.createElement(RcCheckbox_1.default, __assign({}, checkboxProps, { prefixCls: prefixCls, className: checkboxClass, ref: ref })),
        children !== undefined && react_1.default.createElement("span", null, children)));
};
var Checkbox = react_1.default.forwardRef(InternalCheckbox);
Checkbox.displayName = 'Checkbox';
exports.default = Checkbox;
