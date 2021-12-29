
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
import Radio from './index';
import Button from '../Button';

export default {
  title: 'DataEntry/Radio',
  component: Radio,
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
        category: 'Radio/Radio.Button',
      },
      defaultValue: { summary: false },
      description: '自动获取焦点',
    },
    checked: {
      table: {
        category: 'Radio/Radio.Button',
      },
      defaultValue: { summary: false },
      description: '指定当前是否选中',
    },
    defaultChecked: {
      table: {
        category: 'Radio/Radio.Button',
      },
      defaultValue: { summary: false },
      description: '初始是否选中',
      control: false
    },
    disabled: {
      table: {
        category: 'Radio/Radio.Button',
      },
      defaultValue: { summary: false },
      description: '禁用 Radio',
    },
    value: {
      table: {
        category: 'Radio/Radio.Button',
        type: { summary: 'any' },
      },
      defaultValue: { summary: '-' },
      description: '根据 value 进行比较，判断是否选中',
    },

    buttonStyle: {
      table: {
        category: 'RadioGroup',
        type: { summary: 'outline | solid' },
      },
      defaultValue: { summary: 'outline' },
      description: 'RadioButton 的风格样式，目前有描边和填色两种风格',
    },
    defaultValue: {
      table: {
        category: 'RadioGroup',
        type: { summary: 'any' },
      },
      defaultValue: { summary: '-' },
      description: '默认选中的选项',
      control: false
    },
    name: {
      table: {
        category: 'RadioGroup',
        type: { summary: 'string' },
      },
      defaultValue: { summary: '-' },
      description: 'RadioGroup 下所有 input[type="radio"] 的 name 属性',
      control: false
    },
    options: {
      table: {
        category: 'RadioGroup',
        type: { summary: 'string[] | Array<{ label: string value: string disabled?: boolean }>' },
      },
      defaultValue: { summary: '-' },
      description: '以配置形式设置子元素',
      control: false
    },
    optionType: {
      table: {
        category: 'RadioGroup',
        type: { summary: 'default | button' },
      },
      defaultValue: { summary: 'default' },
      description: '用于设置 Radio options 类型',
      control: false
    },
    size: {
      table: {
        category: 'RadioGroup',
        type: { summary: 'large | middle | small' },
      },
      defaultValue: { summary: '-' },
      description: '大小，只对按钮样式生效',
      control: false
    },
    onChange: {
      table: {
        category: 'RadioGroup',
        type: { summary: 'function(e:Event)' }
      },
      description: '变化时回调函数',
    },
  },
  parameters: {
    docs: {
      page: () => (
        <>
          <Title>
            Radio单选框
          </Title>
          <Description>单选框。</Description>
          <Title>何时使用</Title>
          <Description>- 用于在多个备选项中选中单个状态。</Description>
          <Description>- 和 Select 的区别是，Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多。</Description>
          <Title>代码演示</Title>
          <Subtitle>基础用法</Subtitle>
          <Description>简单的 radio</Description>
          <Primary>
            <BasicUsage />
          </Primary>
          <Subtitle>不可用</Subtitle>
          <Description>checkbox 不可用。</Description>
          <Primary name='Unavailable'>
            <Unavailable />
          </Primary>
          <Subtitle>单选组合</Subtitle>
          <Description>一组互斥的 Radio 配合使用。</Description>
          <Primary name='Single'>
            <Single />
          </Primary>
          <Subtitle>单选组合 - 配合 name 使用</Subtitle>
          <Description>可以为 Radio.Group 配置 name 参数，为组合内的 input 元素赋予相同的 name 属性，使浏览器把 Radio.Group 下的 Radio 真正看作是一组（例如可以通过方向键始终在同一组内更改选项）。</Description>
          <Primary name='Radiocombination'>
            <Radiocombination />
          </Primary>
          <Subtitle>按钮样式</Subtitle>
          <Description>按钮样式的单选组合。</Description>
          <Primary name='Buttonstyle'>
            <Buttonstyle />
          </Primary>
          <Subtitle>大小</Subtitle>
          <Description>大中小三种组合，可以和表单输入框进行对应配合。</Description>
          <Primary name='Size'>
            <Size />
          </Primary>
          <Subtitle>填底的按钮样式</Subtitle>
          <Description>实色填底的单选按钮样式。</Description>
          <Primary name='Solid'>
            <Solid />
          </Primary>
          <Subtitle>Radio.Group 组合 - 配置方式</Subtitle>
          <Description>通过配置 options 参数来渲染单选框。也可通过 optionType 参数来设置 Radio 类型。</Description>
          <Primary name='Combination'>
            <Combination />
          </Primary>
          <ArgsTable story={PRIMARY_STORY} />
        </>
      ),
      source: {
        type: 'code',
      },
    },
  },
} as ComponentMeta<typeof Radio>;


// 基础用法
const BasicUsageTemplate: ComponentStory<typeof Radio> = () => (<Radio>Radio</Radio>);
export const BasicUsage = BasicUsageTemplate.bind({});

// 不可用
const UnavailableTemplate: ComponentStory<typeof Radio> = () => {
  const [disabled, setDisabled] = React.useState(true)

  const toggleDisabled = () => {
    setDisabled(!disabled)
  };
  return (
    <>
      <Radio defaultChecked={false} disabled={disabled}>
        Disabled
      </Radio>
      <Radio defaultChecked disabled={disabled}>
        Disabled
      </Radio>
      <br />
      <Button primary onClick={toggleDisabled} style={{ marginTop: 16 }}>
        Toggle disabled
      </Button>
    </>
  )
};
export const Unavailable = UnavailableTemplate.bind({});

