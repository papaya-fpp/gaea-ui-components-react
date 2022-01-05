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
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var MenuContext_1 = __importDefault(require("./MenuContext"));
var Sider_1 = require("../Layout/Sider");
var responsiveObserve_1 = require("../_util/responsiveObserve");
var SubMenu_1 = __importDefault(require("./SubMenu"));
var MenuItem_1 = __importDefault(require("./MenuItem"));
var Divider_1 = __importDefault(require("./Divider"));
var InternalMenu = function (props) {
    var _a;
    var collapsed = props.collapsed, _b = props.multiple, multiple = _b === void 0 ? false : _b, _c = props.theme, theme = _c === void 0 ? 'dark' : _c, className = props.className, children = props.children, defaultOpenKeys = props.defaultOpenKeys, defaultSelectedKeys = props.defaultSelectedKeys, onSelect = props.onSelect, onOpenChange = props.onOpenChange;
    var initKeys = props.selectedKeys || defaultOpenKeys;
    var initOpenKeys = props.openKeys || defaultOpenKeys || [];
    var _d = react_1.default.useState(initKeys || ''), selectedKeys = _d[0], set_selectedKeys = _d[1];
    var _e = react_1.default.useState(initOpenKeys), openKeys = _e[0], set_openKeys = _e[1];
    var prefixCls = (0, responsiveObserve_1.getPrefixCls)('menu');
    var classes = (0, classnames_1.default)(prefixCls, "".concat(prefixCls, "-").concat(theme), (_a = {},
        _a["".concat(prefixCls, "-collapsed")] = !!collapsed,
        _a), className);
    var selectHandle = function (type, key) {
        if (type === 'item') {
            !props.selectedKeys && set_selectedKeys(key);
            onSelect && onSelect(key);
        }
        else {
            var o_k = __spreadArray([], openKeys, true);
            var index = o_k.findIndex(function (k) { return k === key; });
            if (index > -1) {
                o_k.splice(index, 1);
            }
            else {
                o_k.push(key);
            }
            !props.openKeys && set_openKeys(o_k);
            onOpenChange && onOpenChange(o_k);
        }
    };
    var renderItem = function () {
        return react_1.default.Children.map(children, function (child) {
            if (!child)
                return null;
            var childrenProps = __assign(__assign({}, child.props), { value: child.key, onChange: selectHandle });
            return react_1.default.cloneElement(child, childrenProps);
        });
    };
    react_1.default.useEffect(function () {
        props.selectedKeys && set_selectedKeys(props.selectedKeys);
    }, [props.selectedKeys]);
    react_1.default.useEffect(function () {
        props.openKeys && set_selectedKeys(props.openKeys);
    }, [props.openKeys]);
    var contextValue = react_1.default.useMemo(function () { return ({
        inlineCollapsed: collapsed || false,
        firstLevel: true,
        selectedKeys: selectedKeys,
        openKeys: openKeys || []
    }); }, [collapsed, selectedKeys, openKeys]);
    return (react_1.default.createElement(MenuContext_1.default.Provider, { value: contextValue },
        react_1.default.createElement("ul", { className: classes }, renderItem())));
};
var Menu = function (props) {
    var inlineCollapsed = props.inlineCollapsed, other = __rest(props, ["inlineCollapsed"]);
    var siderCollapsed = react_1.default.useContext(Sider_1.SiderContext).siderCollapsed;
    var collapsed = siderCollapsed !== undefined ? siderCollapsed : inlineCollapsed;
    return react_1.default.createElement(InternalMenu, __assign({}, other, { collapsed: collapsed }));
};
Menu.Item = MenuItem_1.default;
Menu.SubMenu = SubMenu_1.default;
Menu.Divider = Divider_1.default;
exports.default = Menu;
