"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useMountStatus(defaultValue) {
    var destroyRef = (0, react_1.useRef)(false);
    var _a = (0, react_1.useState)(defaultValue), val = _a[0], setVal = _a[1];
    function setValue(next) {
        if (!destroyRef.current) {
            setVal(next);
        }
    }
    (0, react_1.useEffect)(function () { return function () {
        destroyRef.current = true;
    }; }, []);
    return [val, setValue];
}
exports.default = useMountStatus;
