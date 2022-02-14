"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var responsiveObserve_1 = require("../_util/responsiveObserve");
var Card = function (_a) {
    var title = _a.title, extra = _a.extra, children = _a.children, footer = _a.footer, expandable = _a.expandable;
    var prefixCls = (0, responsiveObserve_1.getPrefixCls)("card");
    var _b = (0, react_1.useState)(true), fold = _b[0], setFold = _b[1];
    var handleFold = function () {
        setFold(!fold);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: prefixCls },
            (title || extra) && (react_1.default.createElement("div", { className: "".concat(prefixCls, "-header") },
                react_1.default.createElement("div", { className: "".concat(prefixCls, "-title") }, title),
                extra && react_1.default.createElement("div", { className: "".concat(prefixCls, "-extra") }, extra))),
            react_1.default.createElement("div", { className: "".concat(prefixCls, "-body ").concat(fold && expandable ? "".concat(prefixCls, "-fold") : "") }, children),
            expandable && (react_1.default.createElement("div", { onClick: handleFold }, fold ? (react_1.default.createElement("div", { className: "".concat(prefixCls, "-fold-btn") }, "\u5C55\u5F00")) : (react_1.default.createElement("div", { className: "".concat(prefixCls, "-fold-btn") }, "\u6536\u8D77")))),
            footer && react_1.default.createElement("div", { className: "".concat(prefixCls, "-footer") }, footer))));
};
exports.default = Card;
