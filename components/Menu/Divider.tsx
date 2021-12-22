import React from 'react';
import classNames from 'classnames';
import { getPrefixCls } from '../_util/responsiveObserve';
''
interface DividerProps extends React.HTMLAttributes<HTMLLIElement> {
  title?: string;
}

const Divider: React.FC<DividerProps> = ({
  title,
  className,
  style,
  ...other
}) => {

  const prefixCls = getPrefixCls('menu-divider');

  const classes = classNames(
    prefixCls,
    className,
  );

  return title ? (
    <li className={classes} style={style} {...other}>
      <div className={`${prefixCls}-text`}>{title}</div>
    </li>
  ): null
}

export default Divider;