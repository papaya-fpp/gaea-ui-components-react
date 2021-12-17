import React from 'react';
import classNames from 'classnames';
import MenuContext, { MenuTheme } from './MenuContext';
import { getPrefixCls } from '../_util/responsiveObserve';
import Icon from '../Icon';

export interface MenuItemProps {
  icon?: string;
  title?: React.ReactNode;
  value?: string;
  disabled?: boolean;
  onChange?: (type: string, val: string | undefined) => void
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { firstLevel, inlineCollapsed, selectedKeys } = React.useContext(MenuContext);
  const { icon, children, value, disabled, onChange } = props;
  const prefixCls = getPrefixCls('menu-item');

  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-no-first`]: !firstLevel,
      [`${prefixCls}-select`]: selectedKeys === value,
    }
  );

  const clickHandle = () => {
    if (disabled) return;
    onChange && onChange('item', value)
  }

  return (
    <li className={classes} onClick={clickHandle}>
      <div className={`${prefixCls}-container`}>
        {
          firstLevel && icon && <Icon name={icon} />
        }
        {!inlineCollapsed && <span className={`${prefixCls}-title-content`}>{children}</span>}
      </div>
    </li>
  )
}

export default MenuItem;