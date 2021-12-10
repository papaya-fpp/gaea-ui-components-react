import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Row, Col } from './index';

export default {
  title: 'Layout/Grid',
  component: Row,
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
  wrap: false
};

