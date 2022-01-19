import React from 'react';
export interface ListProps<T> {
    className?: string;
    prefixCls?: string;
    children?: React.ReactNode;
}
declare function List<T>({ className, prefixCls, children }: ListProps<T>): JSX.Element;
export default List;
