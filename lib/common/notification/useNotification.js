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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var Notice_1 = __importDefault(require("./Notice"));
function useNotification(notificationInstance) {
    var createdRef = React.useRef({});
    var _a = React.useState([]), elements = _a[0], setElements = _a[1];
    function notify(noticeProps) {
        var firstMount = true;
        notificationInstance.add(noticeProps, function (div, props) {
            var key = props.key;
            if (div && (!createdRef.current[key] || firstMount)) {
                var noticeEle_1 = React.createElement(Notice_1.default, __assign({}, props, { holder: div }));
                createdRef.current[key] = noticeEle_1;
                setElements(function (originElements) {
                    var index = originElements.findIndex(function (ele) { return ele.key === props.key; });
                    if (index === -1) {
                        return __spreadArray(__spreadArray([], originElements, true), [noticeEle_1], false);
                    }
                    var cloneList = __spreadArray([], originElements, true);
                    cloneList[index] = noticeEle_1;
                    return cloneList;
                });
            }
            firstMount = false;
        });
    }
    return [notify, React.createElement(React.Fragment, null, elements)];
}
exports.default = useNotification;
