
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Form from './index';

export default {
  title: 'Example/Form',
  component: Form,
} as ComponentMeta<typeof Form>;

const Template: ComponentStory<typeof Form> = (args) => <Form {...args} />;
export const form1 = Template.bind({});