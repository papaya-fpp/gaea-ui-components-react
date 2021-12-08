import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Hello from './index';

export default {
  title: 'Example/Hello',
  component: Hello,
} as ComponentMeta<typeof Hello>;

const Template: ComponentStory<typeof Hello> = (args) => <Hello {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {},
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
