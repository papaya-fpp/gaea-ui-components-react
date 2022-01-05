"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var context_1 = require("./utils/context");
var responsiveObserve_1 = require("../_util/responsiveObserve");
var FormItem = function (props) {
    var prefixCls = (0, responsiveObserve_1.getPrefixCls)('form');
    var children = props.children, valueschangehandle = props.valueschangehandle, name = props.name, rules = props.rules, validateStatus = props.validateStatus, help = props.help, className = props.className, restProps = __rest(props, ["children", "valueschangehandle", "name", "rules", "validateStatus", "help", "className"]);
    var formContextValue = (0, react_1.useContext)(context_1.formContext);
    var setFieldsValue = formContextValue.setFieldsValue, getFieldsValue = formContextValue.getFieldsValue, getInternalHooks = formContextValue.getInternalHooks;
    var _a = getInternalHooks(), setValidateSubList = _a.setValidateSubList, unValidateSubList = _a.unValidateSubList;
    var _b = (0, react_1.useState)(false), error = _b[0], setError = _b[1];
    var _c = (0, react_1.useState)(''), errorText = _c[0], setErrorText = _c[1];
    var isValid = rules && rules.length > 0;
    var onChange = function (val) {
        var _a;
        var value = (_a = {}, _a[name] = val, _a);
        setFieldsValue(value);
        var values = getFieldsValue();
        valueschangehandle && valueschangehandle(value, values);
        isValid && validateRules();
    };
    var validateRules = function () {
        return new Promise(function (resolve, reject) {
            var value = getFieldsValue()[name];
            var num = 0;
            rules.map(function (item) { return __awaiter(void 0, void 0, void 0, function () {
                var err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!item.required) return [3 /*break*/, 1];
                            if (!value) {
                                setErrorText(item.message);
                                setError(true);
                                return [2 /*return*/, reject({ errors: [item.message], name: name })];
                            }
                            num = num + 1;
                            if (num === rules.length) {
                                setError(false);
                                return [2 /*return*/, resolve(true)];
                            }
                            return [3 /*break*/, 5];
                        case 1:
                            if (!(item.validator && typeof item.validator === 'function')) return [3 /*break*/, 5];
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, item.validator(value)];
                        case 3:
                            _a.sent();
                            num = num + 1;
                            if (num === rules.length) {
                                setError(false);
                                return [2 /*return*/, resolve(true)];
                            }
                            return [3 /*break*/, 5];
                        case 4:
                            err_1 = _a.sent();
                            setErrorText(err_1.message);
                            setError(true);
                            return [2 /*return*/, reject({ errors: [err_1.message], name: name })];
                        case 5: return [2 /*return*/];
                    }
                });
            }); });
        });
    };
    var getControlled = function (childProps) {
        var values = getFieldsValue();
        var control = __assign(__assign({}, childProps), { onChange: onChange });
        if (values[name]) {
            control.value = values[name];
        }
        return control;
    };
    var getItems = function (children) {
        return react_1.default.Children.map(children, function (child, index) {
            var returnChildNode;
            if (react_1.default.isValidElement(child)) {
                returnChildNode = react_1.default.cloneElement(child, getControlled(child.props || {}));
            }
            return react_1.default.createElement(react_1.default.Fragment, null, returnChildNode);
        });
    };
    var getClasses = function () {
        var c_name = "".concat(prefixCls, "-item");
        if (isValid) {
            c_name += " ".concat(prefixCls, "-valid-item");
        }
        if (className) {
            c_name += ' ' + className;
        }
        return error ? c_name + " ".concat(prefixCls, "-item-error") : c_name;
    };
    (0, react_1.useEffect)(function () {
        if (isValid) {
            setValidateSubList(name, validateRules);
        }
        return function () {
            unValidateSubList(name);
        };
    }, [rules]);
    (0, react_1.useEffect)(function () {
        if (validateStatus) {
            setError(validateStatus !== 'success');
            setErrorText(help);
        }
    }, [validateStatus, help]);
    return (react_1.default.createElement("div", { className: getClasses(), id: name },
        getItems(children),
        error && react_1.default.createElement("div", { className: "".concat(prefixCls, "-error-text") }, errorText)));
};
exports.default = FormItem;
