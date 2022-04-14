
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from '../Button/index'
import Card from './index';

export default {
  title: 'DataShow/Card',
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => {
  return (
      <Card expandable={false} title="cardTitle" className="self-card" style={{marginTop:'20px'}} footer={<Button>确定</Button>} extra={<Button>激活</Button>} {...args} >
        卡片内容
        卡片内容
        卡片内容
        卡片内容
        卡片内容
        卡片内容
        卡片内容
        卡片内容
        卡片内容
        卡片内容
        卡片内容
        卡片内容
        卡片内容
      </Card>
  )
};

export const card = Template.bind({});