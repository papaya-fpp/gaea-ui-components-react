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
var classnames_1 = __importDefault(require("classnames"));
var responsiveObserve_1 = require("../_util/responsiveObserve");
var BreadcrumbItem_1 = __importDefault(require("./BreadcrumbItem"));
var Breadcrumb = function (_a) {
    var _b = _a.separator, separator = _b === void 0 ? '/' : _b, style = _a.style, className = _a.className, children = _a.children, others = __rest(_a, ["separator", "style", "className", "children"]);
    var crumbs;
    var prefixCls = (0, responsiveObserve_1.getPrefixCls)('breadcrumb');
    if (children) {
        crumbs = React.Children.map(children, function (child, index) {
            return React.cloneElement(child, {
                separator: separator,
                key: index,
            });
        });
    }
    var breadcrumbClassName = (0, classnames_1.default)(prefixCls, {
    // [`${prefixCls}-rtl`]: direction === 'rtl',
    }, className);
    return (React.createElement("div", __assign({ className: breadcrumbClassName, style: style }, others), crumbs));
};
Breadcrumb.Item = BreadcrumbItem_1.default;
exports.default = Breadcrumb;
