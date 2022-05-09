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
Object.defineProperty(exports, "__esModule", { value: true });
// 删除数组不想要的选项
function omit(obj, fields) {
    var clone = __assign({}, obj);
    if (Array.isArray(fields)) {
        fields.forEach(function (key) {
            delete clone[key];
        });
    }
    return clone;
}
exports.default = omit;
