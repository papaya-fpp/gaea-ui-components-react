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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var MenuContext_1 = __importDefault(require("./MenuContext"));
var responsiveObserve_1 = require("../_util/responsiveObserve");
var Icon_1 = __importDefault(require("../Icon"));
var SubMenu = function (props) {
    var _a, _b;
    var context = react_1.default.useContext(MenuContext_1.default);
    var firstLevel = context.firstLevel, inlineCollapsed = context.inlineCollapsed, openKeys = context.openKeys, selectedKeys = context.selectedKeys;
    var icon = props.icon, title = props.title, children = props.children, value = props.value, disabled = props.disabled, onChange = props.onChange;
    var childrenLength = 0;
    if (Array.isArray(children)) {
        childrenLength = children.length;
    }
    else {
        childrenLength = children ? 1 : 0;
    }
    var totalHeight = childrenLength * 36;
    var open = openKeys.some(function (k) { return k === value; }) && !disabled;
    var _c = react_1.default.useState(false), childrenSelect = _c[0], setChildrenSelect = _c[1];
    var ulRef = react_1.default.useRef(null);
    var prefixCls = (0, responsiveObserve_1.getPrefixCls)('submenu');
    var classes = (0, classnames_1.default)(prefixCls, (_a = {},
        _a["".concat(prefixCls, "-disabled")] = disabled,
        _a["".concat(prefixCls, "-open")] = open && !disabled,
        _a["".concat(prefixCls, "-light")] = open || childrenSelect,
        _a));
    var selectHandle = function (type, key) {
        onChange && onChange(type, key);
    };
    var openChangeHandel = function () {
        if (disabled)
            return;
        onChange && onChange('sub', value);
    };
    var renderItem = function () {
        return react_1.default.Children.map(children, function (child) {
            if (!child)
                return null;
            var childrenProps = __assign(__assign({}, child.props), { value: child.key, onChange: selectHandle });
            return react_1.default.cloneElement(child, childrenProps);
        });
    };
    var contextValue = react_1.default.useMemo(function () { return (__assign(__assign({}, context), { firstLevel: false })); }, [context]);
    var subListclasses = (0, classnames_1.default)("".concat(prefixCls, "-list"), (_b = {},
        _b["".concat(prefixCls, "-hidden")] = !open,
        _b));
    react_1.default.useEffect(function () {
        if (ulRef.current) {
            if (open) {
                ulRef.current.style.height = totalHeight + 'px';
            }
            else {
                ulRef.current.style.height = 0 + 'px';
            }
        }
    }, [open]);
    react_1.default.useEffect(function () {
        if (Array.isArray(children)) {
            setChildrenSelect(children.some(function (item) { return item.key === selectedKeys; }));
        }
        else {
            setChildrenSelect(children.key === selectedKeys);
        }
    }, [selectedKeys]);
    return (react_1.default.createElement(MenuContext_1.default.Provider, { value: contextValue },
        react_1.default.createElement("li", { className: classes },
            react_1.default.createElement("div", { className: "".concat(prefixCls, "-container"), onClick: openChangeHandel },
                react_1.default.createElement("div", { className: "".concat(prefixCls, "-title-container") },
                    firstLevel && icon && react_1.default.createElement(Icon_1.default, { name: icon }),
                    !inlineCollapsed && react_1.default.createElement("span", { className: "".concat(prefixCls, "-title-content") }, title),
                    !inlineCollapsed && react_1.default.createElement(Icon_1.default, { className: "drop-down", name: "Drop-down" }))),
            react_1.default.createElement("ul", { ref: ulRef, className: subListclasses }, renderItem()))));
};
exports.default = SubMenu;
