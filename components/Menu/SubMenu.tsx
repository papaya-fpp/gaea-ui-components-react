import React from 'react';

export interface SubMenuProps {
  icon?: string;
  title?: React.ReactNode;
  value?: string;
  disabled?: boolean;
  onChange?: (type: string, val: string | undefined) => {}
}

const SubMenu: React.FC<SubMenuProps> = () => {
  return (
    <ul></ul>
  )
}

export default SubMenu;