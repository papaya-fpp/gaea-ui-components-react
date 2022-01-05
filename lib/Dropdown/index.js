"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var responsiveObserve_1 = require("../_util/responsiveObserve");
var Icon_1 = __importDefault(require("../Icon"));
var Dropdown = function (_a) {
    var _b, _c;
    var _d = _a.arrow, arrow = _d === void 0 ? true : _d, _e = _a.disabled, disabled = _e === void 0 ? false : _e, _f = _a.trigger, trigger = _f === void 0 ? 'click' : _f, _g = _a.visible, visible = _g === void 0 ? true : _g, _h = _a.list, list = _h === void 0 ? [] : _h, title = _a.title, children = _a.children, onChange = _a.onChange, _j = _a.placement, placement = _j === void 0 ? 'bottomLeft' : _j;
    var totalHeight = list.length * 36 + 16;
    var titleHeight = 0;
    var hiddenTimer = null;
    var _k = react_1.default.useState({}), listStyle = _k[0], setListStyle = _k[1];
    var _l = react_1.default.useState(true), hidden = _l[0], setHidden = _l[1];
    var setListHidden = function (status) {
        if (disabled)
            return;
        if (visible === undefined) {
            setHiddenHandle(status);
        }
    };
    var setHiddenHandle = function (status) {
        if (status) {
            if (listRef.current) {
                listRef.current.style.height = '0px';
                listRef.current.style.opacity = '0';
            }
            clearTimeout(hiddenTimer);
            hiddenTimer = setTimeout(function () {
                setHidden(true);
                clearTimeout(hiddenTimer);
            }, 300);
        }
        else {
            setHidden(false);
        }
    };
    var titleRef = react_1.default.useRef(null);
    var listRef = react_1.default.useRef(null);
    var prefixCls = (0, responsiveObserve_1.getPrefixCls)('dropdown');
    var classes = (0, classnames_1.default)(prefixCls, (_b = {},
        _b["".concat(prefixCls, "-disabled")] = disabled,
        _b));
    var listClasses = (0, classnames_1.default)("".concat(prefixCls, "-list"), (_c = {},
        _c["".concat(prefixCls, "-list-hidden")] = hidden,
        _c));
    var stopPropagation = function (e) { return e.stopPropagation(); };
    var clickHandle = function () {
        if (trigger === 'click') {
            setListHidden(!hidden);
        }
    };
    var mouseOverHandle = function () {
        if (trigger === 'hover') {
            setListHidden(false);
        }
    };
    var mouseOutHandle = function () {
        if (trigger === 'hover') {
            setListHidden(true);
        }
    };
    var renderItem = function () {
        return (list.map(function (item) {
            return react_1.default.createElement("li", { className: "".concat(prefixCls, "-list-item"), key: item.key, onClick: function () {
                    setHidden(true);
                    onChange && onChange(item);
                } }, item.label);
        }));
    };
    react_1.default.useEffect(function () {
        if (listRef.current && !hidden) {
            listRef.current.style.height = totalHeight + 'px';
            listRef.current.style.opacity = '1';
        }
    }, [hidden]);
    react_1.default.useEffect(function () {
        visible !== undefined && !disabled && setHiddenHandle(visible);
    }, [visible]);
    var documentClickHidden = function () { return setListHidden(true); };
    react_1.default.useEffect(function () {
        if (titleRef.current) {
            titleHeight = titleRef.current.offsetHeight;
            var topH = titleHeight + 6;
            var listPos = {};
            switch (placement) {
                case 'bottomLeft':
                    listPos = { top: topH, left: 0 };
                    break;
                case 'bottomRight':
                    listPos = { top: topH, right: 0 };
                    break;
                case 'topLeft':
                    listPos = { bottom: topH, left: 0 };
                    break;
                case 'topRight':
                    listPos = { bottom: topH, right: 0 };
                    break;
                default:
                    listPos = { top: topH, left: 0 };
                    break;
            }
            setListStyle(listPos);
        }
        document.addEventListener('click', documentClickHidden, false);
        return function () {
            document.removeEventListener('click', documentClickHidden);
        };
    }, []);
    return (react_1.default.createElement("div", { className: classes, onClick: stopPropagation, onMouseOver: mouseOverHandle, onMouseOut: mouseOutHandle },
        react_1.default.createElement("div", { className: "".concat(prefixCls, "-title"), ref: titleRef, onClick: clickHandle },
            children ? children : react_1.default.createElement("span", null, title),
            arrow && react_1.default.createElement(Icon_1.default, { className: "drop-down", name: "Drop-down" })),
        react_1.default.createElement("ul", { className: listClasses, style: listStyle, ref: listRef }, renderItem())));
};
exports.default = Dropdown;
