
import React from 'react';
import classNames from 'classnames';
import MenuContext, { MenuTheme } from './MenuContext';
import { SiderContext, SiderContextProps } from '../Layout/Sider';
import { getPrefixCls } from '../_util/responsiveObserve';

export interface MenuProps {
  theme?: MenuTheme;
  inlineIndent?: number;
  inlineCollapsed?: boolean;
}

interface InternalMenuProps extends MenuProps, React.HTMLAttributes<HTMLDivElement> {
  siderCollapsed?: boolean
}

const InternalMenu = (props: InternalMenuProps) => {
  const {
    inlineCollapsed,
    siderCollapsed,
    theme = 'dark',
    className,
    style,
    ...others
  } = props;
  const prefixCls = getPrefixCls('menu');
  
  const collapsed = siderCollapsed !== undefined ? siderCollapsed : inlineCollapsed;

  const classes = classNames(
    prefixCls,
    `${prefixCls}-${theme}`,
    {
      [`${prefixCls}-collapsed`]: !!collapsed
    },
    className,
  );


  const contextValue = React.useMemo(() => ({
    inlineCollapsed: collapsed || false,
    firstLevel: true,
  }), [ collapsed ]);

  return (
    <MenuContext.Provider value={contextValue}>
      <div className={classes} style={style} {...others}>
        
      </div>
    </MenuContext.Provider>
  )
}



class Menu extends React.Component<MenuProps, {}> {
  // static Divider = MenuDivider;

  // static Item = Item;

  // static SubMenu = SubMenu;

  // static ItemGroup = ItemGroup;

  render() {
    return (
      <SiderContext.Consumer>
        {(context: SiderContextProps) => <InternalMenu {...this.props} {...context} />}
      </SiderContext.Consumer>
    );
  }
}

// export { MenuTheme, SubMenuProps, MenuItemProps };

export default Menu;
