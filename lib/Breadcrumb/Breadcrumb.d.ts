import * as React from 'react';
import BreadcrumbItem from './BreadcrumbItem';
export interface Route {
    path: string;
    breadcrumbName: string;
    children?: Omit<Route, 'children'>[];
}
export interface BreadcrumbProps {
    separator?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
}
interface BreadcrumbInterface extends React.FC<BreadcrumbProps> {
    Item: typeof BreadcrumbItem;
}
declare const Breadcrumb: BreadcrumbInterface;
export default Breadcrumb;
