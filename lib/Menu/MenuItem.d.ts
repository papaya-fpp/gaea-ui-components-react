import React from 'react';
export interface MenuItemProps {
    icon?: React.ReactNode;
    title?: React.ReactNode;
    value?: string;
    disabled?: boolean;
    onChange?: (type: string, val: string | undefined) => void;
}
declare const MenuItem: React.FC<MenuItemProps>;
export default MenuItem;
