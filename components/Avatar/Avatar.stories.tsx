
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Avatar from './index';

export default {
  title: 'DataSHow/Avatar',
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const AvatarSrc = Template.bind({});
AvatarSrc.args = {
  src: "https://www.w3school.com.cn/i/eg_tulip.jpg",
  shape: 'circle'
}

export const AvatarIcon = Template.bind({});
AvatarIcon.args = {
  icon: "Settings"
}

export const AvatarChildren = Template.bind({});
AvatarChildren.args = {
  children: "U"
}