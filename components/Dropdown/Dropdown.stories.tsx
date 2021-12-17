
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Dropdown from './index';

export default {
  title: 'Nav/Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const defaultDropdown = Template.bind({});
defaultDropdown.args = {
  title: 'click me'
};