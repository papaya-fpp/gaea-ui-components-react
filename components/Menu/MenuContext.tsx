import { createContext } from 'react';

export type MenuTheme = 'light' | 'dark';

export interface MenuContextProps {
  inlineCollapsed: boolean;
  firstLevel: boolean;
}

const MenuContext = createContext<MenuContextProps>({
  firstLevel: true,
  inlineCollapsed: false,
});

export default MenuContext;
