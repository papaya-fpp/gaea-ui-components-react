import React from 'react';
import Option from './Option';
interface SelectProps {
    label?: string;
    placeholder?: string;
    value?: any;
    onChange?: any;
    allowClear?: boolean;
    showSearch?: any;
    className?: any;
    filterOption?: any;
    onBlur?: any;
    onFocus?: any;
    disabled?: boolean;
}
interface SelectPropsComponents extends React.FC<SelectProps> {
    Option: typeof Option;
}
declare const Select: SelectPropsComponents;
export default Select;
