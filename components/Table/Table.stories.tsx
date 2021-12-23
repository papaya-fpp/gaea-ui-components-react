
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Table from './index';

export default {
  title: 'DataShow/Table',
  component: Table,
} as ComponentMeta<typeof Table>;
const dataSource = [
  // {
  //   key: '1',
  //   name: '胡彦斌',
  //   age: 32,
  //   address: '西湖区湖底公园1号',
  //   children:[
  //     {
  //       key: '1-1',
  //       name: '胡彦斌1',
  //       age: 321,
  //       address: '西湖区湖底公园1号1',
  //     }
  //   ],
  // },
  // {
  //   key: '2',
  //   name: '胡彦祖',
  //   age: 42,
  //   address: '西湖区湖底公园1号',
  // },
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];
const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;
export const tableBase = Template.bind({});
tableBase.args = {
  rowKey:'key',
  bordered:true,
  dataSource:dataSource,
  columns:columns,
  width:800,
}