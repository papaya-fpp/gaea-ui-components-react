
import classNames from 'classnames';
import React from 'react';

export interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    prefixCls?: string;
    children?: React.ReactNode
}

function ListItem({
    className,
    prefixCls,
    children
}: ListItemProps) {
    const classString = classNames(
        prefixCls,
        'gaea-ui__list-item-wrapper',
        {},
        className
    )
    return <li className={classString}>
        {children}
    </li>
};

export default ListItem
