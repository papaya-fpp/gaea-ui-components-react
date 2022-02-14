import React from 'react';
import classNames from 'classnames';
import MenuContext from './MenuContext';
import { getPrefixCls } from '../_util/responsiveObserve';
import Icon from '../Icon';
export interface SubMenuProps {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  value?: string;
  disabled?: boolean;
  onChange?: (type: string, val: string | undefined) => void
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const context = React.useContext(MenuContext);
  const { firstLevel, inlineCollapsed, openKeys, selectedKeys } = context;
  const { icon, title, children, value, disabled, onChange } = props;
  
  let childrenLength = 0;
  if (Array.isArray(children)) {
    childrenLength = children.length;
  } else {
    childrenLength = children ? 1 : 0;
  }
  let totalHeight = childrenLength * 36;
  const open = openKeys.some(k => k === value) && !disabled;
  
  const [ childrenSelect, setChildrenSelect ] = React.useState(false);
  
  const ulRef = React.useRef<HTMLUListElement>(null);
  
  const prefixCls = getPrefixCls('submenu');

  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-open`]: open && !disabled,
      [`${prefixCls}-light`]: open || childrenSelect,
    }
  );
  
  const selectHandle = (type: string, key: string) => {
		onChange && onChange(type, key)
  }
  
  const openChangeHandel = () => {
    if (disabled) return;
    onChange && onChange('sub', value)
  }

  const renderItem = () => {
    return React.Children.map(children, (child: any) => {
      if (!child) return null;
      let childrenProps: any = {
				...child.props,
				value: child.key,
				onChange: selectHandle
      };
      return React.cloneElement(child, childrenProps);
    })
  }

  const contextValue = React.useMemo(
    () => ({
      ...context,
      firstLevel: false,
    }),
    [context],
  );

  const subListclasses = classNames(
    `${prefixCls}-list`,
    {
      [`${prefixCls}-hidden`]: !open,
    }
  );

  React.useEffect(()=> {
    if (ulRef.current) {
      if (open) {
        ulRef.current.style.height = totalHeight + 'px';
      } else {
        ulRef.current.style.height = 0 + 'px';
      }
    }
  }, [open])

  React.useEffect(() => {
    if (Array.isArray(children)) {
      setChildrenSelect(children.some( item => item.key === selectedKeys))
    } else {
      setChildrenSelect((children as any).key === selectedKeys)
    }
  }, [selectedKeys])

  return (
    <MenuContext.Provider value={contextValue}>
      <li className={classes}>
        <div className={`${prefixCls}-container`} onClick={openChangeHandel}>
          <div className={`${prefixCls}-title-container`}>
            {
              firstLevel && icon
            }
            {!inlineCollapsed && <span className={`${prefixCls}-title-content`}>{title}</span>}
            {!inlineCollapsed && <Icon className="drop-down" name="Drop-down" />}
          </div>
        </div>
        <ul ref={ulRef} className={subListclasses}>{renderItem()}</ul>
      </li>
    </MenuContext.Provider>
  )
}

export default SubMenu;