import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Row, Col } from './index';

export default {
  title: 'Layout/Grid',
  component: Row,
  argTypes: {
    // Row
    gutter: {
      description: '栅格间隔，可以写成像素值或支持响应式的对象写法来设置水平间隔 { xs: 8, sm: 16, md: 24}。或者使用数组形式同时设置 [水平间距, 垂直间距]',
      table: {
        category: 'Row',
        type: { summary: 'number | object | array' },
        defaultValue: {
          summary: 0
        }
      },
    },
    align: {
      description: '垂直对齐方式',
      table: {
        category: 'Row',
        type: { summary: 'top | middle | bottom' },
        defaultValue: {
          summary: 'top'
        }
      },
    },
    justify: {
      description: '水平排列方式',
      table: {
        category: 'Row',
        type: { summary: 'start | end | center | space-around | space-between' },
        defaultValue: {
          summary: 'start'
        }
      },
    },
    wrap: {
      description: '水平排列方式',
      table: {
        category: 'Row',
        type: { summary: 'boolean' },
        defaultValue: {
          summary: true
        }
      },
    },
    // col
    flex: {
      description: 'flex 布局属性',
      table: {
        category: 'Col',
        type: { summary: 'string | number' },
      },
    },
    span: {
      description: '栅格占位格数，为 0 时相当于 display: none',
      table: {
        category: 'Col',
        type: { summary: 'number' },
      },
    },
    order: {
      description: '栅格顺序',
      table: {
        category: 'Col',
        type: { summary: 'number' },
        defaultValue: {
          summary: 0
        }
      },
    },
    offset: {
      description: '栅格左侧的间隔格数，间隔内不可以有栅格',
      table: {
        category: 'Col',
        type: { summary: 'number' },
        defaultValue: {
          summary: 0
        }
      },
    },
    push: {
      description: '栅格向右移动格数',
      table: {
        category: 'Col',
        type: { summary: 'number' },
        defaultValue: {
          summary: 0
        }
      },
    },
    pull: {
      description: '栅格向左移动格数',
      table: {
        category: 'Col',
        type: { summary: 'number' },
        defaultValue: {
          summary: 0
        }
      },
    }
  },
} as ComponentMeta<typeof Row>;

const Template: ComponentStory<typeof Row> = (args) => (
  <Row {...args}>
    <Col span={12}><div style={{textAlign: "center", color:'#fff', background:"#6554C0"}}>1</div></Col>
    <Col span={12}><div style={{textAlign: "center", color:'#fff', background:"#6554C0"}}>2</div></Col>
    <Col span={12}><div style={{textAlign: "center", color:'#fff', background:"#6554C0"}}>3</div></Col>
    <Col span={12}><div style={{textAlign: "center", color:'#fff', background:"#6554C0"}}>4</div></Col>
  </Row>
);

export const Gutter = Template.bind({});
Gutter.args = {
  gutter: [10,10],
  wrap: true,
  align: 'top',
  justify: 'start'
};

