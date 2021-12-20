
import React from 'react';
import useForm from './hooks/useForm';
import { FormProvider } from './utils/context';
import Item from './FormItem';
import { getPrefixCls } from '../_util/responsiveObserve';

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
  const prefixCls = getPrefixCls('form');

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
      <FormProvider value={formContextValue}>
        <form className={`${prefixCls}-wrapper`}>{getItems(children)}</form>
      </FormProvider>
  );
};
Form.Item = Item;
Form.useForm = useForm;
export default Form
