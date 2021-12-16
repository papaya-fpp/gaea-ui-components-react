
import React from 'react';
import classNames from 'classnames';
import { getPrefixCls} from '../_util/responsiveObserve';
import Icon from '../Icon';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number | string;
  src?: string;
  icon?: string;
  shape?: 'circle' | 'square';
}

const Avatar: React.FC<AvatarProps> = (props) => {
  const {
    size,
    src,
    icon,
    shape = 'circle',
    children,
    className,
    style,
    ...other
  } = props;
  const prefixCls = getPrefixCls('avatar');

  const classes = classNames(
    prefixCls,
    `${prefixCls}-${shape}`,
    className,
  );

  const sizeStyle: React.CSSProperties =
    typeof size === 'number'
      ? {
          width: size,
          height: size,
          lineHeight: `${size}px`,
          fontSize: icon ? size / 2 : 18,
        }
      : {};

  const renderChildren = () => {
    if (children) {
      return children;
    }

    if (icon) {
      return <Icon name={icon} />
    }

    if (src) {
      return <img src={src} alt="" />
    }
    return null
  }
  


  return (
    <div className={classes} {...other} style={{...sizeStyle,...style}}>
      {renderChildren()}
    </div>
  )
};

export default Avatar
