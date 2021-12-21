import React from 'react';
import classNames from 'classnames';
import { getPrefixCls} from '../_util/responsiveObserve';
import { Input } from '../index';

interface LayoutHeaderProps extends React.HTMLAttributes<HTMLHeadElement> {
  logoRender?: React.ReactNode;
  search?: boolean;
  placeholder?: string;
  searchOnchange?: (val: string) => void;
  leftRender?: React.ReactNode;
}

const LayoutHeader: React.FC<LayoutHeaderProps> = ({
  className,
  logoRender,
  search,
  placeholder,
  searchOnchange,
  leftRender = null
}) => {

  const prefixCls = getPrefixCls('header');

  const classes = classNames(
    prefixCls,
    className,
  );

  
  const searchChange = (val) => {
    searchOnchange && searchOnchange(val)
  }

  const getLogo = () => {
    if (logoRender) {
      return logoRender;
    }
    return null
  }

  return (
    <header className={classes}>
      <div className={`${prefixCls}-left`}>
        {getLogo()}
        {/* {
          search && <div className={`${prefixCls}-search`}>
            <Input
              placeholder={placeholder}
              name="search"
              prefix='Search'
              allowClear={true}
              onChange={searchChange}
            />
          </div>
        } */}
      </div>
      <div>
        {leftRender}
      </div>
    </header>
  );
}

export default LayoutHeader
