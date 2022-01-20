"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var raf = function (callback) { return +setTimeout(callback, 16); };
var caf = function (num) { return clearTimeout(num); };
if (typeof window !== 'undefined' && 'requestAnimationFrame' in window) {
    raf = function (callback) {
        return window.requestAnimationFrame(callback);
    };
    caf = function (handle) { return window.cancelAnimationFrame(handle); };
}
var rafUUID = 0;
var rafIds = new Map();
function cleanup(id) {
    rafIds.delete(id);
}
function wrapperRaf(callback, times) {
    if (times === void 0) { times = 1; }
    rafUUID += 1;
    var id = rafUUID;
    function callRef(leftTimes) {
        if (leftTimes === 0) {
            // Clean up
            cleanup(id);
            // Trigger
            callback();
        }
        else {
            // Next raf
            var realId = raf(function () {
                callRef(leftTimes - 1);
            });
            // Bind real raf id
            rafIds.set(id, realId);
        }
    }
    callRef(times);
    return id;
}
exports.default = wrapperRaf;
wrapperRaf.cancel = function (id) {
    var realId = rafIds.get(id);
    cleanup(realId);
    return caf(realId);
};
