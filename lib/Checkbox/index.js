"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Checkbox_1 = __importDefault(require("./Checkbox"));
var Group_1 = __importDefault(require("./Group"));
var Checkbox = Checkbox_1.default;
Checkbox.Group = Group_1.default;
exports.default = Checkbox;
