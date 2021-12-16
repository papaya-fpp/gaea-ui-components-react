
import React, {useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Select from './index';
const { Option } = Select;
export default {
  title: 'Example/Select',
  component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => {
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
  )
};
export const SelectExample = Template.bind({});