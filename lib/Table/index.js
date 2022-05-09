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
var ulils_1 = require("./ulils");
var Icon_1 = __importDefault(require("../Icon"));
var responsiveObserve_1 = require("../_util/responsiveObserve");
var prefixCls = (0, responsiveObserve_1.getPrefixCls)('table');
var TableCollapse = function (_a) {
    var _b = _a.value, value = _b === void 0 ? 1 : _b, _c = _a.showTableCollapse, showTableCollapse = _c === void 0 ? false : _c, onChange = _a.onChange;
    var getSign = function () {
        return value === 1 ? (react_1.default.createElement("span", { className: "".concat(prefixCls, "-plus"), onClick: function () { return onChange(0); } }, "+")) : (react_1.default.createElement("span", { className: "".concat(prefixCls, "-minus"), onClick: function () { return onChange(1); } }, "-"));
    };
    return showTableCollapse ? (react_1.default.createElement("span", { className: "".concat(prefixCls, "-collapse"), style: !showTableCollapse ? { border: 'none', cursor: 'auto' } : {} }, showTableCollapse && getSign())) : null;
};
var TableComp = function (props) {
    var columns = props.columns, dataSource = props.dataSource, rowKey = props.rowKey, _a = props.bordered, bordered = _a === void 0 ? false : _a, width = props.width, pagination = props.pagination, onRowClick = props.onRowClick;
    var _b = (0, react_1.useState)([]), tableList = _b[0], setTableList = _b[1];
    var tableRef = (0, react_1.useRef)(null);
    var getRowKey = react_1.default.useMemo(function () {
        if (typeof rowKey === 'function') {
            return rowKey;
        }
        return function (record) { return record[rowKey]; };
    }, [rowKey]);
    // 点击
    var hangeHandle = function (data, status) {
        setTableList(function (prevTableList) {
            var diffId = getRowKey(data);
            return prevTableList.map(function (item) {
                if (diffId === getRowKey(item)) {
                    item.collapseValue = status;
                }
                if (item.parentId && diffId === item.parentId) {
                    item.show = status ? false : true;
                }
                return item;
            });
        });
    };
    // 创建 thead
    var createTHead = function () {
        return (react_1.default.createElement("thead", null,
            react_1.default.createElement("tr", null, columns.map(function (item) {
                return react_1.default.createElement("th", { style: { width: item.width }, key: item.key || item.dataIndex }, item.title);
            }))));
    };
    // 创建 行
    var createRow = function () {
        if (tableList.length < 1)
            return empytStatus();
        return (react_1.default.createElement(react_1.default.Fragment, null, tableList.map(function (item) {
            var style = {};
            if (item.level > 0) {
                style = item.show ? { background: '#fafafa' } : { display: 'none' };
            }
            if (onRowClick) {
                style = __assign(__assign({}, style), { 'cursor': 'pointer' });
            }
            if (item.description) {
                return (react_1.default.createElement("tr", { onClick: function () { onRowClick && onRowClick(item); }, key: item.key, style: style, className: "table-row-level-".concat(item.level) },
                    react_1.default.createElement("td", { colSpan: columns.length }, item.description)));
            }
            return (react_1.default.createElement("tr", { onClick: function () { onRowClick && onRowClick(item); }, key: getRowKey(item), style: style, className: "table-row-level-".concat(item.level) }, createCol(item)));
        })));
    };
    // 创建 列
    var createCol = react_1.default.useCallback(function (obj) {
        return (react_1.default.createElement(react_1.default.Fragment, null, columns.map(function (item, index) {
            var key = item.dataIndex || item.key;
            var content = obj[key];
            var classes = "table-cell table-cell-level-".concat(obj.level);
            var _rowKey = getRowKey(obj);
            if (item.render) {
                content = item.render(obj[key], obj);
            }
            return (react_1.default.createElement("td", { width: item.width, key: key, "data-key": key, "data-rowkey": _rowKey, className: classes },
                index === 0 && (react_1.default.createElement(TableCollapse, { showTableCollapse: obj.isCollapse, value: obj.collapseValue, onChange: function (status) { return hangeHandle(obj, status); } })),
                content));
        })));
    }, [columns, getRowKey]);
    // 空状态
    var empytStatus = function () {
        return (react_1.default.createElement("tr", null,
            react_1.default.createElement("td", { colSpan: columns.length },
                react_1.default.createElement("div", { className: "".concat(prefixCls, "-kong_wrapper") },
                    react_1.default.createElement(Icon_1.default, { name: "kongzhuangtai" })))));
    };
    (0, react_1.useEffect)(function () {
        var list = (0, ulils_1.createNewList)(dataSource, getRowKey);
        setTableList(list);
    }, [dataSource]);
    var table_styles = { border: bordered ? '1px solid #f6f6f6' : 'none' };
    if (width) {
        table_styles.width = width + 'px';
    }
    return (react_1.default.createElement("div", { className: prefixCls },
        react_1.default.createElement("table", { className: "".concat(prefixCls, "-wrapper"), ref: tableRef },
            createTHead(),
            react_1.default.createElement("tbody", null, createRow()))));
};
exports.default = TableComp;
