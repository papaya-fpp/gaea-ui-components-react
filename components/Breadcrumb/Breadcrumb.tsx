import * as React from 'react';
import classNames from 'classnames';
import { getPrefixCls } from '../_util/responsiveObserve';
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

const Breadcrumb: BreadcrumbInterface = ({
  separator = '/',
  style,
  className,
  children,
  ...others
}) => {

  let crumbs;
  const prefixCls = getPrefixCls('breadcrumb');
  if (children) {
    crumbs = React.Children.map( children, (child: any, index) => {
      return React.cloneElement(child, {
        separator,
        key: index,
      })
    })
  }
  const breadcrumbClassName = classNames(
    prefixCls,
    {
      // [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
  );

  return (
    <div className={breadcrumbClassName} style={style} {...others}>
      {crumbs}
    </div>
  );
};

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
