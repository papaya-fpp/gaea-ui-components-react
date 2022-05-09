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
exports.getInstance = exports.attachTypeApi = exports.getKeyThenIncreaseKey = void 0;
var React = __importStar(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var notification_1 = __importDefault(require("../common/notification"));
var Icon_1 = __importDefault(require("../Icon"));
// import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
// import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
// import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
// import CheckCircleFilled from '@ant-design/icons/CheckCircleFilled';
// import InfoCircleFilled from '@ant-design/icons/InfoCircleFilled';
var useMessage_1 = __importDefault(require("./hooks/useMessage"));
var responsiveObserve_1 = require("../_util/responsiveObserve");
var messageInstance;
var defaultDuration = 3;
var defaultTop;
var key = 1;
var localPrefixCls = '';
var transitionName = 'move-up';
var hasTransitionName = false;
var getContainer;
var maxCount;
var rtl = false;
function getKeyThenIncreaseKey() {
    return key++;
}
exports.getKeyThenIncreaseKey = getKeyThenIncreaseKey;
function setMessageConfig(options) {
    if (options.top !== undefined) {
        defaultTop = options.top;
        messageInstance = null; // delete messageInstance for new defaultTop
    }
    if (options.duration !== undefined) {
        defaultDuration = options.duration;
    }
    if (options.prefixCls !== undefined) {
        localPrefixCls = options.prefixCls;
    }
    if (options.getContainer !== undefined) {
        getContainer = options.getContainer;
    }
    if (options.transitionName !== undefined) {
        transitionName = options.transitionName;
        messageInstance = null; // delete messageInstance for new transitionName
        hasTransitionName = true;
    }
    if (options.maxCount !== undefined) {
        maxCount = options.maxCount;
        messageInstance = null;
    }
    if (options.rtl !== undefined) {
        rtl = options.rtl;
    }
}
function getRCNotificationInstance(args, callback) {
    var customizePrefixCls = args.prefixCls, getContextPopupContainer = args.getPopupContainer;
    var prefixCls = (0, responsiveObserve_1.getPrefixCls)('message', customizePrefixCls || localPrefixCls);
    var rootPrefixCls = (0, responsiveObserve_1.getRootPrefixCls)(args.rootPrefixCls, prefixCls);
    if (messageInstance) {
        callback({ prefixCls: prefixCls, rootPrefixCls: rootPrefixCls, instance: messageInstance });
        return;
    }
    var instanceConfig = {
        prefixCls: prefixCls,
        transitionName: hasTransitionName ? transitionName : "".concat(rootPrefixCls, "-").concat(transitionName),
        style: { top: defaultTop },
        getContainer: getContainer || getContextPopupContainer,
        maxCount: maxCount,
    };
    notification_1.default.newInstance(instanceConfig, function (instance) {
        if (messageInstance) {
            callback({ prefixCls: prefixCls, rootPrefixCls: rootPrefixCls, instance: messageInstance });
            return;
        }
        messageInstance = instance;
        if (process.env.NODE_ENV === 'test') {
            messageInstance.config = instanceConfig;
        }
        callback({ prefixCls: prefixCls, rootPrefixCls: rootPrefixCls, instance: instance });
    });
}
var typeToIcon = {
    info: React.createElement(Icon_1.default, { color: '#64C8BC', name: "chenggong" }),
    success: React.createElement(Icon_1.default, { color: '#64C8BC', name: "chenggong" }),
    error: React.createElement(Icon_1.default, { color: '#FF8A8A', name: "shibai" }),
    warning: React.createElement(Icon_1.default, { color: '#FFC68A', name: "jinggao" }),
    // loading: LoadingOutlined,
};
function getRCNoticeProps(args, prefixCls) {
    var _a;
    var duration = args.duration !== undefined ? args.duration : defaultDuration;
    var IconComponent = typeToIcon[args.type];
    var messageClass = (0, classnames_1.default)("".concat(prefixCls, "-custom-content"), (_a = {},
        _a["".concat(prefixCls, "-").concat(args.type)] = args.type,
        _a));
    return {
        key: args.key,
        duration: duration,
        style: args.style || {},
        className: args.className,
        content: (React.createElement("div", { className: messageClass },
            args.icon || IconComponent,
            React.createElement("span", { style: { marginLeft: '5px' } }, args.content))),
        onClose: args.onClose,
        onClick: args.onClick,
    };
}
function notice(args) {
    var target = args.key || getKeyThenIncreaseKey();
    var closePromise = new Promise(function (resolve) {
        var callback = function () {
            if (typeof args.onClose === 'function') {
                args.onClose();
            }
            return resolve(true);
        };
        getRCNotificationInstance(args, function (_a) {
            var prefixCls = _a.prefixCls, instance = _a.instance;
            instance.notice(getRCNoticeProps(__assign(__assign({}, args), { key: target, onClose: callback }), prefixCls));
        });
    });
    var result = function () {
        if (messageInstance) {
            messageInstance.removeNotice(target);
        }
    };
    result.then = function (filled, rejected) {
        return closePromise.then(filled, rejected);
    };
    result.promise = closePromise;
    return result;
}
function isArgsProps(content) {
    return (Object.prototype.toString.call(content) === '[object Object]' &&
        !!content.content);
}
var api = {
    open: notice,
    config: setMessageConfig,
    destroy: function (messageKey) {
        if (messageInstance) {
            if (messageKey) {
                var removeNotice = messageInstance.removeNotice;
                removeNotice(messageKey);
            }
            else {
                var destroy = messageInstance.destroy;
                destroy();
                messageInstance = null;
            }
        }
    },
};
function attachTypeApi(originalApi, type) {
    originalApi[type] = function (content, duration, onClose) {
        if (isArgsProps(content)) {
            return originalApi.open(__assign(__assign({}, content), { type: type }));
        }
        if (typeof duration === 'function') {
            onClose = duration;
            duration = undefined;
        }
        return originalApi.open({ content: content, duration: duration, type: type, onClose: onClose });
    };
}
exports.attachTypeApi = attachTypeApi;
['success', 'info', 'warning', 'error', 'loading'].forEach(function (type) {
    return attachTypeApi(api, type);
});
api.warn = api.warning;
api.useMessage = (0, useMessage_1.default)(getRCNotificationInstance, getRCNoticeProps);
/** @private test Only function. Not work on production */
var getInstance = function () { return (process.env.NODE_ENV === 'test' ? messageInstance : null); };
exports.getInstance = getInstance;
exports.default = api;
