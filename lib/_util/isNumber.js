"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isNumeric = function (value) { return !isNaN(parseFloat(value)) && isFinite(value); };
exports.default = isNumeric;
