import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Breadcrumb from './index';
const { Item } = Breadcrumb;

export default {
  title: 'Layout/Breadcrumb',
  component: Breadcrumb,
} as ComponentMeta<typeof Breadcrumb>;

const Template: ComponentStory<typeof Breadcrumb> = (args) => (
  <Breadcrumb {...args}>
    <Item>FPP UI</Item>
    <Item href="http://www.alipay.com/">Home</Item>
    <Item>Breadcrumb</Item>
  </Breadcrumb>
);

export const defaultComp = Template.bind({});
defaultComp.args = {
  separator: '/'
};

