import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Loading from './index';

export default {
  title: 'Feedback/Loading',
  component: Loading,
  argTypes: {
    loading: {
      type: 'boolean',
      description: '是否展示',
      table: {
        type: { summary: 'boolean' },
        defaultValue: {
          summary: false
        }
      }
    },
    text: {
      type: 'string',
      description: '文字',
      table: {
        type: { summary: 'text' },
        defaultValue: {
          summary: ''
        }
      }
    },
    fullScreen: {
      type: 'boolean',
      description: '是否全屏',
      table: {
        type: { summary: 'boolean' },
        defaultValue: {
          summary: false
        }
      }
    },
    opacity: {
      type: 'boolean',
      description: '是否隐藏背景色',
      table: {
        type: { summary: 'boolean' },
        defaultValue: {
          summary: false
        }
      }
    },
  }
} as ComponentMeta<typeof Loading>;

const Template: ComponentStory<typeof Loading> = (args: any) => (
  <div>
    <p>Loading Components:</p>
    <div style={{width: '200px', height: '200px', border: '1px solid #ccc'}}>
      <Loading {...args}>
          <div>111</div>
      </Loading>
    </div>
  </div>
)

export const defaultStyle = Template.bind({});
defaultStyle.args = {
  loading: true,
  text:'loading...',
  fullScreen: false,
  opacity: false,
};
