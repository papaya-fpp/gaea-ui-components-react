import React,{useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Input } from './index';
import Icon from '../Icon'
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Input',
  component: Input,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
    // size: {
    //   description: '尺寸',
    //   defaultValue: 'medium',
    //   control: {
    //     type: 'select',
    //     options: [ 'small', 'medium', 'large'],
    //   },
    // },
  },
} as ComponentMeta<typeof Input>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;
// const [value,setValue] = useState('')
let value = ''
const handleChange = (val)=>{
  value = val
}
const handleOnAddon = ()=>{

}
export const error = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
error.args = {
  value:value,
  error:value==='',
  errorText: value===''?'您输入的不能为空！':'',
  label: 'Input',
  onChange:handleChange(value)
};

export const readonly = Template.bind({});
readonly.args = {
  readonly: true,
  placeholder:'当前输入框不可编辑'
};

export const password = Template.bind({});
password.args = {
  placeholder:'login_Password',
  type:"password",
  name:"password",
  value:value,
  onChange:handleChange(value)
};

export const textarea = Template.bind({});
textarea.args = {
  placeholder:'textarea',
  type:"textarea",
  name:"textarea",
  value:value,
  onChange:handleChange(value)
};

export const search = Template.bind({});
search.args = {
  placeholder:'login_Password',
  type:"search",
  name:"search",
  value:value,
  prefix:<Icon
      size={16}
      className="margin-right10"
      name="iconkeyidong"
  />,
  suffix:<i className="iconfont icon-Search" />,
  groupAddon:<span>@</span>,
  onAddon:handleOnAddon(),
  onChange:handleChange(value)
};