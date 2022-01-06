/// <reference types="react" />
export declare type MenuTheme = 'light' | 'dark';
export interface MenuContextProps {
    inlineCollapsed: boolean;
    firstLevel: boolean;
    selectedKeys: string | string[] | undefined;
    openKeys: string[];
}
declare const MenuContext: import("react").Context<MenuContextProps>;
export default MenuContext;
