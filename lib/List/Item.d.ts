import React from 'react';
export interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    prefixCls?: string;
    children?: React.ReactNode;
}
declare function ListItem({ className, prefixCls, children }: ListItemProps): JSX.Element;
export default ListItem;
