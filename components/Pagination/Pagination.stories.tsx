
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Pagination from './index';

export default {
  title: 'Example/Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => {
  return (
      <Pagination {...args} />
  )
};
export const PaginationBase = Template.bind({});
PaginationBase.args = {
  total:200,
  current:1,
  PageSize:10
}

export const PaginationshowSizeSelect = Template.bind({});
PaginationshowSizeSelect.args = {
  total:200,
  current:1,
  PageSize:10,
  showSizeChanger:true
}

export const PaginationshowShowTotal = Template.bind({});
PaginationshowShowTotal.args = {
  total:200,
  current:1,
  PageSize:10,
  showSizeChanger:true,
  showTotal:'共200条'
}