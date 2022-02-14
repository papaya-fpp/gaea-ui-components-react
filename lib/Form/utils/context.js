"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormProvider = exports.formContext = void 0;
var react_1 = __importDefault(require("react"));
exports.formContext = react_1.default.createContext({});
var FormProvider = function (props) {
    return react_1.default.createElement(exports.formContext.Provider, { value: props.value }, props.children);
};
exports.FormProvider = FormProvider;
