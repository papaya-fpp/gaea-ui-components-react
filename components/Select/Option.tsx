import React from 'react';
import { getPrefixCls } from '../_util/responsiveObserve';

interface optionProps {
  active?: any;
  value: any;
  onChange?: any;
}

const Option: React.FC<optionProps> = ({ children, active, value, onChange }) => {
  const prefixCls = getPrefixCls('select');

  const changeItem = () => {
    onChange(value, children);
  };

  return (
    <div className={`${prefixCls}-option_item ${active === value ? 'active' : ''}`} onMouseDown={changeItem}>
      {children}
    </div>
  );
  // return <div className={`option_item ${active === value? 'active' : ''}`} onTouchStart={changeItem} onMouseDown={changeItem}>{children}</div>
};

export default Option;
