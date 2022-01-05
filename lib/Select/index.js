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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var Option_1 = __importDefault(require("./Option"));
var Icon_1 = __importDefault(require("../Icon"));
var responsiveObserve_1 = require("../_util/responsiveObserve");
var defaultFilter = function (inputValue, option) {
    return option.value.indexOf(inputValue) > -1;
};
var Select = function (_a) {
    var label = _a.label, _b = _a.placeholder, placeholder = _b === void 0 ? '' : _b, value = _a.value, onChange = _a.onChange, _c = _a.allowClear, allowClear = _c === void 0 ? false : _c, showSearch = _a.showSearch, className = _a.className, _d = _a.filterOption, filterOption = _d === void 0 ? defaultFilter : _d, onBlur = _a.onBlur, onFocus = _a.onFocus, children = _a.children;
    var prefixCls = (0, responsiveObserve_1.getPrefixCls)('select');
    var _e = (0, react_1.useState)(value), val = _e[0], setVal = _e[1];
    var _f = (0, react_1.useState)(false), pc_shrink = _f[0], set_pc_shrink_ = _f[1];
    var _g = (0, react_1.useState)([]), listChildren = _g[0], setListChildren = _g[1];
    var _h = (0, react_1.useState)([]), filterList = _h[0], setFilterList = _h[1];
    var _j = (0, react_1.useState)(false), showList = _j[0], setShowList = _j[1];
    var _k = (0, react_1.useState)(''), childText = _k[0], setChildText = _k[1];
    var _l = (0, react_1.useState)(''), inputval = _l[0], setInputval = _l[1];
    var inputRef = (0, react_1.useRef)(null);
    var inputChange = function (e) {
        if (!showSearch) {
            return;
        }
        var val = e.target.value;
        setInputval(val);
        var list = listChildren.filter(function (item) { return filterOption(val, item); });
        setFilterList(list);
    };
    var inputFocus = function (e) {
        e.stopPropagation();
        setInputval('');
        set_pc_shrink_(true);
        setShowList(true);
        onFocus && onFocus();
    };
    var inputBlur = function () {
        set_pc_shrink_(false);
        setInputval('');
        onBlur && onBlur();
        setShowList(false);
        setFilterList(listChildren);
    };
    var changeItem = function (val, text) {
        setVal(val);
        setInputval(text);
        setChildText(text);
        setShowList(false);
        onChange && onChange(val);
        setFilterList(listChildren);
    };
    var getListNode = function () {
        if (!showList) {
            return null;
        }
        return (react_1.default.createElement("div", { className: "".concat(prefixCls, "-option_list") }, filterList.length > 0 ? (filterList.map(function (item) {
            return react_1.default.createElement(Option_1.default, __assign({ key: item.key || item.value }, item, { active: val, onChange: changeItem }));
        })) : (react_1.default.createElement("div", { onClick: function (e) { e.stopPropagation(); }, className: "".concat(prefixCls, "-kong_wrapper") },
            react_1.default.createElement(Icon_1.default, { name: "kongzhuangtai" })))));
    };
    var clickFocus = function () {
        inputRef.current.focus();
    };
    var handleClear = function () {
        set_pc_shrink_(false);
        setInputval('');
        setChildText('');
        setVal('');
        onChange && onChange('');
    };
    (0, react_1.useEffect)(function () {
        var list = children.map(function (child) { return (__assign({}, child.props)); });
        setListChildren(list);
        setFilterList(list);
    }, [children]);
    (0, react_1.useEffect)(function () {
        if (val) {
            var child = filterList.filter(function (item) { return item.value === val; })[0];
            if (child) {
                setChildText(child.children);
            }
        }
        else {
            setChildText('');
        }
    }, [val, filterList]);
    return (react_1.default.createElement("div", { className: "".concat(prefixCls, "-container") },
        label && (react_1.default.createElement("div", { className: "".concat(prefixCls, "-label") + (label != '' ? '' : " ".concat(prefixCls, "-is-hide")) }, label + ' :')),
        react_1.default.createElement("div", { className: "".concat(prefixCls, "-wrapper ").concat(!filterOption ? "".concat(prefixCls, "-cursorPointer") : '', " ").concat(className ? className : '') },
            react_1.default.createElement("span", { className: "".concat(prefixCls, "-form-placeholder ").concat(pc_shrink || val ? "".concat(prefixCls, "-pc_shrink") : '') + (inputval ? " ".concat(prefixCls, "-hide_placeholder") : ''), onClick: clickFocus }, placeholder),
            react_1.default.createElement("span", { onClick: clickFocus, className: "".concat(prefixCls, "-active_text ").concat(pc_shrink ? 'shade' : '') + (inputval ? " ".concat(prefixCls, "-hide_placeholder") : '') }, childText),
            react_1.default.createElement("input", { ref: inputRef, className: "".concat(prefixCls, "-input ").concat(!showSearch ? 'nosearch' : ''), value: inputval, onChange: inputChange, onFocus: inputFocus, onBlur: inputBlur }),
            childText && allowClear && (react_1.default.createElement("div", { className: "".concat(prefixCls, "-clear"), onClick: handleClear },
                react_1.default.createElement(Icon_1.default, { name: "guanbi1" }))),
            react_1.default.createElement("div", { className: "".concat(prefixCls, "-jiantou"), onClick: clickFocus }, showList ? (react_1.default.createElement(Icon_1.default, { name: "Retract" })) : (react_1.default.createElement(Icon_1.default, { name: "Drop-down" })))),
        getListNode()));
};
Select.Option = Option_1.default;
exports.default = Select;
