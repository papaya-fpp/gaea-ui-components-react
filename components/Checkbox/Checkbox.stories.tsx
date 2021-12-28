
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
import Checkbox from './index';
import Button from '../Button'

export default {
  title: 'DataEntry/Checkbox',
  component: Checkbox,
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
    value: {
      table: {
        disable: true
      }
    },
    tabIndex: {
      table: {
        disable: true
      }
    },
    name: {
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
      defaultValue: { summary: false },
      description: '自动获取焦点',
    },
    checked: {
      defaultValue: { summary: false },
      description: '指定当前是否选中',
    },
    defaultChecked: {
      defaultValue: { summary: false },
      description: '初始是否选中',
      control: false
    },
    disabled: {
      defaultValue: { summary: false },
      description: '失效状态',
    },
    indeterminate: {
      defaultValue: { summary: false },
      description: '设置 indeterminate 状态，只负责样式控制',
    },
    onChange: {
      description: '变化时回调函数',
    }
  },
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>
            Checkbox多选框
          </Title>
          <Description>多选框。</Description>
          <Title>何时使用</Title>
          <Description>- 在一组可选项中进行多项选择时；</Description>
          <Description>- 单独使用可以表示两种状态之间的切换，和 switch 类似。区别在于切换 switch 会直接触发状态改变，而 checkbox 一般用于状态标记，需要和提交操作配合。</Description>
          <Title>代码演示</Title>
          <Subtitle>基础用法</Subtitle>
          <Description>简单的 checkbox。</Description>
          <Primary>
            <BasicUsage />
          </Primary>
          <Subtitle>不可用</Subtitle>
          <Description>checkbox 不可用。</Description>
          <Primary name='Unavailable'>
            <Unavailable />
          </Primary>
          <Subtitle>受控的 checkbox</Subtitle>
          <Description>联动 checkbox。</Description>
          <Primary name='Controlled'>
            <Controlled />
          </Primary>
          <Subtitle>Checkbox 组</Subtitle>
          <Description>方便的从数组生成 Checkbox 组。</Description>
          <Primary name='Group'>
            <Group />
          </Primary>
          <Subtitle>全选</Subtitle>
          <Description>在实现全选效果时，你可能会用到 indeterminate 属性。</Description>
          <Primary name='All'>
            <All />
          </Primary>
          <Title>
            API
          </Title>
          <Description>###属性</Description>
          <Description>####Checkbox</Description>
          <ArgsTable story={PRIMARY_STORY} />
          {/* <Description>####Checkbox Group</Description> */}
        </>
      ),
      source: {
        type: 'code',
      },
    },
  },
} as ComponentMeta<typeof Checkbox>;


// 基础用法
const BasicUsageTemplate: ComponentStory<typeof Checkbox> = () => {
  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }
  return <Checkbox onChange={onChange}>Checkbox</Checkbox>
};
export const BasicUsage = BasicUsageTemplate.bind({});

// 不可用
const UnavailableTemplate: ComponentStory<typeof Checkbox> = () => {
  return (
    <>
      <Checkbox defaultChecked={false} disabled />
      <br />
      <Checkbox defaultChecked disabled />
    </>
  )
};
export const Unavailable = UnavailableTemplate.bind({});

// 受控的 checkbox
const ControlledTemplate: ComponentStory<typeof Checkbox> = () => {

  const [checked, setChecked] = React.useState(true)
  const [disabled, setDisabled] = React.useState(false)

  const toggleChecked = () => setChecked(!checked);

  const toggleDisable = () => setDisabled(!disabled);

  const onChange = e => {
    console.log('checked = ', e.target.checked);
    setChecked(e.target.checked)
  };

  const label = `${checked ? 'Checked' : 'Unchecked'}-${
    disabled ? 'Disabled' : 'Enabled'
  }`;

  return (
    <>
      <p style={{ marginBottom: '20px' }}>
        <Checkbox
          checked={checked}
          disabled={disabled}
          onChange={onChange}
        >
          {label}
        </Checkbox>
      </p>
      <p>
        <Button primary size="small" onClick={toggleChecked}>
          {!checked ? 'Check' : 'Uncheck'}
        </Button>
        <Button
          style={{ margin: '0 10px' }}
          primary
          size="small"
          onClick={toggleDisable}
        >
          {!disabled ? 'Disable' : 'Enable'}
        </Button>
      </p>
    </>
  )
};
export const Controlled = ControlledTemplate.bind({});

// Checkbox 组
const GroupTemplate: ComponentStory<typeof Checkbox> = () => {

  const plainOptions = ['Apple', 'Pear', 'Orange'];
  const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
  ];
  const optionsWithDisabled = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange', disabled: false },
  ];

  const onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
  }

  return (
    <>
      <Checkbox.Group options={plainOptions} defaultValue={['Apple']} onChange={onChange} />
      <br />
      <br />
      <Checkbox.Group options={options} defaultValue={['Pear']} onChange={onChange} />
      <br />
      <br />
      <Checkbox.Group
        options={optionsWithDisabled}
        disabled
        defaultValue={['Apple']}
        onChange={onChange}
      />
    </>
  )
};
export const Group = GroupTemplate.bind({});

// 全选
const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];
const SelectAllTemplate: ComponentStory<typeof Checkbox> = () => {

  const [checkedList, setCheckedList] = React.useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = React.useState(true);
  const [checkAll, setCheckAll] = React.useState(false);

  const onChange = list => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = e => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  return (
    <>
      <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
        Check all
      </Checkbox>
      <Checkbox.Group options={plainOptions} value={checkedList} onChange={onChange} />
    </>
  )
};
export const All = SelectAllTemplate.bind({});

All.parameters = {
  docs: {
    description: {
      story: 'Some story **markdown**',
    },
  },
};
