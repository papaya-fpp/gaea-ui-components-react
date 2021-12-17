
import React from 'react';
import classNames from 'classnames';
import { getPrefixCls } from '../_util/responsiveObserve';
import Icon from '../Icon';

interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  arrow?: boolean;
  disabled?: boolean;
  trigger?: 'click' | 'hover';
  visible?: boolean;
  list?: Array<any>;
  title?: string;
  onChange?: () => void
}

const Dropdown: React.FC<DropdownProps> = (props) => {
  const {
    className,
    style,
    arrow = true,
    disabled,
    trigger = 'click',
    visible,
    list,
    title,
    children,
    onChange,
    ...other
  } = props;

  const prefixCls = getPrefixCls('dropdown');

  const classes = classNames(
    prefixCls,
    className,
  );
  return (
    <div className={classes} {...other}>
      <div>
        <span>{title}</span>
        {arrow && <Icon name="Drop-down" />}
      </div>
    </div>
  )
};

export default Dropdown
