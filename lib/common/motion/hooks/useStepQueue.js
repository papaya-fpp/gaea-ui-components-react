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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isActive = exports.DoStep = exports.SkipStep = void 0;
var React = __importStar(require("react"));
var interface_1 = require("../interface");
var useIsomorphicLayoutEffect_1 = __importDefault(require("./useIsomorphicLayoutEffect"));
var useNextFrame_1 = __importDefault(require("./useNextFrame"));
var STEP_QUEUE = [
    interface_1.STEP_PREPARE,
    interface_1.STEP_START,
    interface_1.STEP_ACTIVE,
    interface_1.STEP_ACTIVATED,
];
/** Skip current step */
exports.SkipStep = false;
/** Current step should be update in */
exports.DoStep = true;
function isActive(step) {
    return step === interface_1.STEP_ACTIVE || step === interface_1.STEP_ACTIVATED;
}
exports.isActive = isActive;
exports.default = (function (status, callback) {
    var _a = React.useState(interface_1.STEP_NONE), step = _a[0], setStep = _a[1];
    var _b = (0, useNextFrame_1.default)(), nextFrame = _b[0], cancelNextFrame = _b[1];
    function startQueue() {
        setStep(interface_1.STEP_PREPARE);
    }
    (0, useIsomorphicLayoutEffect_1.default)(function () {
        if (step !== interface_1.STEP_NONE && step !== interface_1.STEP_ACTIVATED) {
            var index = STEP_QUEUE.indexOf(step);
            var nextStep_1 = STEP_QUEUE[index + 1];
            var result_1 = callback(step);
            if (result_1 === exports.SkipStep) {
                // Skip when no needed
                setStep(nextStep_1);
            }
            else {
                // Do as frame for step update
                nextFrame(function (info) {
                    function doNext() {
                        // Skip since current queue is ood
                        if (info.isCanceled())
                            return;
                        setStep(nextStep_1);
                    }
                    if (result_1 === true) {
                        doNext();
                    }
                    else {
                        // Only promise should be async
                        Promise.resolve(result_1).then(doNext);
                    }
                });
            }
        }
    }, [status, step]);
    React.useEffect(function () { return function () {
        cancelNextFrame();
    }; }, []);
    return [startQueue, step];
});
