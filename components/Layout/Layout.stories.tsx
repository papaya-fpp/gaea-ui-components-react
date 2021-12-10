import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Layout from './index';
const { Header, Footer, Content, Sider} = Layout;

export default {
  title: 'Layout/layout',
  component: Layout,
  argTypes: {
    collapsed: { control: 'boolean' },
    theme: {
      options: ['dark','light'],
      control: { 
        type: 'radio'
      },
      default: 'dark'
    }
  },
} as ComponentMeta<typeof Layout>;

const Template: ComponentStory<typeof Layout> = (args: any) => (
  <div style={{border: '1px solid #f5f5f5'}}>
    <Layout>
      <Header>header</Header>
      <Layout hasSider>
        <Sider collapsed={args.collapsed} theme={args.theme}>
          123
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
  theme: 'dark'
};
