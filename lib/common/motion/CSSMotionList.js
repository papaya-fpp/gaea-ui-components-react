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
exports.genCSSMotionList = void 0;
/* eslint react/prop-types: 0 */
var React = __importStar(require("react"));
var CSSMotion_1 = __importDefault(require("./CSSMotion"));
var motion_1 = require("./util/motion");
var diff_1 = require("./util/diff");
var MOTION_PROP_NAMES = [
    'eventProps',
    'visible',
    'children',
    'motionName',
    'motionAppear',
    'motionEnter',
    'motionLeave',
    'motionLeaveImmediately',
    'motionDeadline',
    'removeOnLeave',
    'leavedClassName',
    'onAppearStart',
    'onAppearActive',
    'onAppearEnd',
    'onEnterStart',
    'onEnterActive',
    'onEnterEnd',
    'onLeaveStart',
    'onLeaveActive',
    'onLeaveEnd',
];
/**
 * Generate a CSSMotionList component with config
 * @param transitionSupport No need since CSSMotionList no longer depends on transition support
 * @param CSSMotion CSSMotion component
 */
function genCSSMotionList(transitionSupport, CSSMotion) {
    if (CSSMotion === void 0) { CSSMotion = CSSMotion_1.default; }
    var CSSMotionList = /** @class */ (function (_super) {
        __extends(CSSMotionList, _super);
        function CSSMotionList() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = {
                keyEntities: [],
            };
            _this.removeKey = function (removeKey) {
                _this.setState(function (_a) {
                    var keyEntities = _a.keyEntities;
                    return ({
                        keyEntities: keyEntities.map(function (entity) {
                            if (entity.key !== removeKey)
                                return entity;
                            return __assign(__assign({}, entity), { status: diff_1.STATUS_REMOVED });
                        }),
                    });
                });
            };
            return _this;
        }
        CSSMotionList.getDerivedStateFromProps = function (_a, _b) {
            var keys = _a.keys;
            var keyEntities = _b.keyEntities;
            var parsedKeyObjects = (0, diff_1.parseKeys)(keys);
            var mixedKeyEntities = (0, diff_1.diffKeys)(keyEntities, parsedKeyObjects);
            return {
                keyEntities: mixedKeyEntities.filter(function (entity) {
                    var prevEntity = keyEntities.find(function (_a) {
                        var key = _a.key;
                        return entity.key === key;
                    });
                    // Remove if already mark as removed
                    if (prevEntity &&
                        prevEntity.status === diff_1.STATUS_REMOVED &&
                        entity.status === diff_1.STATUS_REMOVE) {
                        return false;
                    }
                    return true;
                }),
            };
        };
        CSSMotionList.prototype.render = function () {
            var _this = this;
            var keyEntities = this.state.keyEntities;
            var _a = this.props, component = _a.component, children = _a.children, onVisibleChanged = _a.onVisibleChanged, restProps = __rest(_a, ["component", "children", "onVisibleChanged"]);
            var Component = component || React.Fragment;
            var motionProps = {};
            MOTION_PROP_NAMES.forEach(function (prop) {
                motionProps[prop] = restProps[prop];
                delete restProps[prop];
            });
            delete restProps.keys;
            return (React.createElement(Component, __assign({}, restProps), keyEntities.map(function (_a) {
                var status = _a.status, eventProps = __rest(_a, ["status"]);
                var visible = status === diff_1.STATUS_ADD || status === diff_1.STATUS_KEEP;
                return (React.createElement(CSSMotion, __assign({}, motionProps, { key: eventProps.key, visible: visible, eventProps: eventProps, onVisibleChanged: function (changedVisible) {
                        onVisibleChanged === null || onVisibleChanged === void 0 ? void 0 : onVisibleChanged(changedVisible, { key: eventProps.key });
                        if (!changedVisible) {
                            _this.removeKey(eventProps.key);
                        }
                    } }), children));
            })));
        };
        CSSMotionList.defaultProps = {
            component: 'div',
        };
        return CSSMotionList;
    }(React.Component));
    return CSSMotionList;
}
exports.genCSSMotionList = genCSSMotionList;
exports.default = genCSSMotionList(motion_1.supportTransition);
