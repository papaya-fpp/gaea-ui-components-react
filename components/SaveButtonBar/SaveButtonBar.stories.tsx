
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SaveButtonBar from './index';

export default {
  title: 'DataEntry/SaveButtonBar',
  component: SaveButtonBar,
} as ComponentMeta<typeof SaveButtonBar>;

const Template: ComponentStory<typeof SaveButtonBar> = (args) => <SaveButtonBar {...args} />;
export const saveBar = Template.bind({});
saveBar.args = {
  isShow :true,
  loading :true,
};
