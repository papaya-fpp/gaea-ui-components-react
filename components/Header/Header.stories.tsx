import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Header from './index';

export default {
  title: 'Layout/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const logoLeft = Template.bind({});
logoLeft.args = {
  logoRender: <div style={{width: '200px'}}><img className="fpp-header-logo" src="https://www.runoob.com/wp-content/uploads/2017/01/vue.png" alt=""/></div>,
  placeholder: 'search for anything...',
  search: true,
  leftRender: <div>123</div>
};

