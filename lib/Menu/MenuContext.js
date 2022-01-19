"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var MenuContext = (0, react_1.createContext)({
    firstLevel: true,
    inlineCollapsed: false,
    selectedKeys: '',
    openKeys: [],
});
exports.default = MenuContext;
