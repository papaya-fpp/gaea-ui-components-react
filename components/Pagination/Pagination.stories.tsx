
import React, {useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Pagination from './index';
import Button from '../Button/index';

export default {
  title: 'NAV/Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => {
  const [current,setCurrent] = useState(2)
  return (
      <div>
        <Button onClick={()=>{setCurrent(1)}}>切换current</Button>
        <Pagination current={current} {...args} />
      </div>
  )
};
export const PaginationBase = Template.bind({});
PaginationBase.args = {
  total:200,
  // current:1,
  PageSize:10
}

export const PaginationshowSizeSelect = Template.bind({});
PaginationshowSizeSelect.args = {
  total:200,
  // current:1,
  PageSize:10,
  showSizeChanger:true
}

export const PaginationshowShowTotal = Template.bind({});
PaginationshowShowTotal.args = {
  total:200,
  PageSize:10,
  showSizeChanger:true,
  showTotal:'共200条'
}