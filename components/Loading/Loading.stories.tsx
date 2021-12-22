import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Loading from './index';

export default {
  title: 'Feedback/Loading',
  component: Loading,
  
} as ComponentMeta<typeof Loading>;

const Template: ComponentStory<typeof Loading> = (args: any) => (
  <div>
    <p>Loading Components:</p>
    <div style={{width: '200px', height: '200px', border: '1px solid #ccc'}}>
      <Loading {...args} />
    </div>
  </div>
)

export const defaultStyle = Template.bind({});
defaultStyle.args = {
  loading: true,
  text:'loading...',
  fullScreen:false,
  opacity:false,
};
