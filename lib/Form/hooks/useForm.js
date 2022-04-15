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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormStore = void 0;
var React = __importStar(require("react"));
var valueUtil_1 = require("../utils/valueUtil");
var FormStore = /** @class */ (function () {
    function FormStore(forceRootUpdate) {
        var _this = this;
        this.store = {};
        this.initialValues = {};
        this.subscribable = {};
        this.setInitialValues = function (initialValues, init) {
            _this.initialValues = initialValues || {};
            if (init) {
                _this.store = (0, valueUtil_1.setValues)({}, initialValues, _this.store);
            }
        };
        this.setValidateSubList = function (name, valid) {
            // if (!this.subscribable[name]) {
            //   this.subscribable[name] = valid
            // }
            _this.subscribable[name] = valid;
        };
        this.unValidateSubList = function (name) {
            if (_this.subscribable[name]) {
                _this.subscribable[name] = null;
                delete _this.subscribable[name];
            }
        };
        this.getForm = function () { return ({
            getFieldsValue: _this.getFieldsValue,
            setFieldsValue: _this.setFieldsValue,
            validateFields: _this.validateFields,
            getInternalHooks: _this.getInternalHooks
        }); };
        this.getInternalHooks = function () {
            return {
                setInitialValues: _this.setInitialValues,
                setValidateSubList: _this.setValidateSubList,
                unValidateSubList: _this.unValidateSubList
            };
        };
        this.getFieldsValue = function () {
            return __assign({}, _this.store);
        };
        this.setFieldsValue = function (store) {
            var prevStore = _this.store;
            if (store) {
                _this.store = (0, valueUtil_1.setValues)(prevStore, store);
                var keys = Object.keys(_this.store);
                for (var i = 0; i < keys.length; i++) {
                    if (_this.store[keys[i]]) {
                        if (_this.store[keys[i]] !== prevStore[keys[i]]) {
                            _this.subscribable[keys[i]] && _this.subscribable[keys[i]]();
                        }
                    }
                }
                _this.notifyObservers();
            }
        };
        this.promiseAll = function (promise) {
            return new Promise(function (resolve, reject) {
                var successlist = [];
                var errorlist = [];
                var len = promise.length;
                for (var i = 0; i < promise.length; i++) {
                    promise[i]
                        .then(function (res) {
                        successlist.push(res);
                        if (successlist.length === len) {
                            resolve(successlist);
                        }
                    })
                        .catch(function (err) {
                        errorlist.push(err);
                        if (successlist.length + errorlist.length === len) {
                            reject(errorlist);
                        }
                    });
                }
            });
        };
        this.validateFields = function (arr) {
            var validate = _this.subscribable;
            var list = [];
            if (arr && arr.length > 0) {
                for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                    var validItem = arr_1[_i];
                    list.push(validate[validItem]());
                }
            }
            else {
                for (var valid in validate) {
                    list.push(validate[valid]());
                }
            }
            return _this.promiseAll(list)
                .then(function (res) {
                return Promise.resolve(res);
            })
                .catch(function (errorFields) {
                return Promise.reject({ errorFields: errorFields });
            });
        };
        this.notifyObservers = function () {
            _this.forceRootUpdate();
        };
        this.forceRootUpdate = forceRootUpdate;
    }
    return FormStore;
}());
exports.FormStore = FormStore;
function useForm(form) {
    var formRef = React.useRef();
    var _a = React.useState({}), forceUpdate = _a[1];
    if (!formRef.current) {
        if (form) {
            formRef.current = form;
        }
        else {
            var forceReRender = function () {
                forceUpdate({});
            };
            var formStore = new FormStore(forceReRender);
            formRef.current = formStore.getForm();
        }
    }
    return [formRef.current];
}
exports.default = useForm;
