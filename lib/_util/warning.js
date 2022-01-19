"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteOnce = exports.warningOnce = exports.call = exports.resetWarned = exports.note = exports.warning = void 0;
/* eslint-disable no-console */
var warned = {};
function warning(valid, message) {
    // Support uglify
    if (process.env.NODE_ENV !== 'production' && !valid && console !== undefined) {
        console.error("Warning: ".concat(message));
    }
}
exports.warning = warning;
function note(valid, message) {
    // Support uglify
    if (process.env.NODE_ENV !== 'production' && !valid && console !== undefined) {
        console.warn("Note: ".concat(message));
    }
}
exports.note = note;
function resetWarned() {
    warned = {};
}
exports.resetWarned = resetWarned;
function call(method, valid, message) {
    if (!valid && !warned[message]) {
        method(false, message);
        warned[message] = true;
    }
}
exports.call = call;
function warningOnce(valid, message) {
    call(warning, valid, message);
}
exports.warningOnce = warningOnce;
function noteOnce(valid, message) {
    call(note, valid, message);
}
exports.noteOnce = noteOnce;
exports.default = warningOnce;
/* eslint-enable */ 
