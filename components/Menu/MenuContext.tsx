import { createContext } from 'react';

export type MenuTheme = 'light' | 'dark';

export interface MenuContextProps {
  inlineCollapsed: boolean;
  firstLevel: boolean;
  selectedKeys: string | string[] | undefined;
  openKeys: string[]
}

const MenuContext = createContext<MenuContextProps>({
  firstLevel: true,
  inlineCollapsed: false,
  selectedKeys: '',
  openKeys: [],
});

export default MenuContext;
