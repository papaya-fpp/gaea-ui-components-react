
import classNames from 'classnames';
import React from 'react';
import { getPrefixCls } from '../_util/responsiveObserve';

export interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    children?: React.ReactNode
}

function ListItem({
    className,
    children,
    ...others
}: ListItemProps) {
    const prefixCls = getPrefixCls('list-item')
    const classString = classNames(
        prefixCls,
        {},
        className
    )
    return (
        <div
            {...others}
            className={classString} >
            {children}
        </div>
    )  
};

export default ListItem
