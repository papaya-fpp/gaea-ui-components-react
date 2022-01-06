import React from 'react';
import useForm from './hooks/useForm';
import Item from './FormItem';
interface FormProps {
    form?: any;
    initialValues?: any;
    onValuesChange?: any;
}
interface FormComponentProps extends React.FC<FormProps> {
    useForm: typeof useForm;
    Item: typeof Item;
}
declare const Form: FormComponentProps;
export default Form;
