import * as React from 'react';
import InternalCheckbox, { CheckboxProps } from './Checkbox';
import Group from './Group';

export { CheckboxProps, CheckboxChangeEvent } from './Checkbox';
export { CheckboxGroupProps, CheckboxOptionType } from './Group';

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>> {
  Group: typeof Group;
}

const Checkbox = InternalCheckbox as CompoundedComponent;

Checkbox.Group = Group;

export default Checkbox;