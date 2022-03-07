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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alert = void 0;
var react_1 = __importStar(require("react"));
var responsiveObserve_1 = require("../_util/responsiveObserve");
var Icon_1 = __importDefault(require("../Icon"));
var Alert = function (props) {
    var icon = props.icon, title = props.title, content = props.content, _a = props.border, border = _a === void 0 ? true : _a, _b = props.visible, visible = _b === void 0 ? true : _b, _c = props.type, type = _c === void 0 ? 'info' : _c;
    var prefixCls = (0, responsiveObserve_1.getPrefixCls)('alert');
    var _d = (0, react_1.useState)(visible), isShow = _d[0], setIsShow = _d[1];
    (0, react_1.useEffect)(function () {
        setIsShow(visible);
    }, [visible]);
    return (react_1.default.createElement(react_1.default.Fragment, null, isShow && (react_1.default.createElement("div", { className: "".concat(prefixCls) }, border ? (react_1.default.createElement("div", { className: "".concat(prefixCls, "-section ").concat(prefixCls, "-boder ").concat(prefixCls, "-").concat(type) },
        react_1.default.createElement("div", { className: "".concat(prefixCls, "-icon") }, icon ? icon : (react_1.default.createElement("div", null,
            type === 'info' && (react_1.default.createElement(Icon_1.default, { size: 24, name: "tishi-lanse" })),
            type === 'success' && (react_1.default.createElement(Icon_1.default, { size: 24, name: "tishi-lvse" })),
            type === 'warning' && (react_1.default.createElement(Icon_1.default, { size: 24, name: "tishi-huangse" })),
            type === 'err' && (react_1.default.createElement(Icon_1.default, { size: 24, name: "tishi-hongse" }))))),
        react_1.default.createElement("div", null,
            title && (react_1.default.createElement("div", { className: "".concat(prefixCls, "-title") }, title)),
            content && (react_1.default.createElement("div", { className: "".concat(prefixCls, "-content") }, content))))) : (react_1.default.createElement("div", { className: "".concat(prefixCls, "-section ").concat(prefixCls, "-no-boder ").concat(prefixCls, "-").concat(type) },
        react_1.default.createElement("div", { className: "".concat(prefixCls, "-icon") }, icon ? icon : (react_1.default.createElement("div", null,
            type === 'info' && (react_1.default.createElement(Icon_1.default, { size: 20, name: "tishi-lanse" })),
            type === 'success' && (react_1.default.createElement(Icon_1.default, { size: 20, name: "tishi-lvse" })),
            type === 'warning' && (react_1.default.createElement(Icon_1.default, { size: 20, name: "tishi-huangse" })),
            type === 'err' && (react_1.default.createElement(Icon_1.default, { size: 20, name: "tishi-hongse" }))))),
        react_1.default.createElement("div", null,
            title && (react_1.default.createElement("div", { className: "".concat(prefixCls, "-title") }, title)),
            content && (react_1.default.createElement("div", { className: "".concat(prefixCls, "-content") }, content)))))))));
};
exports.Alert = Alert;
exports.default = exports.Alert;
