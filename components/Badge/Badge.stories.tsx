
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Badge from './index';

export default {
  title: 'DataSHow/Badge',
  component: Badge,
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (args) => (
  <Badge {...args}>
    <div style={{width:'30px', height: '30px', background:'#ccc'}}></div>
  </Badge>
);

export const BadgeDefault = Template.bind({});
BadgeDefault.args = {
  count: 10,
  overflowCount: 99,
  size: "default"
}