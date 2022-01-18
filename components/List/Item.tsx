
import classNames from 'classnames';
import React from 'react';

export interface ListItemProps<T> {
    className?: string;
    prefixCls?: string;
    children?: React.ReactNode
}

function ListItem<T>({
    className,
    prefixCls,
    children
}: ListItemProps<T>) {
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
