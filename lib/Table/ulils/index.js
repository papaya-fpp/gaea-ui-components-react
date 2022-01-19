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
exports.createNewList = exports.createColgroup = void 0;
var react_1 = __importDefault(require("react"));
var createColgroup = function (columns) {
    var ary = [];
    var prevWitch = '';
    for (var i = 0; i < columns.length; i++) {
        if (columns[i].width) {
            if (columns[i].width == prevWitch) {
                ary[i - 1].num++;
            }
            else {
                ary[i] = { width: columns[i].width, num: 1 };
            }
            prevWitch = columns[i].width;
        }
        else {
            prevWitch = '';
        }
    }
    var colDom = [];
    var _loop_1 = function (i) {
        if (!ary[i]) {
            colDom.push(function () { return react_1.default.createElement("col", null); });
        }
        else {
            colDom.push(function () { return react_1.default.createElement("col", { span: ary[i].num, style: { width: ary[i].width } }); });
        }
    };
    for (var i = 0; i < ary.length; i++) {
        _loop_1(i);
    }
    return (react_1.default.createElement("colgroup", null, colDom.map(function (Item, index) { return (react_1.default.createElement(Item, { key: index })); })));
};
exports.createColgroup = createColgroup;
var createNewList = function (list, getRowKey, level, parentId) {
    if (level === void 0) { level = 0; }
    var ary = [];
    for (var i = 0; i < list.length; i++) {
        var _a = list[i], description = _a.description, children = _a.children, data = __rest(_a, ["description", "children"]);
        var isCollapse = !!(description || (children && children.length > 0));
        var item_key = getRowKey(data);
        var obj = __assign(__assign({}, data), { level: level, isCollapse: isCollapse, collapseValue: 1 // 1 折叠 0 展开
         });
        if (level > 0 && parentId) {
            obj.parentId = parentId;
            obj.show = false;
        }
        ary.push(obj);
        if (description) {
            ary.push({
                description: description,
                key: item_key + '-' + 'description',
                level: level + 1,
                show: false,
                parentId: item_key
            });
        }
        if (children && children.length > 0) {
            ary = ary.concat((0, exports.createNewList)(children, getRowKey, level + 1, item_key));
        }
    }
    return ary;
};
exports.createNewList = createNewList;
