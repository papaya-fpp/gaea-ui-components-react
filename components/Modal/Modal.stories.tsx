
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Modal from './index';

export default {
  title: 'Example/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => (
    <Modal {...args} />
);
export const ModalExample = Template.bind({});
ModalExample.args = {
  visible: true,
  title:'测试Modal 标题',
  width: 100,
  cancelText: '取消',
  okText: '确定',
  children: <div>弹窗</div>,
  closable: true,
  footer: <div>弹窗</div>,
  maskClosable: true,
};