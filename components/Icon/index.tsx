import React from "react";
import classNames from 'classnames';
import { getPrefixCls } from '../_util/responsiveObserve';
interface IconProps {
  name: string;
  className?: string;
  color?: string;
  size?: string | number;
  onClick?: any;
}
const Icon: React.FC<IconProps> = ({
  name,
  onClick,
  className = "",
  color = "",
  size = ""
}) => {
  
  const prefixCls = getPrefixCls('icon');

  const classes = classNames(
    'icon',
    prefixCls,
    className
  );

  return (
    <svg
      onClick={onClick}
      className={classes}
      style={{
        color: color,
        fontSize: size + "px"
      }}
      aria-hidden="true"
    >
      <use xlinkHref={`#icon-${name}`}></use>
    </svg >
  );
};

export default Icon;
