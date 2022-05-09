"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var classnames_1 = __importDefault(require("classnames"));
var react_1 = __importDefault(require("react"));
var responsiveObserve_1 = require("../_util/responsiveObserve");
var Item_1 = __importDefault(require("./Item"));
function List(_a) {
    var className = _a.className, children = _a.children;
    var prefixCls = (0, responsiveObserve_1.getPrefixCls)('list');
    var classString = (0, classnames_1.default)(prefixCls, {}, className);
    return react_1.default.createElement("ul", { className: classString }, children);
}
;
List.Item = Item_1.default;
exports.default = List;
