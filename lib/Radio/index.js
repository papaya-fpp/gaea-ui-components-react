"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = exports.Button = void 0;
var Radio_1 = __importDefault(require("./Radio"));
var Group_1 = __importDefault(require("./Group"));
exports.Group = Group_1.default;
var RadioButton_1 = __importDefault(require("./RadioButton"));
exports.Button = RadioButton_1.default;
var Radio = Radio_1.default;
Radio.Button = RadioButton_1.default;
Radio.Group = Group_1.default;
exports.default = Radio;
