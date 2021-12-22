
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Table from './index';

export default {
  title: 'Example/Table',
  component: Table,
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;
