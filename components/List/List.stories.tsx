
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import List from './index';
import Item from './Item'

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
    {testlist.map(t=><Item key={t}>{t}</Item>)}
  </List>)
}


