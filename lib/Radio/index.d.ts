import * as React from 'react';
import Group from './Group';
import Button from './RadioButton';
import { RadioProps } from './interface';
export { RadioGroupButtonStyle, RadioGroupOptionType, RadioGroupProps, RadioGroupContextProps, RadioProps, RadioChangeEventTarget, RadioChangeEvent, } from './interface';
interface CompoundedComponent extends React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<HTMLElement>> {
    Group: typeof Group;
    Button: typeof Button;
}
declare const Radio: CompoundedComponent;
export { Button, Group };
export default Radio;
