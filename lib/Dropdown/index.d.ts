import React from 'react';
declare type ItemProps = {
    key: string | number;
    label: string;
};
interface DropdownProps {
    arrow?: boolean;
    disabled?: boolean;
    trigger?: 'click' | 'hover';
    visible?: boolean;
    list?: Array<ItemProps>;
    title?: string;
    placement?: ('bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight');
    onChange?: (item: ItemProps) => void;
}
declare const Dropdown: React.FC<DropdownProps>;
export default Dropdown;
