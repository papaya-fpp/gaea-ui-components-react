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
var React = __importStar(require("react"));
var raf_1 = __importDefault(require("../util/raf"));
exports.default = (function () {
    var nextFrameRef = React.useRef(null);
    function cancelNextFrame() {
        raf_1.default.cancel(nextFrameRef.current);
    }
    function nextFrame(callback, delay) {
        if (delay === void 0) { delay = 2; }
        cancelNextFrame();
        var nextFrameId = (0, raf_1.default)(function () {
            if (delay <= 1) {
                callback({ isCanceled: function () { return nextFrameId !== nextFrameRef.current; } });
            }
            else {
                nextFrame(callback, delay - 1);
            }
        });
        nextFrameRef.current = nextFrameId;
    }
    React.useEffect(function () { return function () {
        cancelNextFrame();
    }; }, []);
    return [nextFrame, cancelNextFrame];
});
