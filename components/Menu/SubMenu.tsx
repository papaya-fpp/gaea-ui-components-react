import React from 'react';
import classNames from 'classnames';
import MenuContext, { MenuTheme } from './MenuContext';
import { getPrefixCls } from '../_util/responsiveObserve';
import Icon from '../Icon';
export interface SubMenuProps {
  icon?: string;
  title?: React.ReactNode;
  value?: string;
  disabled?: boolean;
  onChange?: (type: string, val: string | undefined) => void
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const context = React.useContext(MenuContext);
  const { firstLevel, inlineCollapsed, openKeys, selectedKeys } = context;
  const { icon, title, children, value, onChange } = props;

  const [ open, setOpen ] = React.useState(openKeys.some(k => k === value))
  const [ childrenSelect, setChildrenSelect ] = React.useState(false)

  const prefixCls = getPrefixCls('submenu');

  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-open`]: open,
      [`${prefixCls}-light`]: open || childrenSelect,
    }
  );
  
  const selectHandle = (type: string, key: string) => {
		onChange && onChange(type, key)
  }
  
  const openChangeHandel = () => {
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

  React.useEffect(() => {
    setOpen(openKeys.some(k => k === value))
  }, [openKeys])
  
  React.useEffect(() => {
    if (Array.isArray(children)) {
      setChildrenSelect(children.some( item => item.key === selectedKeys))
    } else {
      setChildrenSelect((children as any).key === selectedKeys)
    }
  }, [selectedKeys])

  const contextValue = React.useMemo(
    () => ({
      ...context,
      firstLevel: false,
    }),
    [context],
  );

  return (
    <MenuContext.Provider value={contextValue}>
      <li className={classes}>
        <div className={`${prefixCls}-container`} onClick={openChangeHandel}>
          <div className={`${prefixCls}-title-container`}>
            {
              firstLevel && icon && <Icon name={icon} />
            }
            {!inlineCollapsed && <span className={`${prefixCls}-title-content`}>{title}</span>}
            {!inlineCollapsed && <Icon className="drop-down" name="Drop-down" />}
          </div>
        </div>
        {open && <ul>{renderItem()}</ul>}
      </li>
    </MenuContext.Provider>
  )
}

export default SubMenu;