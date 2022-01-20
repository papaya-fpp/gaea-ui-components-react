
import classNames from 'classnames';
import React from 'react';
import { getPrefixCls } from '../_util/responsiveObserve';

export interface ListProps<T> {
  className?: string;
  children?: React.ReactNode
}

import Item from './Item'

function List<T>({
  className,
  children
}: ListProps<T>) {
  const prefixCls = getPrefixCls('list');

  const classString = classNames(
    prefixCls,
    {},
    className
  )
  return <ul className={classString}>
    {children}
  </ul>
};

List.Item = Item

export default List