// 单选组合
const SingleCombinationTemplate = () => {
  const [value, setValue] = React.useState(1);

  const onChange = e => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <Radio.Group onChange={onChange} value={value}>
      <Radio value={1}>A</Radio>
      <Radio value={2}>B</Radio>
      <Radio value={3}>C</Radio>
      <Radio value={4}>D</Radio>
    </Radio.Group>
  )
}
export const Single = SingleCombinationTemplate.bind({});

// 单选组合 - 配合 name 使用
const RadiocombinationTemplate = () => {
  return (
    <Radio.Group name="radiogroup" defaultValue={1}>
      <Radio value={1}>A</Radio>
      <Radio value={2}>B</Radio>
      <Radio value={3}>C</Radio>
      <Radio value={4}>D</Radio>
    </Radio.Group>
  )
}
export const Radiocombination = RadiocombinationTemplate.bind({});


// 按钮样式
const ButtonstyleTemplate = () => {
  const [value, setValue] = React.useState(1);

  const onChange = e => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <>
      <Radio.Group onChange={onChange} defaultValue="a">
        <Radio.Button value="a">Hangzhou</Radio.Button>
        <Radio.Button value="b">Shanghai</Radio.Button>
        <Radio.Button value="c">Beijing</Radio.Button>
        <Radio.Button value="d">Chengdu</Radio.Button>
      </Radio.Group>
      <Radio.Group onChange={onChange} defaultValue="a" style={{ marginTop: 16 }}>
        <Radio.Button value="a">Hangzhou</Radio.Button>
        <Radio.Button value="b" disabled>
          Shanghai
        </Radio.Button>
        <Radio.Button value="c">Beijing</Radio.Button>
        <Radio.Button value="d">Chengdu</Radio.Button>
      </Radio.Group>
      <Radio.Group disabled onChange={onChange} defaultValue="a" style={{ marginTop: 16 }}>
        <Radio.Button value="a">Hangzhou</Radio.Button>
        <Radio.Button value="b">Shanghai</Radio.Button>
        <Radio.Button value="c">Beijing</Radio.Button>
        <Radio.Button value="d">Chengdu</Radio.Button>
      </Radio.Group>
    </>
  )
}
export const Buttonstyle = ButtonstyleTemplate.bind({});

// 大小
const SizeTemplate = () => {
  return (
    <>
      <Radio.Group defaultValue="a" size="large">
        <Radio.Button value="a">Hangzhou</Radio.Button>
        <Radio.Button value="b">Shanghai</Radio.Button>
        <Radio.Button value="c">Beijing</Radio.Button>
        <Radio.Button value="d">Chengdu</Radio.Button>
      </Radio.Group>
      <Radio.Group defaultValue="a" style={{ marginTop: 16 }}>
        <Radio.Button value="a">Hangzhou</Radio.Button>
        <Radio.Button value="b">Shanghai</Radio.Button>
        <Radio.Button value="c">Beijing</Radio.Button>
        <Radio.Button value="d">Chengdu</Radio.Button>
      </Radio.Group>
      <Radio.Group defaultValue="a" size="small" style={{ marginTop: 16 }}>
        <Radio.Button value="a">Hangzhou</Radio.Button>
        <Radio.Button value="b">Shanghai</Radio.Button>
        <Radio.Button value="c">Beijing</Radio.Button>
        <Radio.Button value="d">Chengdu</Radio.Button>
      </Radio.Group>
    </>
  )
}
export const Size = SizeTemplate.bind({});

// 填底的按钮样式
const SolidTemplate = () => {
  return (
    <>
      <Radio.Group defaultValue="a" buttonStyle="solid">
        <Radio.Button value="a">Hangzhou</Radio.Button>
        <Radio.Button value="b">Shanghai</Radio.Button>
        <Radio.Button value="c">Beijing</Radio.Button>
        <Radio.Button value="d">Chengdu</Radio.Button>
      </Radio.Group>
      <Radio.Group defaultValue="c" buttonStyle="solid" style={{ marginTop: 16 }}>
        <Radio.Button value="a">Hangzhou</Radio.Button>
        <Radio.Button value="b" disabled>
          Shanghai
        </Radio.Button>
        <Radio.Button value="c">Beijing</Radio.Button>
        <Radio.Button value="d">Chengdu</Radio.Button>
      </Radio.Group>
    </>
  )
}
export const Solid = SolidTemplate.bind({});

// Radio.Group 组合 - 配置方式
const CombinationTemplate = () => {
  const plainOptions = ['Apple', 'Pear', 'Orange'];
  const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
  ];
  const optionsWithDisabled = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange', disabled: true },
  ];

  const [value1, setValue1] = React.useState('Apple');
  const [value2, setValue2] = React.useState('Apple');
  const [value3, setValue3] = React.useState('Apple');
  const [value4, setValue4] = React.useState('Apple');

  const onChange1 = e => {
    console.log('radio1 checked', e.target.value);
    setValue1(e.target.value)
  };

  const onChange2 = e => {
    console.log('radio2 checked', e.target.value);
    setValue2(e.target.value)
  };

  const onChange3 = e => {
    console.log('radio3 checked', e.target.value);
    setValue3(e.target.value)
  };

  const onChange4 = e => {
    console.log('radio4 checked', e.target.value);
    setValue4(e.target.value)
  };
  return (
    <>
      <Radio.Group options={plainOptions} onChange={onChange1} value={value1} />
      <br />
      <Radio.Group options={optionsWithDisabled} onChange={onChange2} value={value2} />
      <br />
      <br />
      <Radio.Group
        options={options}
        onChange={onChange3}
        value={value3}
        optionType="button"
      />
      <br />
      <br />
      <Radio.Group
        options={optionsWithDisabled}
        onChange={onChange4}
        value={value4}
        optionType="button"
        buttonStyle="solid"
      />
    </>
  )
}
export const Combination = CombinationTemplate.bind({});