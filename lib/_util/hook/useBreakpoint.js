"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var responsiveObserve_1 = require("../../_util/responsiveObserve");
function useBreakpoint() {
    var _a = (0, react_1.useState)({
        xs: true,
        sm: true,
        md: true,
        lg: true,
        xl: true,
        xxl: true,
    }), screens = _a[0], setScreens = _a[1];
    (0, react_1.useEffect)(function () {
        var token = responsiveObserve_1.ResponsiveObserve.subscribe(function (supportScreens) {
            setScreens(supportScreens);
        });
        return function () { return responsiveObserve_1.ResponsiveObserve.unsubscribe(token); };
    }, []);
    return screens;
}
exports.default = useBreakpoint;
