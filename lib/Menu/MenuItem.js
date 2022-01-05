"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var MenuContext_1 = __importDefault(require("./MenuContext"));
var responsiveObserve_1 = require("../_util/responsiveObserve");
var Icon_1 = __importDefault(require("../Icon"));
var MenuItem = function (props) {
    var _a;
    var _b = react_1.default.useContext(MenuContext_1.default), firstLevel = _b.firstLevel, inlineCollapsed = _b.inlineCollapsed, selectedKeys = _b.selectedKeys;
    var icon = props.icon, children = props.children, value = props.value, disabled = props.disabled, onChange = props.onChange;
    var prefixCls = (0, responsiveObserve_1.getPrefixCls)('menu-item');
    var classes = (0, classnames_1.default)(prefixCls, (_a = {},
        _a["".concat(prefixCls, "-disabled")] = disabled,
        _a["".concat(prefixCls, "-no-first")] = !firstLevel,
        _a["".concat(prefixCls, "-select")] = selectedKeys === value,
        _a));
    var clickHandle = function () {
        if (disabled)
            return;
        onChange && onChange('item', value);
    };
    return (react_1.default.createElement("li", { className: classes, onClick: clickHandle },
        react_1.default.createElement("div", { className: "".concat(prefixCls, "-container") },
            firstLevel && icon && react_1.default.createElement(Icon_1.default, { name: icon }),
            !inlineCollapsed && react_1.default.createElement("span", { className: "".concat(prefixCls, "-title-content") }, children))));
};
exports.default = MenuItem;
