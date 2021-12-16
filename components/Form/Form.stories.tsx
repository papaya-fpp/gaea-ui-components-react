
import React, {useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Form from './index';
import Input from './Input/index';
// const [form] = Form.useForm();
import Select from './Select/index';
const { Option } = Select;
export default {
  title: 'Example/Form',
  component: Form,
} as ComponentMeta<typeof Form>;

const Template: ComponentStory<typeof Form> = (args) => {
    const [optionList,setOptionList] = useState([
        {
            id:'1',
            value:'1',
            label:'1',
        },
        {
            id:'2',
            value:'2',
            label:'2',
        },
        {
            id:'3',
            value:'3',
            label:'3',
        },
        {
            id:'4',
            value:'4',
            label:'4',
        },
        {
            id:'5',
            value:'5',
            label:'5',
        },
    ])
    // 国家省份 select 过滤
    const selectFilter = (inputValue, option) => {
        return option.children.toLocaleLowerCase().indexOf(inputValue.toLocaleLowerCase()) > -1;
    };
    const mobileNoScroll = (e) => e.preventDefault();
    // select 获得失去焦点
    const selectIsFocus = (type) => {
        const dom = document.querySelectorAll('.ant-select-dropdown');
        if (dom) {
            if (type) {
                dom.forEach((item) => item.addEventListener('touchmove', mobileNoScroll, { passive: false }));
            } else {
                dom.forEach((item) => item.removeEventListener('touchmove', mobileNoScroll));
            }
        }
        // onIsFocusChange && onIsFocusChange(type);
    };

    return (
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
            <div className="py-checkoutFrom-row">
                <Form.Item
                    className="py-form-item py-form-item-select"
                    name="singlePage_country_code"
                    rules={[{ required: true, message: '不能为空'  }]}
                >
                    <Select
                        allowClear={true}
                        showSearch
                        placeholder="请输入"
                        className="py-checkoutFrom-select"
                        filterOption={selectFilter}
                        onBlur={() => selectIsFocus(false)}
                        onFocus={() => selectIsFocus(true)}
                    >
                        {optionList &&
                        optionList.map((item) => (
                            <Option key={item.id} value={item.value}>
                                {item.label}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </div>
        </Form>
    )
}

export const form = Template.bind({});