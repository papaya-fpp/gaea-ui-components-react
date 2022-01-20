
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
  Canvas,
  Wrapper,
} from '@storybook/addon-docs';
import Switch from './index';

export default {
  title: 'DataEntry/Switch',
  component: Switch,
  argTypes: {
    prefixCls: {
      table: {
        disable: true
      }
    },
    className: {
      table: {
        disable: true
      }
    },
    style: {
      table: {
        disable: true
      }
    },
    onClick: {
      table: {
        disable: true
      }
    },
    onMouseEnter: {
      table: {
        disable: true
      }
    },
    onMouseLeave: {
      table: {
        disable: true
      }
    },
    onKeyPress: {
      table: {
        disable: true
      },
    },
    onKeyDown: {
      table: {
        disable: true
      }
    },
    tabIndex: {
      table: {
        disable: true
      }
    },
    id: {
      table: {
        disable: true
      }
    },
    type: {
      table: {
        disable: true
      }
    },
    skipGroup: {
      table: {
        disable: true
      }
    },
    autoFocus: {
      table: {
        category: 'Checkbox',
      },
      defaultValue: { summary: false },
      description: '自动获取焦点',
    },
    checked: {
      table: {
        category: 'Checkbox',
      },
      defaultValue: { summary: false },
      description: '指定当前是否选中',
    },
    defaultChecked: {
      table: {
        category: 'Checkbox',
      },
      defaultValue: { summary: false },
      description: '初始是否选中',
      control: false
    },
    disabled: {
      table: {
        category: 'Checkbox',
      },
      defaultValue: { summary: false },
      description: '失效状态',
    },
    indeterminate: {
      table: {
        category: 'Checkbox',
      },
      defaultValue: { summary: false },
      description: '设置 indeterminate 状态，只负责样式控制',
    },
    onChange: {
      table: {
        category: 'Checkbox',
      },
      description: '变化时回调函数',
    },
    defaultValue: {
      table: {
        category: 'Checkbox Group',
        type: { summary: 'string[]' },
      },
      defaultValue: { summary: '[]' },
      description: '默认选中的选项',
      control: false
    },
    name: {
      table: {
        category: 'Checkbox Group',
        type: { summary: 'string' },
      },
      defaultValue: { summary: '-' },
      description: 'CheckboxGroup 下所有 input[type="checkbox"] 的 name 属性',
      control: false
    },
    options: {
      table: {
        category: 'Checkbox Group',
        type: { summary: 'string[] | Option[]' },
      },
      defaultValue: { summary: '[]' },
      description: '指定可选项',
      control: false
    },
    value: {
      table: {
        category: 'Checkbox Group',
        type: { summary: 'string[]' },
      },
      defaultValue: { summary: '[]' },
      description: '指定选中的选项',
      control: false
    },
  },
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>
            Switch 开关
          </Title>
          <Description>开关选择器。</Description>
          <Title>何时使用</Title>
          <Description>- 需要表示开关状态/两种状态之间的切换时；</Description>
          <Description>- 和 checkbox 的区别是，切换 switch 会直接触发状态改变，而 checkbox 一般用于状态标记，需要和提交操作配合。</Description>
          <Title>代码演示</Title>
          <Subtitle>基础用法</Subtitle>
          <Description>最简单的用法。</Description>
          <Primary>
            <BasicUsage />
          </Primary>
          <Title>API</Title>
          <ArgsTable story={PRIMARY_STORY} />
        </>
      ),
      source: {
        type: 'code',
      },
    },
  },
} as ComponentMeta<typeof Switch>;


// 基础用法
const BasicUsageTemplate: ComponentStory<typeof Switch> = () => {
  function onChange(checked) {
    console.log(`switch to ${checked}`);
  }
  return <Switch defaultChecked onChange={onChange} />
};
export const BasicUsage = BasicUsageTemplate.bind({});

