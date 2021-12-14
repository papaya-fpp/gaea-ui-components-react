
import React from 'react';

import MenuContext, { MenuTheme } from './MenuContext';
import { SiderContext, SiderContextProps } from '../Layout/Sider';

export interface MenuProps {
  theme?: MenuTheme;
  inlineIndent?: number;
  inlineCollapsed?: boolean;
}

interface InternalMenuProps extends MenuProps {
  siderCollapsed?: boolean
}

const InternalMenu: React.FC<InternalMenuProps> = (props) => {
  const { inlineCollapsed, siderCollapsed } = props;

  const collapsed = siderCollapsed !== undefined ? siderCollapsed : inlineCollapsed;

  const contextValue = React.useMemo(() => ({
    inlineCollapsed: collapsed || false,
    firstLevel: true,
  }), [ collapsed]);

  return (
    <MenuContext.Provider value={contextValue}>
      <div>123</div>
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
