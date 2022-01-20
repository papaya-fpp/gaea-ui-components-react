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
var react_1 = require("react");
var interface_1 = require("../interface");
var useState_1 = __importDefault(require("./useState"));
var useIsomorphicLayoutEffect_1 = __importDefault(require("./useIsomorphicLayoutEffect"));
var useStepQueue_1 = __importStar(require("./useStepQueue"));
var useDomMotionEvents_1 = __importDefault(require("./useDomMotionEvents"));
function useStatus(supportMotion, visible, getElement, _a) {
    var _b = _a.motionEnter, motionEnter = _b === void 0 ? true : _b, _c = _a.motionAppear, motionAppear = _c === void 0 ? true : _c, _d = _a.motionLeave, motionLeave = _d === void 0 ? true : _d, motionDeadline = _a.motionDeadline, motionLeaveImmediately = _a.motionLeaveImmediately, onAppearPrepare = _a.onAppearPrepare, onEnterPrepare = _a.onEnterPrepare, onLeavePrepare = _a.onLeavePrepare, onAppearStart = _a.onAppearStart, onEnterStart = _a.onEnterStart, onLeaveStart = _a.onLeaveStart, onAppearActive = _a.onAppearActive, onEnterActive = _a.onEnterActive, onLeaveActive = _a.onLeaveActive, onAppearEnd = _a.onAppearEnd, onEnterEnd = _a.onEnterEnd, onLeaveEnd = _a.onLeaveEnd, onVisibleChanged = _a.onVisibleChanged;
    // Used for outer render usage to avoid `visible: false & status: none` to render nothing
    var _e = (0, useState_1.default)(), asyncVisible = _e[0], setAsyncVisible = _e[1];
    var _f = (0, useState_1.default)(interface_1.STATUS_NONE), status = _f[0], setStatus = _f[1];
    var _g = (0, useState_1.default)(null), style = _g[0], setStyle = _g[1];
    var mountedRef = (0, react_1.useRef)(false);
    var deadlineRef = (0, react_1.useRef)(null);
    var destroyedRef = (0, react_1.useRef)(false);
    // =========================== Dom Node ===========================
    var cacheElementRef = (0, react_1.useRef)(null);
    function getDomElement() {
        var element = getElement();
        return element || cacheElementRef.current;
    }
    // ========================== Motion End ==========================
    var activeRef = (0, react_1.useRef)(false);
    function onInternalMotionEnd(event) {
        var element = getDomElement();
        if (event && !event.deadline && event.target !== element) {
            // event exists
            // not initiated by deadline
            // transitionEnd not fired by inner elements
            return;
        }
        var canEnd;
        if (status === interface_1.STATUS_APPEAR && activeRef.current) {
            canEnd = onAppearEnd === null || onAppearEnd === void 0 ? void 0 : onAppearEnd(element, event);
        }
        else if (status === interface_1.STATUS_ENTER && activeRef.current) {
            canEnd = onEnterEnd === null || onEnterEnd === void 0 ? void 0 : onEnterEnd(element, event);
        }
        else if (status === interface_1.STATUS_LEAVE && activeRef.current) {
            canEnd = onLeaveEnd === null || onLeaveEnd === void 0 ? void 0 : onLeaveEnd(element, event);
        }
        // Only update status when `canEnd` and not destroyed
        if (canEnd !== false && !destroyedRef.current) {
            setStatus(interface_1.STATUS_NONE);
            setStyle(null);
        }
    }
    var patchMotionEvents = (0, useDomMotionEvents_1.default)(onInternalMotionEnd)[0];
    // ============================= Step =============================
    var eventHandlers = React.useMemo(function () {
        var _a, _b, _c;
        switch (status) {
            case interface_1.STATUS_APPEAR:
                return _a = {},
                    _a[interface_1.STEP_PREPARE] = onAppearPrepare,
                    _a[interface_1.STEP_START] = onAppearStart,
                    _a[interface_1.STEP_ACTIVE] = onAppearActive,
                    _a;
            case interface_1.STATUS_ENTER:
                return _b = {},
                    _b[interface_1.STEP_PREPARE] = onEnterPrepare,
                    _b[interface_1.STEP_START] = onEnterStart,
                    _b[interface_1.STEP_ACTIVE] = onEnterActive,
                    _b;
            case interface_1.STATUS_LEAVE:
                return _c = {},
                    _c[interface_1.STEP_PREPARE] = onLeavePrepare,
                    _c[interface_1.STEP_START] = onLeaveStart,
                    _c[interface_1.STEP_ACTIVE] = onLeaveActive,
                    _c;
            default:
                return {};
        }
    }, [status]);
    var _h = (0, useStepQueue_1.default)(status, function (newStep) {
        var _a;
        // Only prepare step can be skip
        if (newStep === interface_1.STEP_PREPARE) {
            var onPrepare = eventHandlers[interface_1.STEP_PREPARE];
            if (!onPrepare) {
                return useStepQueue_1.SkipStep;
            }
            return onPrepare(getDomElement());
        }
        // Rest step is sync update
        if (step in eventHandlers) {
            setStyle(((_a = eventHandlers[step]) === null || _a === void 0 ? void 0 : _a.call(eventHandlers, getDomElement(), null)) || null);
        }
        if (step === interface_1.STEP_ACTIVE) {
            // Patch events when motion needed
            patchMotionEvents(getDomElement());
            if (motionDeadline && motionDeadline > 0) {
                clearTimeout(deadlineRef.current);
                deadlineRef.current = setTimeout(function () {
                    onInternalMotionEnd({
                        deadline: true,
                    });
                }, motionDeadline);
            }
        }
        return useStepQueue_1.DoStep;
    }), startStep = _h[0], step = _h[1];
    var active = (0, useStepQueue_1.isActive)(step);
    activeRef.current = active;
    // ============================ Status ============================
    // Update with new status
    (0, useIsomorphicLayoutEffect_1.default)(function () {
        setAsyncVisible(visible);
        var isMounted = mountedRef.current;
        mountedRef.current = true;
        if (!supportMotion) {
            return;
        }
        var nextStatus = '';
        // Appear
        if (!isMounted && visible && motionAppear) {
            nextStatus = interface_1.STATUS_APPEAR;
        }
        // Enter
        if (isMounted && visible && motionEnter) {
            nextStatus = interface_1.STATUS_ENTER;
        }
        // Leave
        if ((isMounted && !visible && motionLeave) ||
            (!isMounted && motionLeaveImmediately && !visible && motionLeave)) {
            nextStatus = interface_1.STATUS_LEAVE;
        }
        // Update to next status
        if (nextStatus) {
            setStatus(nextStatus);
            startStep();
        }
    }, [visible]);
    // ============================ Effect ============================
    // Reset when motion changed
    (0, react_1.useEffect)(function () {
        if (
        // Cancel appear
        (status === interface_1.STATUS_APPEAR && !motionAppear) ||
            // Cancel enter
            (status === interface_1.STATUS_ENTER && !motionEnter) ||
            // Cancel leave
            (status === interface_1.STATUS_LEAVE && !motionLeave)) {
            setStatus(interface_1.STATUS_NONE);
        }
    }, [motionAppear, motionEnter, motionLeave]);
    (0, react_1.useEffect)(function () { return function () {
        clearTimeout(deadlineRef.current);
        destroyedRef.current = true;
    }; }, []);
    // Trigger `onVisibleChanged`
    (0, react_1.useEffect)(function () {
        if (asyncVisible !== undefined && status === interface_1.STATUS_NONE) {
            onVisibleChanged === null || onVisibleChanged === void 0 ? void 0 : onVisibleChanged(asyncVisible);
        }
    }, [asyncVisible, status]);
    // ============================ Styles ============================
    var mergedStyle = style;
    if (eventHandlers[interface_1.STEP_PREPARE] && step === interface_1.STEP_START) {
        mergedStyle = __assign({ transition: 'none' }, mergedStyle);
    }
    return [status, step, mergedStyle, asyncVisible !== null && asyncVisible !== void 0 ? asyncVisible : visible];
}
exports.default = useStatus;
