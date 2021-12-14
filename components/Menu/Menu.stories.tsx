
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Menu from './index';

export default {
  title: 'Layout/Menu',
  component: Menu,
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => <Menu {...args} />;

export const layout = Template.bind({});
layout.args = {
  collapsed: false,
  theme: 'dark',
  style: { width: '256px'}
};
