
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Dropdown from './index';

export default {
  title: 'Nav/Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const DropdownClick = Template.bind({});
DropdownClick.args = {
  title: 'click me',
  arrow: true,
  trigger: 'click',
  placement: 'bottomLeft',
  disabled: false,
  visible: true,
  list: [
    { key: '1', label: 'click 1'},
    { key: '2', label: 'click 2'}
  ]
};

export const DropdownHover = Template.bind({});
DropdownHover.args = {
  title: 'hover me',
  trigger: 'hover',
  list: [
    { key: '1', label: 'click 1'},
    { key: '2', label: 'click 2'}
  ]
};
