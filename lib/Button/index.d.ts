import React from 'react';
interface ButtonProps {
    /**
     * Is this the principal call to action on the page?
     */
    primary?: boolean;
    danger?: boolean;
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * What background color to use
     */
    backgroundColor?: string;
    /**
     * How large should the button be?
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Button contents
     */
    label?: string;
    children?: string | React.ReactNode;
    /**
     * icon 图标
     */
    icon?: string;
    /**
     * loading 图标
     */
    loading?: boolean;
    /**
     * Optional click handler
     */
    onClick?: () => void;
    className?: any;
    style?: any;
}
/**
 * Primary UI component for user interaction
 */
declare const Button: ({ primary, danger, disabled, size, backgroundColor, label, children, icon, loading, style, className, ...props }: ButtonProps) => JSX.Element;
export default Button;
