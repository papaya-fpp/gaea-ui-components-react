
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import List from './index';

export default {
  title: 'DataSHow/List',
  component: List,
} as ComponentMeta<typeof List>;

export const Template: ComponentStory<typeof List> = (args) => {
  const testlist = []
  for(let i=1; i<6;i++){
    testlist.push(`list-item-${i}`)
  }

return (
  <List>
    {testlist.map(t=><List.Item key={t}>{t}</List.Item>)}
  </List>)
}


