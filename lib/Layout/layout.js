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
exports.Content = exports.Footer = exports.Header = void 0;
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var responsiveObserve_1 = require("../_util/responsiveObserve");
function generator(_a) {
    var suffixCls = _a.suffixCls, tagName = _a.tagName, displayName = _a.displayName;
    return function (BasicComponent) {
        var Adapter = function (props) {
            var prefixCls = (0, responsiveObserve_1.getPrefixCls)(suffixCls);
            return react_1.default.createElement(BasicComponent, __assign({ prefixCls: prefixCls, tagName: tagName }, props));
        };
        Adapter.displayName = displayName;
        return Adapter;
    };
}
var Basic = function (props) {
    var prefixCls = props.prefixCls, className = props.className, children = props.children, tagName = props.tagName, others = __rest(props, ["prefixCls", "className", "children", "tagName"]);
    var classString = (0, classnames_1.default)(prefixCls, className);
    return react_1.default.createElement(tagName, __assign({ className: classString }, others), children);
};
var BasicLayout = function (props) {
    var _a;
    var prefixCls = props.prefixCls, className = props.className, children = props.children, hasSider = props.hasSider, Tag = props.tagName, others = __rest(props, ["prefixCls", "className", "children", "hasSider", "tagName"]);
    var classString = (0, classnames_1.default)(prefixCls, (_a = {},
        _a["".concat(prefixCls, "-has-sider")] = hasSider,
        _a), className);
    return (react_1.default.createElement(Tag, __assign({ className: classString }, others), children));
};
var Layout = generator({
    suffixCls: 'layout',
    tagName: 'section',
    displayName: 'Layout',
})(BasicLayout);
var Header = generator({
    suffixCls: 'layout-header',
    tagName: 'header',
    displayName: 'Header',
})(Basic);
exports.Header = Header;
var Footer = generator({
    suffixCls: 'layout-footer',
    tagName: 'footer',
    displayName: 'Footer',
})(Basic);
exports.Footer = Footer;
var Content = generator({
    suffixCls: 'layout-content',
    tagName: 'main',
    displayName: 'Content',
})(Basic);
exports.Content = Content;
exports.default = Layout;
