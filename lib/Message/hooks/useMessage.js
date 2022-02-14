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
var React = __importStar(require("react"));
var useNotification_1 = __importDefault(require("../../common/notification/useNotification"));
var __1 = require("..");
var responsiveObserve_1 = require("../../_util/responsiveObserve");
function createUseMessage(getRcNotificationInstance, getRCNoticeProps) {
    var useMessage = function () {
        // We can only get content by render
        var getPopupContainer;
        // We create a proxy to handle delay created instance
        var innerInstance = null;
        var proxy = {
            add: function (noticeProps, holderCallback) {
                innerInstance === null || innerInstance === void 0 ? void 0 : innerInstance.component.add(noticeProps, holderCallback);
            },
        };
        var _a = (0, useNotification_1.default)(proxy), hookNotify = _a[0], holder = _a[1];
        function notify(args) {
            var customizePrefixCls = args.prefixCls;
            var mergedPrefixCls = (0, responsiveObserve_1.getPrefixCls)('message', customizePrefixCls);
            var rootPrefixCls = (0, responsiveObserve_1.getPrefixCls)();
            var target = args.key || (0, __1.getKeyThenIncreaseKey)();
            var closePromise = new Promise(function (resolve) {
                var callback = function () {
                    if (typeof args.onClose === 'function') {
                        args.onClose();
                    }
                    return resolve(true);
                };
                getRcNotificationInstance(__assign(__assign({}, args), { prefixCls: mergedPrefixCls, rootPrefixCls: rootPrefixCls, getPopupContainer: getPopupContainer }), function (_a) {
                    var prefixCls = _a.prefixCls, instance = _a.instance;
                    innerInstance = instance;
                    hookNotify(getRCNoticeProps(__assign(__assign({}, args), { key: target, onClose: callback }), prefixCls));
                });
            });
            var result = function () {
                if (innerInstance) {
                    innerInstance.removeNotice(target);
                }
            };
            result.then = function (filled, rejected) { return closePromise.then(filled, rejected); };
            result.promise = closePromise;
            return result;
        }
        // Fill functions
        var hookApiRef = React.useRef({});
        hookApiRef.current.open = notify;
        ['success', 'info', 'warning', 'error', 'loading'].forEach(function (type) {
            return (0, __1.attachTypeApi)(hookApiRef.current, type);
        });
        return [
            hookApiRef.current, holder
        ];
    };
    return useMessage;
}
exports.default = createUseMessage;
