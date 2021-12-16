
import React from 'react';
import classNames from 'classnames';
import { getPrefixCls} from '../_util/responsiveObserve';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
  overflowCount?: number;
  dot?: boolean;
}

const Badge: React.FC<BadgeProps> = (props) => {
  const {
    count = 0,
    overflowCount = 99,
    dot,
    children,
    className,
    style,
    ...other
  } = props;

  const prefixCls = getPrefixCls('badge');

  const classes = classNames(
    prefixCls,
    className,
  );

  const supClasses = classNames(
    `${prefixCls}-sup`,
    {
      [`${prefixCls}-dot`]: dot,
      [`${prefixCls}-count`]: !dot
    }
  )

  const number = count > overflowCount ? `${overflowCount}+` : `${count}`

  return (
    <div className={classes} {...other}>
      {children}
      { (dot || parseInt(number) > 0) && <sup className={supClasses}>
        { dot ? '': number }
      </sup>}
    </div>
  )
};

export default Badge
