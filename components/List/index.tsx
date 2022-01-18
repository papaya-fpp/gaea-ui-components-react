
import classNames from 'classnames';
import React from 'react';

export interface ListProps<T> {
  className?: string;
  prefixCls?: string;
  children?: React.ReactNode
}

import Item from './Item'

function List<T>({
  className,
  prefixCls,
  children
}: ListProps<T>) {
  const classString = classNames(
    prefixCls,
    'gaea-ui__list-wrapper',
    {},
    className
  )
  return <ul className={classString}>
    {children}
  </ul>
};

List.Item = Item;

export default List
