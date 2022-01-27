import React, { useContext, useState, useEffect } from 'react';
import { formContext } from './utils/context';
import { getPrefixCls } from '../_util/responsiveObserve';

const FormItem: React.FC<any> = (props) => {
  const prefixCls = getPrefixCls('form');
  const { children, valueschangehandle, name, rules, validateStatus, help, className, ...restProps } = props;
  const formContextValue = useContext<any>(formContext);
  const { setFieldsValue, getFieldsValue, getInternalHooks } = formContextValue;
  const { setValidateSubList, unValidateSubList } = getInternalHooks();
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const isValid = rules && rules.length > 0;

  const onChange = (val: any) => {
    const value = { [name]: val };
    setFieldsValue(value);
    const values = getFieldsValue();
    valueschangehandle && valueschangehandle(value, values);
    isValid && validateRules();
  };

  const validateRules = () => {
    return new Promise((resolve, reject) => {
      const value = getFieldsValue()[name];
      let num = 0;
      rules.map(async (item: any) => {
        if (item.required) {
          if (!value) {
            setErrorText(item.message);
            setError(true);
            return reject({ errors: [item.message], name });
          }
          num = num + 1;
          if (num === rules.length) {
            setError(false);
            return resolve(true);
          }
          //  新增支持自定义validator函数，参数value
        } else if (item.validator && typeof item.validator === 'function') {
          try {
            await item.validator(value);
            num = num + 1;
            if (num === rules.length) {
              setError(false);
              return resolve(true);
            }
          } catch (err) {
            setErrorText(err.message);
            setError(true);
            return reject({ errors: [err.message], name });
          }
        }
      });
    }).catch(err=>{
      console.log('err',err)
    });
  };

  const getControlled = (childProps: any) => {
    const values = getFieldsValue();
    let control: any = {
      ...childProps,
      onChange
    };
    if (values[name]) {
      control.value = values[name];
    }
    return control;
  };

  const getItems = (children: any) => {
    return React.Children.map(children, (child: React.ReactElement, index: number) => {
      let returnChildNode;
      if (React.isValidElement(child)) {
        returnChildNode = React.cloneElement(child as React.ReactElement, getControlled(child.props || {}));
      }
      return <>{returnChildNode}</>;
    });
  };

  const getClasses = () => {
    let c_name = `${prefixCls}-item`;
    if (isValid) {
      c_name += ` ${prefixCls}-valid-item`;
    }
    if (className) {
      c_name += ' ' + className;
    }
    return error ? c_name + ` ${prefixCls}-item-error` : c_name;
  };

  useEffect(() => {
    if (isValid) {
      setValidateSubList(name, validateRules);
    }
    return () => {
      unValidateSubList(name);
    };
  }, [rules]);

  useEffect(() => {
    if (validateStatus) {
      setError(validateStatus !== 'success');
      setErrorText(help);
    }
  }, [validateStatus, help]);

  return (
    <div className={getClasses()} id={name}>
      {getItems(children)}
      {error && <div className={`${prefixCls}-error-text`}>{errorText}</div>}
    </div>
  );
};

export default FormItem;
