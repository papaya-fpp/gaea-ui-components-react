"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
function useControlledState(defaultStateValue, option) {
    var _a = option || {}, defaultValue = _a.defaultValue, value = _a.value, onChange = _a.onChange, postState = _a.postState;
    var _b = React.useState(function () {
        if (value !== undefined) {
            return value;
        }
        if (defaultValue !== undefined) {
            return typeof defaultValue === 'function'
                ? defaultValue()
                : defaultValue;
        }
        return typeof defaultStateValue === 'function'
            ? defaultStateValue()
            : defaultStateValue;
    }), innerValue = _b[0], setInnerValue = _b[1];
    var mergedValue = value !== undefined ? value : innerValue;
    if (postState) {
        mergedValue = postState(mergedValue);
    }
    // setState
    var onChangeRef = React.useRef(onChange);
    onChangeRef.current = onChange;
    var triggerChange = React.useCallback(function (newValue) {
        setInnerValue(newValue);
        if (mergedValue !== newValue && onChangeRef.current) {
            onChangeRef.current(newValue, mergedValue);
        }
    }, [mergedValue, onChangeRef]);
    // Effect of reset value to `undefined`
    var firstRenderRef = React.useRef(true);
    React.useEffect(function () {
        if (firstRenderRef.current) {
            firstRenderRef.current = false;
            return;
        }
        if (value === undefined) {
            setInnerValue(value);
        }
    }, [value]);
    return [mergedValue, triggerChange];
}
exports.default = useControlledState;
