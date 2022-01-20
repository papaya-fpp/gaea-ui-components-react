import React from 'react';
export interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    children?: React.ReactNode;
}
declare function ListItem({ className, children, ...others }: ListItemProps): JSX.Element;
export default ListItem;
