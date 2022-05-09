import React from 'react';
export declare type SiderTheme = 'light' | 'dark';
export interface SiderContextProps {
    siderCollapsed?: boolean;
}
export declare const SiderContext: React.Context<SiderContextProps>;
export interface SiderProps extends React.HTMLAttributes<HTMLDivElement> {
    collapsed?: boolean;
    defaultCollapsed?: boolean;
    width?: number | string;
    theme?: SiderTheme;
    onCollapse?: (collapsed: boolean) => void;
}
declare const Sider: React.FC<SiderProps>;
export default Sider;
