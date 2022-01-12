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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = void 0;
var react_1 = __importStar(require("react"));
var Icon_1 = __importDefault(require("../Icon"));
var responsiveObserve_1 = require("../_util/responsiveObserve");
/**
 * Primary UI component for user interaction
 */
var Input = function (_a) {
    var _b = _a.label, label = _b === void 0 ? '' : _b, _c = _a.placeholder, placeholder = _c === void 0 ? '' : _c, prefix = _a.prefix, suffix = _a.suffix, passwordIcon = _a.passwordIcon, groupAddon = _a.groupAddon, verificationCode = _a.verificationCode, // 验证码
    _d = _a.verificationCodeTime, // 验证码
    verificationCodeTime = _d === void 0 ? 60 : _d, // 验证码倒计时间
    _e = _a.verificationCodeText, // 验证码倒计时间
    verificationCodeText = _e === void 0 ? '发送验证码' : _e, // 验证码
    sendVerificationCode = _a.sendVerificationCode, // 发送验证码
    verificationCodeLoading = _a.verificationCodeLoading, // 发送验证码
    verificationCodeTrgger = _a.verificationCodeTrgger, // 发送验证码
    _f = _a.type, // 发送验证码
    type = _f === void 0 ? 'text' : _f, _g = _a.name, name = _g === void 0 ? '' : _g, _h = _a.value, value = _h === void 0 ? '' : _h, _j = _a.size, size = _j === void 0 ? '' : _j, _k = _a.error, error = _k === void 0 ? false : _k, onAddon = _a.onAddon, onChange = _a.onChange, onBlur = _a.onBlur, onFocus = _a.onFocus, _l = _a.className, className = _l === void 0 ? '' : _l, _m = _a.errorText, errorText = _m === void 0 ? '' : _m, _o = _a.disabled, disabled = _o === void 0 ? false : _o, _p = _a.allowClear, allowClear = _p === void 0 ? false : _p, maxLength = _a.maxLength, fixed = _a.fixed, onlyPpositive = _a.onlyPpositive, _q = _a.id, id = _q === void 0 ? '' : _q, _r = _a.ref, ref = _r === void 0 ? null : _r, props = __rest(_a, ["label", "placeholder", "prefix", "suffix", "passwordIcon", "groupAddon", "verificationCode", "verificationCodeTime", "verificationCodeText", "sendVerificationCode", "verificationCodeLoading", "verificationCodeTrgger", "type", "name", "value", "size", "error", "onAddon", "onChange", "onBlur", "onFocus", "className", "errorText", "disabled", "allowClear", "maxLength", "fixed", "onlyPpositive", "id", "ref"]);
    var prefixClsInput = (0, responsiveObserve_1.getPrefixCls)('input');
    var prefixClsTextarea = (0, responsiveObserve_1.getPrefixCls)('textarea');
    var _s = (0, react_1.useState)(value || ''), val = _s[0], setVal = _s[1];
    var _t = (0, react_1.useState)(type), typeTemp = _t[0], setTypeTemp = _t[1];
    var _u = (0, react_1.useState)(false), verificationCodeDisabled = _u[0], setVerificationCodeDisabled = _u[1];
    var _v = (0, react_1.useState)(+verificationCodeTime), verificationCodeTimeTemp = _v[0], setVerificationCodeTimeTemp = _v[1];
    var _w = (0, react_1.useState)(verificationCodeText), verificationCodeTextTemp = _w[0], setVerificationCodeTextTemp = _w[1];
    var timeChangeRef = (0, react_1.useRef)(null);
    var numberReg = /^[0-9]+\.?[0-9]*/;
    var setValueHandle = function (value) {
        var val = value.toString();
        // if (value === '') return setVal(val);
        if (type === 'number') {
            var valAry = val.match(numberReg);
            val = valAry ? valAry[0] : 0;
            if (maxLength) {
                val = val.length > maxLength ? val.slice(0, maxLength) : val;
            }
            if (fixed) {
                if (val.split('.')[1] && val.split('.')[1].length > fixed) {
                    val = Math.floor(val * 100) / 100;
                }
            }
            if (onlyPpositive) {
                val = Number(val) < 0 ? 0 : val;
            }
        }
        setVal(val);
        onChange && onChange(val);
    };
    var handleClear = function () {
        setValueHandle('');
    };
    var clearIntervalEvent = function () {
        clearInterval(timeChangeRef.current);
    };
    var setIntervalEvent = function () {
        timeChangeRef.current = setInterval(function () {
            setVerificationCodeTimeTemp(function (t) { return --t; });
        }, 1000);
    };
    var handleClickVerificationCode = function () {
        sendVerificationCode();
    };
    (0, react_1.useEffect)(function () {
        // 注意，不要使用 setTime(t-1) ： 闭包问题会导致time一直为59
        if (verificationCodeTrgger) { //当触发接口成功之后,再倒计时,否则一直loading
            setIntervalEvent();
            setVerificationCodeDisabled(true);
        }
    }, [verificationCodeTrgger]);
    (0, react_1.useEffect)(function () {
        clearIntervalEvent();
        return function () { return clearIntervalEvent(); };
    }, []);
    (0, react_1.useEffect)(function () {
        setVal(value); // todo 打开之后有bug,form表单默认有值的情况下 清除剩最后一个字符的时候 再点击删除 会将初始值重新赋值过来
    }, [value]);
    (0, react_1.useEffect)(function () {
        setTypeTemp(type);
    }, [type]);
    (0, react_1.useEffect)(function () {
        setVerificationCodeTextTemp(verificationCodeText);
    }, [verificationCodeText]);
    (0, react_1.useEffect)(function () {
        if ((verificationCodeTimeTemp > 0) && (verificationCodeTimeTemp < +verificationCodeTime)) {
            setVerificationCodeTextTemp("".concat(verificationCodeTimeTemp, "s\u540E\u91CD\u53D1"));
        }
        else {
            clearIntervalEvent();
            setVerificationCodeTextTemp(verificationCodeText);
            setVerificationCodeDisabled(false);
            setVerificationCodeTimeTemp(+verificationCodeTime);
        }
    }, [verificationCodeTimeTemp]);
    return (react_1.default.createElement("div", { className: "".concat(prefixClsInput, "-body ").concat(className) },
        label && (react_1.default.createElement("div", { className: "".concat(prefixClsInput, "-label") + (label != '' ? '' : ' is-hide') }, label + ' :')),
        type === 'textarea' ? (react_1.default.createElement("div", { className: "".concat(prefixClsTextarea) + " ".concat(size) + (error ? ' error' : '') + (disabled ? ' disabled' : '') },
            react_1.default.createElement("textarea", { className: "".concat(prefixClsTextarea, "-affix-wrapper"), ref: ref, placeholder: placeholder, id: id, name: name, disabled: disabled, value: val, maxLength: maxLength, onFocus: function () {
                    if (onFocus) {
                        onFocus();
                    }
                }, onBlur: function (e) {
                    if (onBlur) {
                        onBlur(e.target.value);
                    }
                }, onChange: function (e) {
                    setValueHandle(e.target.value);
                } }))) : (react_1.default.createElement("div", { className: "".concat(prefixClsInput) + " ".concat(size) + (error ? ' error' : '') + (disabled ? ' disabled' : '') },
            react_1.default.createElement("div", { className: "".concat(prefixClsInput, "-wrapper") + (groupAddon ? " ".concat(prefixClsInput, "-group") : '') },
                react_1.default.createElement("div", { className: "".concat(prefixClsInput, "-affix-wrapper") },
                    prefix && react_1.default.createElement(Icon_1.default, { className: "".concat(prefixClsInput, "-prefix"), name: prefix }),
                    react_1.default.createElement("input", { ref: ref, placeholder: placeholder, type: typeTemp === 'number' ? 'text' : typeTemp, id: id, name: name, disabled: disabled, value: val, maxLength: maxLength, onFocus: function () {
                            if (onFocus) {
                                onFocus();
                            }
                        }, onBlur: function (e) {
                            if (onBlur) {
                                onBlur(e.target.value);
                            }
                        }, onChange: function (e) {
                            setValueHandle(e.target.value);
                        } }),
                    react_1.default.createElement("div", { className: "".concat(prefixClsInput, "-all-icon") },
                        val && allowClear && !disabled && (react_1.default.createElement(Icon_1.default, { className: ["".concat(prefixClsInput, "-clear"), passwordIcon ? "".concat(prefixClsInput, "-clear-space") : ''].join(' '), onClick: handleClear, name: "guanbi1" })),
                        !passwordIcon && suffix && (react_1.default.createElement(Icon_1.default, { className: "".concat(prefixClsInput, "-suffix"), name: suffix })),
                        passwordIcon && (react_1.default.createElement("span", null,
                            typeTemp === 'password' && (react_1.default.createElement(Icon_1.default, { onClick: function () {
                                    setTypeTemp('text');
                                }, className: "".concat(prefixClsInput, "-suffix"), name: "zhengyan" })),
                            typeTemp !== 'password' && (react_1.default.createElement(Icon_1.default, { onClick: function () {
                                    setTypeTemp('password');
                                }, className: "".concat(prefixClsInput, "-suffix"), name: "biyan" })))),
                        verificationCode && (react_1.default.createElement("div", { onClick: function () { !verificationCodeDisabled && handleClickVerificationCode(); }, className: ["".concat(prefixClsInput, "-verification-code"), (verificationCodeDisabled || verificationCodeLoading) ? "".concat(prefixClsInput, "-verification-disabled") : ''].join(' ') },
                            verificationCodeLoading && react_1.default.createElement(Icon_1.default, { className: ["".concat(prefixClsInput, "-loading-icon")].join(' '), name: "Spinnerjiazai1" }),
                            verificationCodeTextTemp)))),
                groupAddon && (react_1.default.createElement("div", { onClick: onAddon, className: "".concat(prefixClsInput, "-group-addon") },
                    react_1.default.createElement(Icon_1.default, { name: groupAddon })))))),
        react_1.default.createElement("div", { className: 'error-text' + (errorText != '' ? '' : ' is-hide') }, errorText)));
};
exports.Input = Input;
exports.default = exports.Input;
