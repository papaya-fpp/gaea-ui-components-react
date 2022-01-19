"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var classnames_1 = __importDefault(require("classnames"));
var react_1 = __importDefault(require("react"));
function ListItem(_a) {
    var className = _a.className, prefixCls = _a.prefixCls, children = _a.children;
    var classString = (0, classnames_1.default)(prefixCls, 'gaea-ui__list-item-wrapper', {}, className);
    return react_1.default.createElement("li", { className: classString }, children);
}
;
exports.default = ListItem;
