"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetScroll = exports.fixedScroll = void 0;
var fixedScroll = function () {
    var body = document.body, documentElement = document.documentElement;
    var scale = window.__scale || 1;
    var scrollTop = body.scrollTop || documentElement.scrollTop;
    body.style.cssText += "position:fixed;width:100%;top:-".concat(scrollTop / scale, "px!important;");
};
exports.fixedScroll = fixedScroll;
var resetScroll = function () {
    var body = document.body, documentElement = document.documentElement;
    var scale = window.__scale || 1;
    body.style.position = '';
    var top = body.style.top;
    // 确认 top 值存在时再进行重置，否则在使用时，组件初次渲染进行调用时会有问题
    if (top) {
        body.scrollTop = -parseInt(top, 10) * scale;
        documentElement.scrollTop = -parseInt(top, 10) * scale;
        body.style.top = '';
    }
};
exports.resetScroll = resetScroll;
