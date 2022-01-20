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
var react_1 = require("react");
var react_dom_1 = __importDefault(require("react-dom"));
var classnames_1 = __importDefault(require("classnames"));
var motion_1 = require("../motion");
var Notice_1 = __importDefault(require("./Notice"));
var useNotification_1 = __importDefault(require("./useNotification"));
var seed = 0;
var now = Date.now();
function getUuid() {
    var id = seed;
    seed += 1;
    return "rcNotification_".concat(now, "_").concat(id);
}
var Notification = /** @class */ (function (_super) {
    __extends(Notification, _super);
    function Notification() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            notices: [],
        };
        /**
         * @private Internal props do not call it directly.
         * We do not make this as private is caused TS will trade private as
         * different prop that between es and lib
         */
        _this.hookRefs = new Map();
        _this.add = function (originNotice, holderCallback) {
            var key = originNotice.key || getUuid();
            var notice = __assign(__assign({}, originNotice), { key: key });
            var maxCount = _this.props.maxCount;
            _this.setState(function (previousState) {
                var notices = previousState.notices;
                var noticeIndex = notices.map(function (v) { return v.notice.key; }).indexOf(key);
                var updatedNotices = notices.concat();
                if (noticeIndex !== -1) {
                    updatedNotices.splice(noticeIndex, 1, { notice: notice, holderCallback: holderCallback });
                }
                else {
                    if (maxCount && notices.length >= maxCount) {
                        notice.key = updatedNotices[0].notice.key;
                        notice.updateMark = getUuid();
                        notice.userPassKey = key;
                        updatedNotices.shift();
                    }
                    updatedNotices.push({ notice: notice, holderCallback: holderCallback });
                }
                return {
                    notices: updatedNotices,
                };
            });
        };
        _this.remove = function (removeKey) {
            _this.setState(function (_a) {
                var notices = _a.notices;
                return ({
                    notices: notices.filter(function (_a) {
                        var _b = _a.notice, key = _b.key, userPassKey = _b.userPassKey;
                        var mergedKey = userPassKey || key;
                        return mergedKey !== removeKey;
                    }),
                });
            });
        };
        _this.noticePropsMap = {};
        return _this;
    }
    Notification.prototype.getTransitionName = function () {
        var _a = this.props, prefixCls = _a.prefixCls, animation = _a.animation;
        var transitionName = this.props.transitionName;
        if (!transitionName && animation) {
            transitionName = "".concat(prefixCls, "-").concat(animation);
        }
        return transitionName;
    };
    Notification.prototype.render = function () {
        var _this = this;
        var notices = this.state.notices;
        var _a = this.props, prefixCls = _a.prefixCls, className = _a.className, closeIcon = _a.closeIcon, style = _a.style;
        var noticeKeys = [];
        notices.forEach(function (_a, index) {
            var notice = _a.notice, holderCallback = _a.holderCallback;
            var updateMark = index === notices.length - 1 ? notice.updateMark : undefined;
            var key = notice.key, userPassKey = notice.userPassKey;
            var noticeProps = __assign(__assign(__assign({ prefixCls: prefixCls, closeIcon: closeIcon }, notice), notice.props), { key: key, noticeKey: userPassKey || key, updateMark: updateMark, onClose: function (noticeKey) {
                    var _a;
                    _this.remove(noticeKey);
                    (_a = notice.onClose) === null || _a === void 0 ? void 0 : _a.call(notice);
                }, onClick: notice.onClick, children: notice.content });
            // Give to motion
            noticeKeys.push(key);
            _this.noticePropsMap[key] = { props: noticeProps, holderCallback: holderCallback };
        });
        return (React.createElement("div", { className: (0, classnames_1.default)(prefixCls, className), style: style },
            React.createElement(motion_1.CSSMotionList, { keys: noticeKeys, motionName: this.getTransitionName(), onVisibleChanged: function (changedVisible, _a) {
                    var key = _a.key;
                    if (!changedVisible) {
                        delete _this.noticePropsMap[key];
                    }
                } }, function (_a) {
                var key = _a.key, motionClassName = _a.className, motionStyle = _a.style, visible = _a.visible;
                var _b = _this.noticePropsMap[key], noticeProps = _b.props, holderCallback = _b.holderCallback;
                if (holderCallback) {
                    return (React.createElement("div", { key: key, className: (0, classnames_1.default)(motionClassName, "".concat(prefixCls, "-hook-holder")), style: __assign({}, motionStyle), ref: function (div) {
                            if (typeof key === 'undefined') {
                                return;
                            }
                            if (div) {
                                _this.hookRefs.set(key, div);
                                holderCallback(div, noticeProps);
                            }
                            else {
                                _this.hookRefs.delete(key);
                            }
                        } }));
                }
                return (React.createElement(Notice_1.default, __assign({}, noticeProps, { className: (0, classnames_1.default)(motionClassName, noticeProps === null || noticeProps === void 0 ? void 0 : noticeProps.className), style: __assign(__assign({}, motionStyle), noticeProps === null || noticeProps === void 0 ? void 0 : noticeProps.style), visible: visible })));
            })));
    };
    Notification.defaultProps = {
        prefixCls: 'rc-notification',
        animation: 'fade',
        style: {
            top: 65,
            left: '50%',
        },
    };
    return Notification;
}(react_1.Component));
Notification.newInstance = function newNotificationInstance(properties, callback) {
    var _a = properties || {}, getContainer = _a.getContainer, props = __rest(_a, ["getContainer"]);
    var div = document.createElement('div');
    if (getContainer) {
        var root = getContainer();
        root.appendChild(div);
    }
    else {
        document.body.appendChild(div);
    }
    var called = false;
    function ref(notification) {
        if (called) {
            return;
        }
        called = true;
        callback({
            notice: function (noticeProps) {
                notification.add(noticeProps);
            },
            removeNotice: function (key) {
                notification.remove(key);
            },
            component: notification,
            destroy: function () {
                react_dom_1.default.unmountComponentAtNode(div);
                if (div.parentNode) {
                    div.parentNode.removeChild(div);
                }
            },
            // Hooks
            useNotification: function () {
                return (0, useNotification_1.default)(notification);
            },
        });
    }
    // Only used for test case usage
    if (process.env.NODE_ENV === 'test' && properties.TEST_RENDER) {
        properties.TEST_RENDER(React.createElement(Notification, __assign({}, props, { ref: ref })));
        return;
    }
    react_dom_1.default.render(React.createElement(Notification, __assign({}, props, { ref: ref })), div);
};
exports.default = Notification;
