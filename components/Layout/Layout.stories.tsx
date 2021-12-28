import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Layout from './index';
import Menu from '../Menu/index';
const { Header, Footer, Content, Sider} = Layout;

export default {
  title: 'Layout/layout',
  component: Layout,
  argTypes: {
    // layyou
    theme: {
      description: '主题',
      options: ['dark','light'],
      control: { 
        type: 'radio'
      },
      table: {
        category: 'Layout',
        type: { summary: 'string' },
        defaultValue: {
          summary: 'dark'
        }
      }
    },
    hasSider: {
      type: 'boolean',
      description: '是否包含sider',
      table: {
        category: 'Layout',
        type: { summary: 'boolean' },
        defaultValue: {
          summary: false
        }
      }
    },
    // sider
    collapsed: {
      description: '是否折叠',
      table: {
        category: 'Sider',
        type: { summary: 'boolean' },
        defaultValue: {
          summary: false
        }
      }
    },
    defaultCollapsed: {
      description: '默认折叠状态',
      table: {
        category: 'Sider',
        type: { summary: 'boolean' },
        defaultValue: {
          summary: false
        }
      }
    },
    width: {
      description: '宽度',
      table: {
        category: 'Sider',
        type: { summary: 'number | string' },
        defaultValue: {
          summary: 200
        }
      }
    },
    onCollapse: {
      description: '展开收起回调',
      table: {
        category: 'Sider',
        type: { summary: 'func' },
        defaultValue: {
          summary: '(collapsed: boolean) => void;'
        }
      }
    },
    themeSider: {
      name: 'theme',
      description: '主题',
      options: ['dark','light'],
      control: { 
        type: 'radio'
      },
      table: {
        category: 'Sider',
        type: { summary: 'string' },
        defaultValue: {
          summary: 'dark'
        }
      }
    },
  },
} as ComponentMeta<typeof Layout>;

const Template: ComponentStory<typeof Layout> = (args: any) => (
  <div style={{border: '1px solid #f5f5f5'}}>
    <Layout>
      <Header>header</Header>
      <Layout hasSider>
        <Sider collapsed={args.collapsed} theme={args.theme}>
        <Menu {...args}>
          <Menu.Item key="1" icon="Apps" disabled>Home</Menu.Item>
          <Menu.Item key="2" icon="Apps">Apps</Menu.Item>
          <Menu.Item key="3" icon="Settings">Settings</Menu.Item>
          <Menu.SubMenu key="sub1" icon="Apps" disabled title="Navigation One">
            <Menu.Item key="4" icon="Settings">Settings</Menu.Item>
            <Menu.Item key="5" icon="Settings">Settings</Menu.Item>
            <Menu.Item key="6" icon="Settings">Settings</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key="sub2" icon="Apps" title="Navigation two">
            <Menu.Item key="7" icon="Settings">Settings</Menu.Item>
            <Menu.Item key="8" icon="Settings">Settings</Menu.Item>
            <Menu.Item key="9" icon="Settings">Settings</Menu.Item>
          </Menu.SubMenu>
        </Menu>
        </Sider>
        <Layout>
          <Content style={{ padding: '0 50px' }}>
            <div className="site-layout-content">Content</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>fpp ui 2021 Created by fpp UED</Footer>
        </Layout>
      </Layout>
    </Layout>
  </div>
)

export const layout = Template.bind({});
layout.args = {
  collapsed: false,
  theme: 'dark',
  hasSider: false
};
