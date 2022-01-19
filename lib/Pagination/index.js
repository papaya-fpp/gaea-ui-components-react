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
var react_1 = __importStar(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var Icon_1 = __importDefault(require("../Icon"));
var Select_1 = __importDefault(require("../Select"));
var responsiveObserve_1 = require("../_util/responsiveObserve");
var Option = Select_1.default.Option;
var Pagination = function (_a) {
    var _b = _a.total, total = _b === void 0 ? 0 : _b, _c = _a.current, current = _c === void 0 ? 1 : _c, _d = _a.PageSize, PageSize = _d === void 0 ? 10 : _d, _e = _a.showSizeChanger, showSizeChanger = _e === void 0 ? false : _e, showTotal = _a.showTotal, onChange = _a.onChange;
    var dotPageNum = 5;
    var prefixCls = (0, responsiveObserve_1.getPrefixCls)('pagination');
    var _f = (0, react_1.useState)([
        {
            value: 10,
            label: '10页/条',
        },
        {
            value: 20,
            label: '20页/条',
        },
        {
            value: 50,
            label: '50页/条',
        },
        {
            value: 100,
            label: '100页/条',
        },
    ]), optionList = _f[0], setOptionList = _f[1];
    var _g = (0, react_1.useState)(Math.ceil(total / PageSize)), pageCount = _g[0], setPageCount = _g[1];
    var _h = (0, react_1.useState)([]), showList = _h[0], setShowList = _h[1];
    var _j = (0, react_1.useState)(+current), comCurrent = _j[0], setComCurrent = _j[1];
    var _k = (0, react_1.useState)(+PageSize), defaultPageSize = _k[0], setDefaultPageSize = _k[1];
    (0, react_1.useEffect)(function () {
        var initPageCount = Math.ceil(total / PageSize);
        setPageCount(initPageCount);
        setDefaultPageSize(PageSize);
    }, [total, PageSize]);
    var createShowList = function (curt) {
        var ary = [];
        if (pageCount <= 7) {
            for (var i = 1; i <= pageCount; i++) {
                ary.push(i);
            }
        }
        else {
            if (curt <= 4) {
                for (var i = 1; i <= 5; i++) {
                    ary.push(i);
                }
                ary.push('next', pageCount);
            }
            else if (curt >= pageCount - 3) {
                ary.push(1, 'prev');
                for (var i = pageCount - 4; i <= pageCount; i++) {
                    ary.push(i);
                }
            }
            else {
                ary.push(1, 'prev', curt - 1, curt, curt + 1, 'next', pageCount);
            }
        }
        setShowList(ary);
    };
    var handleClick = function (type, val) {
        var pageNUm = 1;
        if (type === 'num') {
            pageNUm = val;
        }
        else if (type === 'prev') {
            if (comCurrent == 1) {
                return;
            }
            pageNUm = comCurrent - val > 0 ? comCurrent - val : 1;
        }
        else {
            if (comCurrent == pageCount) {
                return;
            }
            pageNUm = comCurrent + val <= pageCount ? comCurrent + val : pageCount;
        }
        setComCurrent(+pageNUm);
        createShowList(+pageNUm);
        onChange && onChange(+pageNUm);
    };
    var handleChangeSize = function (value) {
        setDefaultPageSize(value);
        setPageCount(Math.ceil(total / value));
    };
    (0, react_1.useEffect)(function () {
        createShowList(+current);
    }, [current, pageCount]);
    return total > 0 ? (react_1.default.createElement("div", { className: prefixCls },
        showTotal && (react_1.default.createElement("div", { className: "".concat(prefixCls, "-total") }, showTotal)),
        react_1.default.createElement("ul", { className: "".concat(prefixCls, "-list") },
            react_1.default.createElement("li", { className: (0, classnames_1.default)("".concat(prefixCls, "-prev-arrow"), {
                    'fpp-pagination-disabled': comCurrent == 1,
                }), onClick: function () {
                    handleClick('prev', 1);
                } },
                react_1.default.createElement("div", { className: (0, classnames_1.default)("".concat(prefixCls, "-prev-arrow-d")) },
                    react_1.default.createElement(Icon_1.default, { name: "zuo", size: 16 }))),
            showList.map(function (item) {
                if (item === 'prev') {
                    return (react_1.default.createElement("li", { key: item, className: "".concat(prefixCls, "-dot ").concat(prefixCls, "-prev"), onClick: function () {
                            handleClick('prev', dotPageNum);
                        } },
                        react_1.default.createElement("span", { className: "dot" }, "\u2022\u2022\u2022"),
                        react_1.default.createElement("div", { className: "prev-icon" },
                            react_1.default.createElement(Icon_1.default, { name: "fanyezuo", size: 14 }))));
                }
                else if (item === 'next') {
                    return (react_1.default.createElement("li", { key: item, className: "".concat(prefixCls, "-dot ").concat(prefixCls, "-next"), onClick: function () {
                            handleClick('next', dotPageNum);
                        } },
                        react_1.default.createElement("span", { className: "dot" }, "\u2022\u2022\u2022"),
                        react_1.default.createElement("div", { className: "next-icon" },
                            react_1.default.createElement(Icon_1.default, { name: "fanyeyou", size: 14 }))));
                }
                else {
                    return (react_1.default.createElement("li", { key: item, className: "pageNum ".concat(comCurrent === item ? 'active' : ''), onClick: function () {
                            handleClick('num', item);
                        } }, item));
                }
            }),
            react_1.default.createElement("li", { className: (0, classnames_1.default)("".concat(prefixCls, "-next-arrow"), {
                    'fpp-pagination-disabled': comCurrent == pageCount
                }), onClick: function () {
                    handleClick('next', 1);
                } },
                react_1.default.createElement("div", { className: (0, classnames_1.default)("".concat(prefixCls, "-next-arrow-d")) },
                    react_1.default.createElement(Icon_1.default, { name: "you", size: 16 })))),
        showSizeChanger && (react_1.default.createElement("div", { className: "${prefixCls}-options" },
            react_1.default.createElement(Select_1.default, { filterOption: false, value: defaultPageSize, onChange: handleChangeSize }, optionList &&
                optionList.map(function (item) { return (react_1.default.createElement(Option, { key: item.value, value: item.value }, item.label)); })))))) : null;
};
exports.default = Pagination;
