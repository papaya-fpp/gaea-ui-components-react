import React from 'react';
import { FormProvider } from './utils/context';
import useForm from './hooks/useForm';
import Item from './FormItem';
import './style/index.scss';
interface FormProps {
  form?: any;
  initialValues?: any;
  onValuesChange?: any;
}

interface FormComponentProps extends React.FC<FormProps> {
  useForm: typeof useForm;
  Item: typeof Item;
}

const Form: FormComponentProps = (props) => {
  const { form, children, initialValues = {}, onValuesChange } = props;
  const [formInstance] = useForm(form);
  const { setInitialValues } = formInstance.getInternalHooks();
  // 初始化 initvalues
  const mountRef = React.useRef(null);
  setInitialValues(initialValues, !mountRef.current);
  if (!mountRef.current) {
    mountRef.current = true;
  }

  const getItems = (children) => {
    return React.Children.map(children, (child) => {
      if (!child) return null;
      let childrenProps: any = {
        ...child.props
      };
      if (child.type === Item) {
        childrenProps.valueschangehandle = onValuesChange;
        return React.cloneElement(child, childrenProps);
      } else {
        if (childrenProps.children) {
          childrenProps.children = getItems(childrenProps.children);
          return React.cloneElement(child, childrenProps);
        } else {
          return child;
        }
      }
    });
  };
  const formContextValue = React.useMemo(() => ({ ...formInstance }), [formInstance]);
  return (
      <div>
        qqq
        {/*<FormProvider value={formContextValue}>
        <form className="form-wrapper">{getItems(children)}</form>
      </FormProvider>*/}
      </div>
  );
};

Form.Item = Item;
Form.useForm = useForm;

export default Form;
