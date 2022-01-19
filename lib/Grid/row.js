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
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var responsiveObserve_1 = require("../_util/responsiveObserve");
var useBreakpoint_1 = __importDefault(require("../_util/hook/useBreakpoint"));
var RowContext_1 = __importDefault(require("./RowContext"));
var RowAligns = (0, responsiveObserve_1.tuple)('top', 'middle', 'bottom', 'stretch');
var RowJustify = (0, responsiveObserve_1.tuple)('start', 'end', 'center', 'space-around', 'space-between');
var Row = react_1.default.forwardRef(function (props, ref) {
    var _a;
    var justify = props.justify, align = props.align, className = props.className, style = props.style, children = props.children, _b = props.gutter, gutter = _b === void 0 ? 0 : _b, wrap = props.wrap, others = __rest(props, ["justify", "align", "className", "style", "children", "gutter", "wrap"]);
    var screens = (0, useBreakpoint_1.default)();
    var getGutter = function () {
        var results = [0, 0];
        var normalizedGutter = Array.isArray(gutter) ? gutter : [gutter, 0];
        normalizedGutter.forEach(function (g, index) {
            if (typeof g === 'object') {
                for (var i = 0; i < responsiveObserve_1.responsiveArray.length; i++) {
                    var breakpoint = responsiveObserve_1.responsiveArray[i];
                    if (screens[breakpoint] && g[breakpoint] !== undefined) {
                        results[index] = g[breakpoint];
                        break;
                    }
                }
            }
            else {
                results[index] = g || 0;
            }
        });
        return results;
    };
    var prefixCls = (0, responsiveObserve_1.getPrefixCls)('row');
    var gutters = getGutter();
    var classes = (0, classnames_1.default)(prefixCls, (_a = {},
        _a["".concat(prefixCls, "-no-wrap")] = wrap === false,
        _a["".concat(prefixCls, "-").concat(justify)] = justify,
        _a["".concat(prefixCls, "-").concat(align)] = align,
        _a), className);
    // Add gutter related style
    var rowStyle = {};
    var horizontalGutter = gutters[0] > 0 ? gutters[0] / -2 : undefined;
    if (horizontalGutter) {
        rowStyle.marginLeft = horizontalGutter;
        rowStyle.marginRight = horizontalGutter;
    }
    rowStyle.rowGap = gutters[1];
    var rowContext = react_1.default.useMemo(function () { return ({ gutter: gutters, wrap: wrap }); }, [
        gutters,
        wrap
    ]);
    return (react_1.default.createElement(RowContext_1.default.Provider, { value: rowContext },
        react_1.default.createElement("div", __assign({}, others, { className: classes, style: __assign(__assign({}, rowStyle), style), ref: ref }), children)));
});
Row.displayName = 'Row';
exports.default = Row;
