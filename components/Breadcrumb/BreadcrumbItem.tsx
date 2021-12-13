import * as React from 'react';
import { getPrefixCls } from '../_util/responsiveObserve';

export interface BreadcrumbItemProps {
  separator?: React.ReactNode;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>;
  className?: string;
}

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  separator = '/',
  children,
  ...restProps
}) => {
  const prefixCls = getPrefixCls('breadcrumb');


  let link;
  if ('href' in restProps) {
    link = (
      <a className={`${prefixCls}-link`} {...restProps}>
        {children}
      </a>
    );
  } else {
    link = (
      <span className={`${prefixCls}-link`} {...restProps}>
        {children}
      </span>
    );
  }

  if (children) {
    return (
      <span>
        {link}
        {separator && (
          <span className={`${prefixCls}-separator`}>{separator}</span>
        )}
      </span>
    );
  }
  return null;
};

export default BreadcrumbItem;
