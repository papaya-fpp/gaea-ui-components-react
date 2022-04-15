"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOnClickOutside = void 0;
var react_1 = require("react");
function useOnClickOutside(ref, callback) {
    (0, react_1.useEffect)(function () {
        function handler(event) {
            var _a;
            if (!((_a = ref.current) === null || _a === void 0 ? void 0 : _a.contains(event.target))) {
                callback();
            }
        }
        window.addEventListener('click', handler);
        return function () { return window.removeEventListener('click', handler); };
    }, [callback, ref]);
}
exports.useOnClickOutside = useOnClickOutside;
