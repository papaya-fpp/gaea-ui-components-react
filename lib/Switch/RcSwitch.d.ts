import * as React from 'react';
export declare type SwitchChangeEventHandler = (checked: boolean, event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => void;
export declare type SwitchClickEventHandler = SwitchChangeEventHandler;
interface SwitchProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'onChange' | 'onClick'> {
    className?: string;
    prefixCls?: string;
    disabled?: boolean;
    checkedChildren?: React.ReactNode;
    unCheckedChildren?: React.ReactNode;
    onChange?: SwitchChangeEventHandler;
    onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
    onClick?: SwitchClickEventHandler;
    tabIndex?: number;
    checked?: boolean;
    defaultChecked?: boolean;
    loadingIcon?: React.ReactNode;
    style?: React.CSSProperties;
    title?: string;
    [key: string]: any;
}
declare const RcSwitch: React.ForwardRefExoticComponent<Pick<SwitchProps, keyof SwitchProps> & React.RefAttributes<HTMLButtonElement>>;
export default RcSwitch;
