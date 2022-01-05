import * as React from 'react';
export interface BreadcrumbItemProps {
    separator?: React.ReactNode;
    href?: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>;
    className?: string;
}
declare const BreadcrumbItem: React.FC<BreadcrumbItemProps>;
export default BreadcrumbItem;
