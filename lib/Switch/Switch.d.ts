import React from 'react';
export declare type SwitchSize = 'small' | 'default';
export declare type SwitchChangeEventHandler = (checked: boolean, event: MouseEvent) => void;
export declare type SwitchClickEventHandler = SwitchChangeEventHandler;
export interface SwitchProps {
    prefixCls?: string;
    size?: SwitchSize;
    className?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: SwitchChangeEventHandler;
    onClick?: SwitchClickEventHandler;
    checkedChildren?: React.ReactNode;
    unCheckedChildren?: React.ReactNode;
    disabled?: boolean;
    loading?: boolean;
    autoFocus?: boolean;
    style?: React.CSSProperties;
    title?: string;
    tabIndex?: number;
}
interface CompoundedComponent extends React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLElement>> {
}
declare const _default: React.MemoExoticComponent<CompoundedComponent>;
export default _default;
