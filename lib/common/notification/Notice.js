"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var React = __importStar(require("react"));
var react_1 = require("react");
var react_dom_1 = __importDefault(require("react-dom"));
var classnames_1 = __importDefault(require("classnames"));
var Notice = /** @class */ (function (_super) {
    __extends(Notice, _super);
    function Notice() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.closeTimer = null;
        _this.close = function (e) {
            if (e) {
                e.stopPropagation();
            }
            _this.clearCloseTimer();
            var _a = _this.props, onClose = _a.onClose, noticeKey = _a.noticeKey;
            if (onClose) {
                onClose(noticeKey);
            }
        };
        _this.startCloseTimer = function () {
            if (_this.props.duration) {
                _this.closeTimer = window.setTimeout(function () {
                    _this.close();
                }, _this.props.duration * 1000);
            }
        };
        _this.clearCloseTimer = function () {
            if (_this.closeTimer) {
                clearTimeout(_this.closeTimer);
                _this.closeTimer = null;
            }
        };
        return _this;
    }
    Notice.prototype.componentDidMount = function () {
        this.startCloseTimer();
    };
    Notice.prototype.componentDidUpdate = function (prevProps) {
        if (this.props.duration !== prevProps.duration ||
            this.props.updateMark !== prevProps.updateMark ||
            // Visible again need reset timer
            (this.props.visible !== prevProps.visible && this.props.visible)) {
            this.restartCloseTimer();
        }
    };
    Notice.prototype.componentWillUnmount = function () {
        this.clearCloseTimer();
    };
    Notice.prototype.restartCloseTimer = function () {
        this.clearCloseTimer();
        this.startCloseTimer();
    };
    Notice.prototype.render = function () {
        var _a;
        var _this = this;
        var _b = this.props, prefixCls = _b.prefixCls, className = _b.className, closable = _b.closable, closeIcon = _b.closeIcon, style = _b.style, onClick = _b.onClick, children = _b.children, holder = _b.holder;
        var componentClass = "".concat(prefixCls, "-notice");
        var dataOrAriaAttributeProps = Object.keys(this.props).reduce(function (acc, key) {
            if (key.substr(0, 5) === 'data-' || key.substr(0, 5) === 'aria-' || key === 'role') {
                acc[key] = _this.props[key];
            }
            return acc;
        }, {});
        var node = (React.createElement("div", __assign({ className: (0, classnames_1.default)(componentClass, className, (_a = {},
                _a["".concat(componentClass, "-closable")] = closable,
                _a)), style: style, onMouseEnter: this.clearCloseTimer, onMouseLeave: this.startCloseTimer, onClick: onClick }, dataOrAriaAttributeProps),
            React.createElement("div", { className: "".concat(componentClass, "-content") }, children),
            closable ? (React.createElement("a", { tabIndex: 0, onClick: this.close, className: "".concat(componentClass, "-close") }, closeIcon || React.createElement("span", { className: "".concat(componentClass, "-close-x") }))) : null));
        if (holder) {
            return react_dom_1.default.createPortal(node, holder);
        }
        return node;
    };
    Notice.defaultProps = {
        onClose: function () { },
        duration: 1.5,
    };
    return Notice;
}(react_1.Component));
exports.default = Notice;
