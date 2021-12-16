
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Modal from './index';

export default {
  title: 'Example/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;
let visible = true
const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;
export const ModalExample = Template.bind({});
ModalExample.args = {
  visible: visible,
  wrapClassName: 'self-modal',
  // width: 500,
  title: <div>标题d</div>,
  cancelText: '取消',
  okText: '确定',
  children: <div>弹窗内容</div>,
  onCancel: visible = false,
  onOK: visible = false,
  closable: true,
  // footer: '底部',
  maskClosable: true,
}