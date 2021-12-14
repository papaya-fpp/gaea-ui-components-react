import React, { useContext, useState, useEffect } from 'react';
import { formContext } from './utils/context';

const FormItem: React.FC<any> = (props) => {
  const { children, valueschangehandle, name, rules, validateStatus, help, className, ...restProps } = props;
  const formContextValue = useContext<any>(formContext);
  const { setFieldsValue, getFieldsValue, getInternalHooks } = formContextValue;
  const { setValidateSubList, unValidateSubList } = getInternalHooks();
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const isValid = rules && rules.length > 0;

  const onChange = (val) => {
    const value = { [name]: val };
    setFieldsValue(value);
    const values = getFieldsValue();
    valueschangehandle && valueschangehandle(value, values);
    isValid && validateRules();
  };

  const validateRules = () => {
    return new Promise((resolve, reject) => {
      const value = getFieldsValue()[name];
      rules.map((item) => {
        if (item.required) {
          if (!value) {
            setErrorText(item.message);
            setError(true);
            return reject({ errors: [item.message], name });
          }
        }
        setError(false);
        return resolve(true);
      });
    });
  };

  const getControlled = (childProps = {}) => {
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

  const getItems = (children) => {
    return React.Children.map(children, (child: React.ReactElement, index: number) => {
      let returnChildNode;
      if (React.isValidElement(child)) {
        returnChildNode = React.cloneElement(child as React.ReactElement, getControlled(child.props));
      }
      return <>{returnChildNode}</>;
    });
  };

  const getClasses = () => {
    let c_name = 'form-item';
    if (isValid) {
      c_name += ' valid-item';
    }
    if (className) {
      c_name += ' ' + className;
    }
    return error ? c_name + ' item-error' : c_name;
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
      {error && <div className="error-text">{errorText}</div>}
    </div>
  );
};

export default FormItem;
