
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Menu from './index';
const { Item, SubMenu, Divider } = Menu

export default {
  title: 'Nav/Menu',
  component: Menu,
  argTypes: {
    inlineCollapsed: {
      type: 'boolean',
      description: '是否折叠',
      table: {
        type: { summary: 'boolean' },
        defaultValue: {
          summary: false
        }
      }
    },
    theme: {
      options: ['dark','light'],
      description: '主题',
      control: { 
        type: 'radio'
      },
      table: {
        type: { summary: 'string' },
        defaultValue: {
          summary: 'dark'
        }
      }
    },
    defaultOpenKeys:{
      description: '默认展开项',
      table: {
        type: { summary: 'array' },
        defaultValue: {
          summary: '[]'
        }
      }
    },
    openKeys:{
      description: '展开项',
      table: {
        type: { summary: 'array' },
        defaultValue: {
          summary: '[]'
        }
      }
    },
    defaultSelectedKeys:{
      description: '默认选中项',
      table: {
        type: { summary: 'string' },
        defaultValue: {
          summary: ''
        }
      }
    },
    selectedKeys:{
      description: '选中项',
      table: {
        type: { summary: 'string' },
        defaultValue: {
          summary: ''
        }
      }
    },
    onSelect:{
      description: '选中回调',
      table: {
        type: { summary: 'func' },
        defaultValue: {
          summary: '(key: string) => void'
        }
      }
    },
    onOpenChange:{
      description: '展开回调',
      table: {
        type: { summary: 'func' },
        defaultValue: {
          summary: '(openKeys: string[]) => void;'
        }
      }
    }
  },
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => (
  <div style={{ width: '256px'}}>
    <Menu {...args}>
      <Divider title="MAIN NAVIGATIO" />
      <Item key="1" icon="Apps" disabled>Home</Item>
      <Item key="2" icon="Apps">Apps</Item>
      <Item key="3" icon="Settings">Settings</Item>
      <Divider title="MAIN NAVIGATIO 2" />
      <SubMenu key="sub1" icon="Apps" disabled title="Navigation One">
        <Item key="4" icon="Settings">Settings</Item>
        <Item key="5" icon="Settings">Settings</Item>
        <Item key="6" icon="Settings">Settings</Item>
      </SubMenu>
      <SubMenu key="sub2" icon="Apps" title="Navigation two">
        <Divider title="MAIN NAVIGATIO 3" />
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
