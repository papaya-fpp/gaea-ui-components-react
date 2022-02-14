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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var useForm_1 = __importDefault(require("./hooks/useForm"));
var context_1 = require("./utils/context");
var FormItem_1 = __importDefault(require("./FormItem"));
var responsiveObserve_1 = require("../_util/responsiveObserve");
var Form = function (props) {
    var prefixCls = (0, responsiveObserve_1.getPrefixCls)('form');
    var form = props.form, children = props.children, _a = props.initialValues, initialValues = _a === void 0 ? {} : _a, onValuesChange = props.onValuesChange;
    var formInstance = (0, useForm_1.default)(form)[0];
    var setInitialValues = formInstance.getInternalHooks().setInitialValues;
    // 初始化 initvalues
    var mountRef = react_1.default.useRef(null);
    setInitialValues(initialValues, !mountRef.current);
    if (!mountRef.current) {
        mountRef.current = true;
    }
    var getItems = function (children) {
        return react_1.default.Children.map(children, function (child) {
            if (!child)
                return null;
            var childrenProps = __assign({}, child.props);
            if (child.type === FormItem_1.default) {
                childrenProps.valueschangehandle = onValuesChange;
                return react_1.default.cloneElement(child, childrenProps);
            }
            else {
                if (childrenProps.children) {
                    childrenProps.children = getItems(childrenProps.children);
                    return react_1.default.cloneElement(child, childrenProps);
                }
                else {
                    return child;
                }
            }
        });
    };
    var formContextValue = react_1.default.useMemo(function () { return (__assign({}, formInstance)); }, [formInstance]);
    return (react_1.default.createElement(context_1.FormProvider, { value: formContextValue },
        react_1.default.createElement("form", { className: "".concat(prefixCls, "-wrapper") }, getItems(children))));
};
Form.Item = FormItem_1.default;
Form.useForm = useForm_1.default;
exports.default = Form;
