import * as React from 'react';
import Radio from './Radio';
import { RadioChangeEvent } from './interface';
import { AbstractCheckboxProps } from '../Checkbox/Checkbox';
import RadioGroupContext from './Context';
import { getPrefixCls } from '../_util/responsiveObserve';

export type RadioButtonProps = AbstractCheckboxProps<RadioChangeEvent>;

const RadioButton = (props: RadioButtonProps, ref: React.Ref<any>) => {
  const radioGroupContext = React.useContext(RadioGroupContext);

  const { prefixCls: customizePrefixCls, ...radioProps } = props;
  const prefixCls = getPrefixCls('radio-button', customizePrefixCls);
  if (radioGroupContext) {
    radioProps.checked = props.value === radioGroupContext.value;
    radioProps.disabled = props.disabled || radioGroupContext.disabled;
  }
  return <Radio prefixCls={prefixCls} {...radioProps} type="radio" ref={ref} />;
};

export default React.forwardRef(RadioButton);
