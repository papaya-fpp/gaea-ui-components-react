
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Form from './index';
import Input from './Input'
import Select from './Select'

export default {
  title: 'Example/Form',
  component: Form,
} as ComponentMeta<typeof Form>;

const [form] = Form.useForm();
// 表单值改变
const onChangeHandle = (val, values) => {

}
const Template: ComponentStory<typeof Form> = (args) => (
    <Form form={form} onValuesChange={onChangeHandle}>
      <div className="py-checkoutFrom-row">
        <Form.Item
            className="py-form-item"
            name="first_name"
            rules={ [{ required: true, message: '输入内容不能为空' }]}
        >
          <Input
              className="py-form-input"
              placeholder="请输入"
              maxLength={30}
          />
        </Form.Item>
      </div>
    </Form>
);
export const FormExample = Template.bind({});
