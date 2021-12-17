
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Menu from './index';
const { Item, SubMenu } = Menu

export default {
  title: 'Nav/Menu',
  component: Menu,
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => (
  <div style={{ width: '256px'}}>
    <Menu {...args}>
      <Item key="1" icon="Apps" disabled>Home</Item>
      <Item key="2" icon="Apps">Apps</Item>
      <Item key="3" icon="Settings">Settings</Item>
      <SubMenu key="sub1" icon="Apps" disabled title="Navigation One">
        <Item key="4" icon="Settings">Settings</Item>
        <Item key="5" icon="Settings">Settings</Item>
        <Item key="6" icon="Settings">Settings</Item>
      </SubMenu>
      <SubMenu key="sub2" icon="Apps" title="Navigation two">
        <Item key="7" icon="Settings">Settings</Item>
        <Item key="8" icon="Settings">Settings</Item>
        <Item key="9" icon="Settings">Settings</Item>
      </SubMenu>
    </Menu>
  </div>
);

export const layout = Template.bind({});
layout.args = {
  inlineCollapsed: false,
  theme: 'dark',
  // openKeys: ['sub1','sub2']
};
