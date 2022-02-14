"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var responsiveObserve_1 = require("../_util/responsiveObserve");
var Icon = function (_a) {
    var name = _a.name, onClick = _a.onClick, _b = _a.className, className = _b === void 0 ? "" : _b, _c = _a.color, color = _c === void 0 ? "" : _c, _d = _a.size, size = _d === void 0 ? "" : _d;
    var prefixCls = (0, responsiveObserve_1.getPrefixCls)('icon');
    var classes = (0, classnames_1.default)('icon', prefixCls, className);
    return (typeof name === 'string' ?
        react_1.default.createElement("svg", { onClick: onClick, className: classes, style: {
                color: color,
                fontSize: size + "px"
            }, "aria-hidden": "true" },
            react_1.default.createElement("use", { xlinkHref: "#icon-".concat(name) }))
        :
            name);
};
exports.default = Icon;
