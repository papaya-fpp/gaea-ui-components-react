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
exports.SiderContext = void 0;
var react_1 = __importStar(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var responsiveObserve_1 = require("../_util/responsiveObserve");
var isNumber_1 = __importDefault(require("../_util/isNumber"));
exports.SiderContext = react_1.default.createContext({});
var Sider = function (props) {
    var _a;
    var props_collapsed = props.collapsed, _b = props.defaultCollapsed, defaultCollapsed = _b === void 0 ? false : _b, _c = props.width, width = _c === void 0 ? 200 : _c, _d = props.theme, theme = _d === void 0 ? 'dark' : _d, onCollapse = props.onCollapse, className = props.className, style = props.style, children = props.children, others = __rest(props, ["collapsed", "defaultCollapsed", "width", "theme", "onCollapse", "className", "style", "children"]);
    var _e = (0, react_1.useState)('collapsed' in props ? props.collapsed : defaultCollapsed), collapsed = _e[0], setCollapsed = _e[1];
    (0, react_1.useEffect)(function () {
        if ('collapsed' in props) {
            setCollapsed(props.collapsed);
        }
    }, [props.collapsed]);
    var prefixCls = (0, responsiveObserve_1.getPrefixCls)('layout-sider');
    var classes = (0, classnames_1.default)(prefixCls, "".concat(prefixCls, "-").concat(theme), (_a = {},
        _a["".concat(prefixCls, "-collapsed")] = !!collapsed,
        _a), className);
    var rawWidth = collapsed ? 80 : width;
    var siderWidth = (0, isNumber_1.default)(rawWidth) ? "".concat(rawWidth, "px") : String(rawWidth);
    var silderStyle = __assign(__assign({}, style), { flex: "0 0 ".concat(siderWidth), maxWidth: siderWidth, minWidth: siderWidth, width: siderWidth });
    var contextValue = (0, react_1.useMemo)(function () { return ({
        siderCollapsed: collapsed,
    }); }, [collapsed]);
    return (react_1.default.createElement(exports.SiderContext.Provider, { value: contextValue },
        react_1.default.createElement("aside", __assign({}, others, { className: classes, style: silderStyle }),
            react_1.default.createElement("div", { className: "".concat(prefixCls, "-children") }, children))));
};
Sider.displayName = 'Sider';
exports.default = Sider;
