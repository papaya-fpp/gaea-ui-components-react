import * as React from 'react';
import { AbstractCheckboxGroupProps } from '../Checkbox/Group';
import { AbstractCheckboxProps } from '../Checkbox/Checkbox';
export declare type SizeType = 'small' | 'middle' | 'large' | undefined;
export declare type RadioGroupButtonStyle = 'outline' | 'solid';
export declare type RadioGroupOptionType = 'default' | 'button';
export interface RadioGroupProps extends AbstractCheckboxGroupProps {
    defaultValue?: any;
    value?: any;
    onChange?: (e: RadioChangeEvent) => void;
    size?: SizeType;
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
    name?: string;
    children?: React.ReactNode;
    id?: string;
    optionType?: RadioGroupOptionType;
    buttonStyle?: RadioGroupButtonStyle;
}
export interface RadioGroupContextProps {
    onChange: (e: RadioChangeEvent) => void;
    value: any;
    disabled?: boolean;
    name?: string;
}
export declare type RadioProps = AbstractCheckboxProps<RadioChangeEvent>;
export interface RadioChangeEventTarget extends RadioProps {
    checked: boolean;
}
export interface RadioChangeEvent {
    target: RadioChangeEventTarget;
    stopPropagation: () => void;
    preventDefault: () => void;
    nativeEvent: MouseEvent;
}
