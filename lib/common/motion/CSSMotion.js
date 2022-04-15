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
exports.genCSSMotion = void 0;
/* eslint-disable react/default-props-match-prop-types, react/no-multi-comp, react/prop-types */
var React = __importStar(require("react"));
var react_1 = require("react");
var react_dom_1 = __importDefault(require("react-dom"));
var classnames_1 = __importDefault(require("classnames"));
var motion_1 = require("./util/motion");
var interface_1 = require("./interface");
var useStatus_1 = __importDefault(require("./hooks/useStatus"));
var DomWrapper_1 = __importDefault(require("./DomWrapper"));
var useStepQueue_1 = require("./hooks/useStepQueue");
function fillRef(ref, node) {
    if (typeof ref === 'function') {
        ref(node);
    }
    else if (typeof ref === 'object' && ref && 'current' in ref) {
        ref.current = node;
    }
}
/**
 * Return if a node is a DOM node. Else will return by `findDOMNode`
 */
function findDOMNode(node) {
    if (node instanceof HTMLElement) {
        return node;
    }
    return react_dom_1.default.findDOMNode(node);
}
/**
 * `transitionSupport` is used for none transition test case.
 * Default we use browser transition event support check.
 */
function genCSSMotion(config) {
    var transitionSupport = config;
    if (typeof config === 'object') {
        (transitionSupport = config.transitionSupport);
    }
    function isSupportTransition(props) {
        return !!(props.motionName && transitionSupport);
    }
    var CSSMotion = React.forwardRef(function (props, ref) {
        var _a;
        var 
        // Default config
        _b = props.visible, 
        // Default config
        visible = _b === void 0 ? true : _b, _c = props.removeOnLeave, removeOnLeave = _c === void 0 ? true : _c, forceRender = props.forceRender, children = props.children, motionName = props.motionName, leavedClassName = props.leavedClassName, eventProps = props.eventProps;
        var supportMotion = isSupportTransition(props);
        // Ref to the react node, it may be a HTMLElement
        var nodeRef = (0, react_1.useRef)();
        // Ref to the dom wrapper in case ref can not pass to HTMLElement
        var wrapperNodeRef = (0, react_1.useRef)();
        function getDomElement() {
            try {
                // Here we're avoiding call for findDOMNode since it's deprecated
                // in strict mode. We're calling it only when node ref is not
                // an instance of DOM HTMLElement. Otherwise use
                // findDOMNode as a final resort
                return nodeRef.current instanceof HTMLElement
                    ? nodeRef.current
                    : findDOMNode(wrapperNodeRef.current);
            }
            catch (e) {
                // Only happen when `motionDeadline` trigger but element removed.
                return null;
            }
        }
        var _d = (0, useStatus_1.default)(supportMotion, visible, getDomElement, props), status = _d[0], statusStep = _d[1], statusStyle = _d[2], mergedVisible = _d[3];
        // Record whether content has rendered
        // Will return null for un-rendered even when `removeOnLeave={false}`
        var renderedRef = React.useRef(mergedVisible);
        if (mergedVisible) {
            renderedRef.current = true;
        }
        // ====================== Refs ======================
        var setNodeRef = React.useCallback(function (node) {
            nodeRef.current = node;
            fillRef(ref, node);
        }, []);
        // ===================== Render =====================
        var motionChildren;
        var mergedProps = __assign(__assign({}, eventProps), { visible: visible });
        if (!children) {
            // No children
            motionChildren = null;
        }
        else if (status === interface_1.STATUS_NONE || !isSupportTransition(props)) {
            // Stable children
            if (mergedVisible) {
                motionChildren = children(__assign({}, mergedProps), setNodeRef);
            }
            else if (!removeOnLeave && renderedRef.current) {
                motionChildren = children(__assign(__assign({}, mergedProps), { className: leavedClassName }), setNodeRef);
            }
            else if (forceRender) {
                motionChildren = children(__assign(__assign({}, mergedProps), { style: { display: 'none' } }), setNodeRef);
            }
            else {
                motionChildren = null;
            }
        }
        else {
            // In motion
            var statusSuffix = '';
            if (statusStep === interface_1.STEP_PREPARE) {
                statusSuffix = 'prepare';
            }
            else if ((0, useStepQueue_1.isActive)(statusStep)) {
                statusSuffix = 'active';
            }
            else if (statusStep === interface_1.STEP_START) {
                statusSuffix = 'start';
            }
            motionChildren = children(__assign(__assign({}, mergedProps), { className: (0, classnames_1.default)((0, motion_1.getTransitionName)(motionName, status), (_a = {},
                    _a[(0, motion_1.getTransitionName)(motionName, "".concat(status, "-").concat(statusSuffix))] = statusSuffix,
                    _a[motionName] = typeof motionName === 'string',
                    _a)), style: statusStyle }), setNodeRef);
        }
        return React.createElement(DomWrapper_1.default, { ref: wrapperNodeRef }, motionChildren);
    });
    CSSMotion.displayName = 'CSSMotion';
    return CSSMotion;
}
exports.genCSSMotion = genCSSMotion;
exports.default = genCSSMotion(motion_1.supportTransition);
