import React, { ReactNode } from "react";
interface CardProps {
    title?: string | ReactNode;
    extra?: string | ReactNode;
    children?: string | ReactNode;
    footer?: string | ReactNode;
    expandable?: boolean;
}
declare const Card: React.FC<CardProps>;
export default Card;
