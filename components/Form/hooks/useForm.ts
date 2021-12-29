import * as React from 'react';
import { setValues } from '../utils/valueUtil';
export class FormStore {
  private forceRootUpdate: () => void;

  private store = {};

  private initialValues = {};

  private subscribable = {};

  constructor(forceRootUpdate: () => void) {
    this.forceRootUpdate = forceRootUpdate;
  }

  private setInitialValues = (initialValues: any, init: boolean) => {
    this.initialValues = initialValues || {};
    if (init) {
      this.store = setValues({}, initialValues, this.store);
    }
  };

  private setValidateSubList = (name: any, valid: any) => {
    // if (!this.subscribable[name]) {
    //   this.subscribable[name] = valid
    // }
    this.subscribable[name] = valid;
  };

  private unValidateSubList = (name: any) => {
    if (this.subscribable[name]) {
      this.subscribable[name] = null;
      delete this.subscribable[name];
    }
  };

  public getForm = () => ({
    getFieldsValue: this.getFieldsValue,
    setFieldsValue: this.setFieldsValue,
    validateFields: this.validateFields,
    getInternalHooks: this.getInternalHooks
  });

  private getInternalHooks = () => {
    return {
      setInitialValues: this.setInitialValues,
      setValidateSubList: this.setValidateSubList,
      unValidateSubList: this.unValidateSubList
    };
  };

  private getFieldsValue = () => {
    return { ...this.store };
  };

  private setFieldsValue = (store: any) => {
    const prevStore = this.store;
    if (store) {
      this.store = setValues(prevStore, store);
      const keys = Object.keys(this.store);
      for (let i = 0; i < keys.length; i++) {
        if (this.store[keys[i]]) {
          if (this.store[keys[i]] !== prevStore[keys[i]]) {
            this.subscribable[keys[i]] && this.subscribable[keys[i]]();
          }
        }
      }

      this.notifyObservers();
    }
  };

  private promiseAll = (promise: any) => {
    return new Promise((resolve, reject) => {
      const successlist: any = [];
      const errorlist: any = [];
      const len = promise.length;
      for (let i = 0; i < promise.length; i++) {
        promise[i]
          .then((res: any) => {
            successlist.push(res);
            if (successlist.length === len) {
              resolve(successlist);
            }
          })
          .catch((err: any) => {
            errorlist.push(err);
            if (successlist.length + errorlist.length === len) {
              reject(errorlist);
            }
          });
      }
    });
  };

  private validateFields = (arr:string[]) => {
    const validate = this.subscribable;
    let list: any = [];
    if(arr&&arr.length>0){
      for (let validItem of arr) {
        list.push(validate[validItem]());
      }
    }else {
      for (let valid in validate) {
        list.push(validate[valid]());
      }
    }
    return this.promiseAll(list)
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((errorFields) => {
        return Promise.reject({ errorFields });
      });
  };

  private notifyObservers = () => {
    this.forceRootUpdate();
  };
}

export default function useForm(form?: any) {
  const formRef = React.useRef<any>();
  const [, forceUpdate] = React.useState({});

  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      const forceReRender = () => {
        forceUpdate({});
      };

      const formStore: FormStore = new FormStore(forceReRender);

      formRef.current = formStore.getForm();
    }
  }

  return [formRef.current];
}
