import React from "react";
interface AlertProps {
    icon?: React.ReactNode;
    title?: string | React.ReactNode;
    content?: string | React.ReactNode;
    border?: Boolean;
    visible?: Boolean;
    type?: string;
}
export declare const Alert: React.FC<AlertProps>;
export default Alert;
