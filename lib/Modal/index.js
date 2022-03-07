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
var react_1 = __importStar(require("react"));
var scrollControl_1 = require("../_util/scrollControl");
var index_1 = __importDefault(require("../Button/index"));
var react_dom_1 = __importDefault(require("react-dom"));
var Icon_1 = __importDefault(require("../Icon"));
var responsiveObserve_1 = require("../_util/responsiveObserve");
var Modal = function (_a) {
    var visible = _a.visible, _b = _a.wrapClassName, wrapClassName = _b === void 0 ? "" : _b, width = _a.width, title = _a.title, _c = _a.cancelText, cancelText = _c === void 0 ? "Cancel" : _c, _d = _a.okText, okText = _d === void 0 ? "OK" : _d, children = _a.children, onCancel = _a.onCancel, onOK = _a.onOK, _e = _a.closable, closable = _e === void 0 ? false : _e, footer = _a.footer, _f = _a.maskClosable, maskClosable = _f === void 0 ? true : _f, _g = _a.okButtonBgColor, okButtonBgColor = _g === void 0 ? '#6554C0' : _g, _h = _a.cancelButtonBgColor, cancelButtonBgColor = _h === void 0 ? '#FBFDFF' : _h;
    var prefixCls = (0, responsiveObserve_1.getPrefixCls)("modal");
    var _j = (0, react_1.useState)(null), target = _j[0], setTarget = _j[1];
    var style = (0, react_1.useState)(width ? { width: width + "px" } : {})[0];
    // 点击关闭
    var handleCancel = function () { return onCancel && onCancel(); };
    // mask 点击关闭
    var maskClosableFn = function () { return maskClosable && handleCancel(); };
    // 阻止冒泡
    var stopPropagationFn = function (e) { return e.stopPropagation(); };
    // 点击确定
    var handleOK = function () { return onOK && onOK(); };
    (0, react_1.useEffect)(function () {
        setTarget(document.getElementById("fpp-modal-root"));
    }, []);
    (0, react_1.useEffect)(function () {
        visible ? (0, scrollControl_1.fixedScroll)() : (0, scrollControl_1.resetScroll)();
    }, [visible]);
    var getModalDOM = function () {
        return (react_1.default.createElement("div", { className: "".concat(prefixCls) },
            react_1.default.createElement("div", { className: "".concat(prefixCls, "-mask") }),
            react_1.default.createElement("div", { className: "".concat(prefixCls, "-warp ").concat(wrapClassName), onClick: maskClosableFn },
                react_1.default.createElement("div", { className: "".concat(prefixCls, "-content"), style: style, onClick: stopPropagationFn },
                    react_1.default.createElement("div", { className: "".concat(prefixCls, "-header") },
                        title && react_1.default.createElement("div", { className: "".concat(prefixCls, "-title") }, title),
                        closable && (react_1.default.createElement("div", { className: "".concat(prefixCls, "-close-wrapper"), onClick: handleCancel },
                            react_1.default.createElement(Icon_1.default, { color: "rgba(94, 108, 132, 0.49)", name: "a-Crosssign" })))),
                    react_1.default.createElement("div", { className: "".concat(prefixCls, "-body") }, children),
                    footer || footer === null ? (footer) : (react_1.default.createElement("div", { className: "".concat(prefixCls, "-footer") },
                        react_1.default.createElement(index_1.default, { backgroundColor: cancelButtonBgColor, onClick: handleCancel }, cancelText),
                        react_1.default.createElement(index_1.default, { backgroundColor: okButtonBgColor, primary: true, onClick: handleOK }, okText)))))));
    };
    var creatdiv = function () {
        //创建一个div
        var div = document.createElement('div');
        div.id = "fpp-modal-root"; //设置div的属性
        var bo = document.body; //获取body对象.
        //动态插入到body中
        bo.insertBefore(div, bo.lastChild);
    };
    var modalRoot = document.getElementById('fpp-modal-root');
    if (!modalRoot) {
        creatdiv();
    }
    var wrapper = document.getElementById('fpp-modal-root');
    if (wrapper && visible && typeof window !== 'undefined' && target) {
        return react_dom_1.default.createPortal(getModalDOM(), wrapper);
    }
    return null;
};
var confirm = function (props) {
    var content = props.content, onCancel = props.onCancel, onOK = props.onOK, restProps = __rest(props, ["content", "onCancel", "onOK"]);
    var div = document.createElement('div');
    document.body.appendChild(div);
    // 关闭
    var destroy = function () {
        var unmountResult = react_dom_1.default.unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div);
        }
    };
    var handleCancel = function () {
        onCancel && onCancel();
        destroy();
    };
    var handleOk = function () {
        onOK && onOK();
        destroy();
    };
    var currentConfig = Object.assign({
        visible: true,
        children: content,
        onCancel: handleCancel,
        onOK: handleOk
    }, restProps);
    var render = function (config) {
        react_dom_1.default.render(react_1.default.createElement(Modal, __assign({}, config)), div);
    };
    render(currentConfig);
    return {
        destroy: destroy
    };
};
Modal.confirm = confirm;
exports.default = Modal;
