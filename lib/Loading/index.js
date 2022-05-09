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
var React = __importStar(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var responsiveObserve_1 = require("../_util/responsiveObserve");
var classnames_1 = __importDefault(require("classnames"));
var Icon_1 = __importDefault(require("../Icon"));
var Loading = function (_a) {
    var text = _a.text, _b = _a.loading, loading = _b === void 0 ? true : _b, _c = _a.fullScreen, fullScreen = _c === void 0 ? false : _c, _d = _a.opacity, opacity = _d === void 0 ? false : _d, className = _a.className, children = _a.children;
    var prefixCls = (0, responsiveObserve_1.getPrefixCls)('loading');
    var classes = (0, classnames_1.default)(prefixCls, className);
    var loadingClasses = (0, classnames_1.default)("".concat(prefixCls, "-wrapper"), {
        full: fullScreen,
        opacity: opacity
    });
    return (React.createElement("div", { className: classes },
        loading && (React.createElement("div", { className: loadingClasses },
            React.createElement(Icon_1.default, { className: "".concat(prefixCls, "-img"), name: "Spinnerjiazai1", size: 20 }),
            React.createElement("span", { className: "".concat(prefixCls, "-text") }, text))),
        children));
};
var start = function (text) {
    var div = document.createElement('div');
    document.body.appendChild(div);
    // 关闭
    var destroy = function () {
        var unmountResult = react_dom_1.default.unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div);
        }
    };
    var render = function () {
        react_dom_1.default.render(React.createElement(Loading, { loading: true, text: text, fullScreen: true }), div);
    };
    render();
    return {
        destroy: destroy
    };
};
Loading.start = start;
exports.default = Loading;
