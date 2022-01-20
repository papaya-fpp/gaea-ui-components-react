"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransitionName = exports.transitionEndName = exports.animationEndName = exports.supportTransition = exports.getVendorPrefixedEventName = exports.getVendorPrefixes = void 0;
var canUseDom_1 = __importDefault(require("./canUseDom"));
// ================= Transition =================
// Event wrapper. Copy from react source code
function makePrefixMap(styleProp, eventName) {
    var prefixes = {};
    prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
    prefixes["Webkit".concat(styleProp)] = "webkit".concat(eventName);
    prefixes["Moz".concat(styleProp)] = "moz".concat(eventName);
    prefixes["ms".concat(styleProp)] = "MS".concat(eventName);
    prefixes["O".concat(styleProp)] = "o".concat(eventName.toLowerCase());
    return prefixes;
}
function getVendorPrefixes(domSupport, win) {
    var prefixes = {
        animationend: makePrefixMap('Animation', 'AnimationEnd'),
        transitionend: makePrefixMap('Transition', 'TransitionEnd'),
    };
    if (domSupport) {
        if (!('AnimationEvent' in win)) {
            delete prefixes.animationend.animation;
        }
        if (!('TransitionEvent' in win)) {
            delete prefixes.transitionend.transition;
        }
    }
    return prefixes;
}
exports.getVendorPrefixes = getVendorPrefixes;
var vendorPrefixes = getVendorPrefixes((0, canUseDom_1.default)(), typeof window !== 'undefined' ? window : {});
var style = {};
if ((0, canUseDom_1.default)()) {
    (style = document.createElement('div').style);
}
var prefixedEventNames = {};
function getVendorPrefixedEventName(eventName) {
    if (prefixedEventNames[eventName]) {
        return prefixedEventNames[eventName];
    }
    var prefixMap = vendorPrefixes[eventName];
    if (prefixMap) {
        var stylePropList = Object.keys(prefixMap);
        var len = stylePropList.length;
        for (var i = 0; i < len; i += 1) {
            var styleProp = stylePropList[i];
            if (Object.prototype.hasOwnProperty.call(prefixMap, styleProp) &&
                styleProp in style) {
                prefixedEventNames[eventName] = prefixMap[styleProp];
                return prefixedEventNames[eventName];
            }
        }
    }
    return '';
}
exports.getVendorPrefixedEventName = getVendorPrefixedEventName;
var internalAnimationEndName = getVendorPrefixedEventName('animationend');
var internalTransitionEndName = getVendorPrefixedEventName('transitionend');
exports.supportTransition = !!(internalAnimationEndName && internalTransitionEndName);
exports.animationEndName = internalAnimationEndName || 'animationend';
exports.transitionEndName = internalTransitionEndName || 'transitionend';
function getTransitionName(transitionName, transitionType) {
    if (!transitionName)
        return null;
    if (typeof transitionName === 'object') {
        var type = transitionType.replace(/-\w/g, function (match) {
            return match[1].toUpperCase();
        });
        return transitionName[type];
    }
    return "".concat(transitionName, "-").concat(transitionType);
}
exports.getTransitionName = getTransitionName;
