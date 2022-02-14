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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponsiveObserve = exports.responsiveMap = exports.responsiveArray = exports.getRootPrefixCls = exports.getPrefixCls = exports.tuple = void 0;
var tuple = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args;
};
exports.tuple = tuple;
var getPrefixCls = function (suffixCls, customizePrefixCls) {
    if (customizePrefixCls)
        return customizePrefixCls;
    return suffixCls ? "fpp-".concat(suffixCls) : 'fpp';
};
exports.getPrefixCls = getPrefixCls;
var getRootPrefixCls = function (rootPrefixCls, customizePrefixCls) {
    if (rootPrefixCls) {
        return rootPrefixCls;
    }
    if (customizePrefixCls && customizePrefixCls.includes('-')) {
        return customizePrefixCls.replace(/^(.*)-[^-]*$/, '$1');
    }
    return 'fpp';
};
exports.getRootPrefixCls = getRootPrefixCls;
exports.responsiveArray = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
exports.responsiveMap = {
    xs: '(max-width: 575px)',
    sm: '(min-width: 576px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 992px)',
    xl: '(min-width: 1200px)',
    xxl: '(min-width: 1600px)',
};
var subscribers = new Map();
var subUid = -1;
var screens = {};
exports.ResponsiveObserve = {
    matchHandlers: {},
    dispatch: function (pointMap) {
        screens = pointMap;
        subscribers.forEach(function (func) { return func(screens); });
        return subscribers.size >= 1;
    },
    subscribe: function (func) {
        if (!subscribers.size)
            this.register();
        subUid += 1;
        subscribers.set(subUid, func);
        func(screens);
        return subUid;
    },
    unsubscribe: function (token) {
        subscribers.delete(token);
        if (!subscribers.size)
            this.unregister();
    },
    unregister: function () {
        var _this = this;
        Object.keys(exports.responsiveMap).forEach(function (screen) {
            var matchMediaQuery = exports.responsiveMap[screen];
            var handler = _this.matchHandlers[matchMediaQuery];
            handler === null || handler === void 0 ? void 0 : handler.mql.removeListener(handler === null || handler === void 0 ? void 0 : handler.listener);
        });
        subscribers.clear();
    },
    register: function () {
        var _this = this;
        Object.keys(exports.responsiveMap).forEach(function (screen) {
            var matchMediaQuery = exports.responsiveMap[screen];
            var listener = function (_a) {
                var _b;
                var matches = _a.matches;
                _this.dispatch(__assign(__assign({}, screens), (_b = {}, _b[screen] = matches, _b)));
            };
            var mql = window.matchMedia(matchMediaQuery);
            mql.addListener(listener);
            _this.matchHandlers[matchMediaQuery] = {
                mql: mql,
                listener: listener,
            };
            listener(mql);
        });
    },
};
