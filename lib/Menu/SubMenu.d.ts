import React from 'react';
export interface SubMenuProps {
    icon?: string;
    title?: React.ReactNode;
    value?: string;
    disabled?: boolean;
    onChange?: (type: string, val: string | undefined) => void;
}
declare const SubMenu: React.FC<SubMenuProps>;
export default SubMenu;
