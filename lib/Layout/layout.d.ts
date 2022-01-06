import React from 'react';
export interface BasicProps extends React.HTMLAttributes<HTMLDivElement> {
    prefixCls?: string;
    hasSider?: boolean;
}
declare const Layout: React.FC<BasicProps>;
declare const Header: React.FC<BasicProps>;
declare const Footer: React.FC<BasicProps>;
declare const Content: React.FC<BasicProps>;
export { Header, Footer, Content };
export default Layout;
