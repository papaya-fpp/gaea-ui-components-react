"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var responsiveObserve_1 = require("../_util/responsiveObserve");
var Option = function (_a) {
    var children = _a.children, active = _a.active, value = _a.value, onChange = _a.onChange;
    var prefixCls = (0, responsiveObserve_1.getPrefixCls)('select');
    var changeItem = function () {
        onChange(value, children);
    };
    return (react_1.default.createElement("div", { className: "".concat(prefixCls, "-option_item ").concat(active === value ? 'active' : ''), onMouseDown: changeItem }, children));
    // return <div className={`option_item ${active === value? 'active' : ''}`} onTouchStart={changeItem} onMouseDown={changeItem}>{children}</div>
};
exports.default = Option;
