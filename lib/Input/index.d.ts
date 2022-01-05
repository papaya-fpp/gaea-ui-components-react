import React from 'react';
interface InputProps {
    label?: string;
    placeholder?: any;
    prefix?: React.ReactNode | string;
    suffix?: React.ReactNode | string;
    groupAddon?: React.ReactNode | string;
    verificationCode?: boolean;
    verificationCodeLoading?: boolean;
    verificationCodeTrgger?: boolean;
    verificationCodeTime?: Number | string;
    verificationCodeText?: React.ReactNode | string;
    sendVerificationCode?: any;
    passwordIcon?: boolean;
    type?: string;
    id?: string;
    name?: string;
    value?: string;
    size?: string;
    onAddon?: any;
    onChange?: any;
    onBlur?: any;
    onFocus?: any;
    className?: string;
    error?: boolean;
    errorText?: string;
    readonly?: boolean;
    allowClear?: boolean;
    maxLength?: number;
    fixed?: number;
    onlyPpositive?: boolean;
    ref?: any;
}
/**
 * Primary UI component for user interaction
 */
export declare const Input: React.FC<InputProps>;
export default Input;
