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
var RowContext_1 = __importDefault(require("./RowContext"));
var responsiveObserve_1 = require("../_util/responsiveObserve");
function parseFlex(flex) {
    if (typeof flex === 'number') {
        return "".concat(flex, " ").concat(flex, " auto");
    }
    if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) {
        return "0 0 ".concat(flex);
    }
    return flex;
}
var sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
var Col = React.forwardRef(function (props, ref) {
    var _a;
    var _b = React.useContext(RowContext_1.default), gutter = _b.gutter, wrap = _b.wrap;
    var span = props.span, order = props.order, offset = props.offset, push = props.push, pull = props.pull, className = props.className, children = props.children, flex = props.flex, style = props.style, others = __rest(props, ["span", "order", "offset", "push", "pull", "className", "children", "flex", "style"]);
    var prefixCls = (0, responsiveObserve_1.getPrefixCls)('col');
    var sizeClassObj = {};
    sizes.forEach(function (size) {
        var _a;
        var sizeProps = {};
        var propSize = props[size];
        if (typeof propSize === 'number') {
            sizeProps.span = propSize;
        }
        else if (typeof propSize === 'object') {
            sizeProps = propSize || {};
        }
        delete others[size];
        sizeClassObj = __assign(__assign({}, sizeClassObj), (_a = {}, _a["".concat(prefixCls, "-").concat(size, "-").concat(sizeProps.span)] = sizeProps.span !== undefined, _a["".concat(prefixCls, "-").concat(size, "-order-").concat(sizeProps.order)] = sizeProps.order || sizeProps.order === 0, _a["".concat(prefixCls, "-").concat(size, "-offset-").concat(sizeProps.offset)] = sizeProps.offset || sizeProps.offset === 0, _a["".concat(prefixCls, "-").concat(size, "-push-").concat(sizeProps.push)] = sizeProps.push || sizeProps.push === 0, _a["".concat(prefixCls, "-").concat(size, "-pull-").concat(sizeProps.pull)] = sizeProps.pull || sizeProps.pull === 0, _a));
    });
    var classes = (0, classnames_1.default)(prefixCls, (_a = {},
        _a["".concat(prefixCls, "-").concat(span)] = span !== undefined,
        _a["".concat(prefixCls, "-order-").concat(order)] = order,
        _a["".concat(prefixCls, "-offset-").concat(offset)] = offset,
        _a["".concat(prefixCls, "-push-").concat(push)] = push,
        _a["".concat(prefixCls, "-pull-").concat(pull)] = pull,
        _a), className, sizeClassObj);
    var mergedStyle = {};
    // Horizontal gutter use padding
    if (gutter && gutter[0] > 0) {
        var horizontalGutter = gutter[0] / 2;
        mergedStyle.paddingLeft = horizontalGutter;
        mergedStyle.paddingRight = horizontalGutter;
    }
    if (flex) {
        mergedStyle.flex = parseFlex(flex);
        if (wrap === false && !mergedStyle.minWidth) {
            mergedStyle.minWidth = 0;
        }
    }
    return (React.createElement("div", __assign({}, others, { style: __assign(__assign({}, mergedStyle), style), className: classes, ref: ref }), children));
});
Col.displayName = 'Col';
exports.default = Col;
