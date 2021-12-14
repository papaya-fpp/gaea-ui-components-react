
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Form from './index';
import Input from './Input/index';
// const [form] = Form.useForm();
import Select from './Select/index';

export default {
  title: 'Example/Form',
  component: Form,
} as ComponentMeta<typeof Form>;

const Template: ComponentStory<typeof Form> = (args) =>(
    <Form  {...args}>
        <div className="py-checkoutFrom-row">
            <Form.Item
                className="py-form-item"
                name="first_name"
                rules={[{ required: true, message: '不能为空' }]
                }
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
export const form = Template.bind({});