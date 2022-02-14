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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_1 = require("react");
var motion_1 = require("../util/motion");
exports.default = (function (callback) {
    var cacheElementRef = (0, react_1.useRef)();
    // Cache callback
    var callbackRef = (0, react_1.useRef)(callback);
    callbackRef.current = callback;
    // Internal motion event handler
    var onInternalMotionEnd = React.useCallback(function (event) {
        callbackRef.current(event);
    }, []);
    // Remove events
    function removeMotionEvents(element) {
        if (element) {
            element.removeEventListener(motion_1.transitionEndName, onInternalMotionEnd);
            element.removeEventListener(motion_1.animationEndName, onInternalMotionEnd);
        }
    }
    // Patch events
    function patchMotionEvents(element) {
        if (cacheElementRef.current && cacheElementRef.current !== element) {
            removeMotionEvents(cacheElementRef.current);
        }
        if (element && element !== cacheElementRef.current) {
            element.addEventListener(motion_1.transitionEndName, onInternalMotionEnd);
            element.addEventListener(motion_1.animationEndName, onInternalMotionEnd);
            // Save as cache in case dom removed trigger by `motionDeadline`
            cacheElementRef.current = element;
        }
    }
    // Clean up when removed
    React.useEffect(function () { return function () {
        removeMotionEvents(cacheElementRef.current);
    }; }, []);
    return [patchMotionEvents, removeMotionEvents];
});
