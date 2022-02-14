import React from 'react';
import { MenuTheme } from './MenuContext';
import SubMenu from './SubMenu';
import Item from './MenuItem';
import Divider from './Divider';
interface PublicProps {
    theme?: MenuTheme;
    multiple?: boolean;
    inlineCollapsed?: boolean;
    className?: string;
    defaultOpenKeys?: Array<string>;
    openKeys?: string[];
    defaultSelectedKeys?: string;
    selectedKeys?: string;
    onSelect?: (key: string) => void;
    onOpenChange?: (openKeys: string | string[]) => void;
}
interface MenuProps extends React.FC<PublicProps> {
    Item: typeof Item;
    SubMenu: typeof SubMenu;
    Divider: typeof Divider;
}
declare const Menu: MenuProps;
export default Menu;
