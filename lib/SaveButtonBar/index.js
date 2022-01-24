"use strict";
/**
 * @name 页面保存按钮
 * @param isShow    保存bar是否显示
 * @param handleSave  保存按钮回调
 * @param handleCancel 取消按钮回调
 * @param loading 保存按钮的loading效果
 * @param cancelText 取消按钮文案
 * @param saveText 保存按钮文案
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveButtonBar = void 0;
var react_1 = __importDefault(require("react"));
var index_1 = __importDefault(require("../Button/index"));
var responsiveObserve_1 = require("../_util/responsiveObserve");
var SaveButtonBar = function (props) {
    var handleCancel = props.handleCancel, handleSave = props.handleSave, _a = props.isShow, isShow = _a === void 0 ? true : _a, _b = props.loading, loading = _b === void 0 ? false : _b, _c = props.cancelText, cancelText = _c === void 0 ? '取消' : _c, _d = props.saveText, saveText = _d === void 0 ? '确定' : _d;
    var prefixCls = (0, responsiveObserve_1.getPrefixCls)('save-button-bar');
    return (react_1.default.createElement(react_1.default.Fragment, null, isShow && (react_1.default.createElement("div", { className: prefixCls },
        react_1.default.createElement("div", { className: "".concat(prefixCls, "-button") },
            react_1.default.createElement(index_1.default, { onClick: handleCancel }, cancelText),
            react_1.default.createElement(index_1.default, { className: "margin-left-20", loading: loading, primary: true, onClick: handleSave }, saveText))))));
};
exports.SaveButtonBar = SaveButtonBar;
exports.default = exports.SaveButtonBar;
