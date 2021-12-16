
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Menu from './index';
const { Item, SubMenu } = Menu

export default {
  title: 'Layout/Menu',
  component: Menu,
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => (
  <div style={{ width: '256px'}}>
    <Menu {...args}>
      <Item key="1" icon="Apps">Home</Item>
      <Item key="2" icon="Apps">Apps</Item>
      <Item key="3" icon="Settings">Settings</Item>
    </Menu>
  </div>
);

export const layout = Template.bind({});
layout.args = {
  inlineCollapsed: false,
  theme: 'dark',
};
