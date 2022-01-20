
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
import Message from './index';
import Button from '../Button';

export default {
  title: 'DataEntry/Message',
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
            Message全局提示
          </Title>
          <Description>全局展示操作反馈信息。</Description>
          <Title>何时使用</Title>
          <Description>- 可提供成功、警告和错误等反馈信息。</Description>
          <Description>- 顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。</Description>
          <Title>代码演示</Title>
          <Subtitle>普通提示</Subtitle>
          <Description>信息提醒反馈。</Description>
          <Primary>
            <BasicUsage />
          </Primary>
          <Subtitle>其他提示类型</Subtitle>
          <Description>包括成功、失败、警告。</Description>
          <Primary name='Other'>
            <Other />
          </Primary>
          <Subtitle>修改延时</Subtitle>
          <Description>自定义时长 10s，默认时长为 3s。</Description>
          <Primary name='Duration'>
            <Duration />
          </Primary>
          <Subtitle>加载中</Subtitle>
          <Description>进行全局 loading，异步自行移除。</Description>
          <Primary name='Loading'>
            <Loading />
          </Primary>
          <Subtitle>Promise 接口</Subtitle>
          <Description>可以通过 then 接口在关闭后运行 callback 。以上用例将在每个 message 将要结束时通过 then 显示新的 message。</Description>
          <Primary name='Promise'>
            <Promise />
          </Primary>
          <Subtitle>自定义样式</Subtitle>
          <Description>使用 style 和 className 来定义样式。</Description>
          <Primary name='Custom'>
            <Custom />
          </Primary>
          <Subtitle>更新消息内容</Subtitle>
          <Description>可以通过唯一的 key 来更新内容。</Description>
          <Primary name='Update'>
            <Update />
          </Primary>
          <Subtitle>通过 Hooks 获取上下文</Subtitle>
          <Description>通过 message.useMessage 创建支持读取 context 的 contextHolder。</Description>
          <Primary name='Hooks'>
            <Hooks />
          </Primary>
        </>
      ),
      source: {
        type: 'code',
      },
    },
  },
} as any;


// 基础用法
const BasicUsageTemplate: any = () => {
  const info = () => {
    Message.info('This is a normal message');
  };
  return (
    <Button primary onClick={info}>
      Display normal message
    </Button>
  )
};
export const BasicUsage = BasicUsageTemplate.bind({});


// 基础用法
const OtherTemplate: any = () => {
  const success = () => {
    Message.success('This is a success message');
  };
  
  const error = () => {
    Message.error('This is an error message');
  };
  
  const warning = () => {
    Message.warning('This is a warning message');
  };
  return (
    <>
      <Button onClick={success}>Success</Button>
      <Button onClick={error}>Error</Button>
      <Button onClick={warning}>Warning</Button>
    </>
  )
};
export const Other = OtherTemplate.bind({});

// 自定义时间
const DurationTemplate: any = () => {
  const success = () => {
    Message.success('This is a prompt message for success, and it will disappear in 10 seconds', 10);
  };
  return <Button onClick={success}>Customized display duration</Button>
};
export const Duration = DurationTemplate.bind({});

// loading
const LoadingTemplate: any = () => {
  const success = () => {
    const hide = Message.loading('Action in progress..', 0);
    // Dismiss manually and asynchronously
    setTimeout(hide, 2500);
  };
  return <Button onClick={success}>Display a loading indicator</Button>
};
export const Loading = LoadingTemplate.bind({});

// Promise
const PromiseTemplate: any = () => {
  const success = () => {
    Message
      .loading('Action in progress..', 2.5)
      .then(() => Message.success('Loading finished', 2.5))
      .then(() => Message.info('Loading finished is finished', 2.5));
  };
  return <Button onClick={success}>Display sequential messages</Button>
};
export const Promise = PromiseTemplate.bind({});

// custom
const CustomTemplate: any = () => {
  const success = () => {
    Message.success({
      content: 'This is a prompt message with custom className and style',
      className: 'custom-class',
      style: {
        marginTop: '20vh',
      },
    });
  };
  return <Button onClick={success}>Customized style</Button>
};
export const Custom = CustomTemplate.bind({});

// update
const UpdateTemplate: any = () => {
  const key = 'updatable';

  const openMessage = () => {
    Message.loading({ content: 'Loading...', key });
    setTimeout(() => {
      Message.success({ content: 'Loaded!', key, duration: 2 });
    }, 1000);
  };
  return (
    <>
      <Button primary onClick={openMessage}>
      Open the message box
    </Button>
    </>
  )
};
export const Update = UpdateTemplate.bind({});


const Context = React.createContext({ name: 'Default' });
// Hooks
const HooksTemplate: any = () => {

  const [messageApi, contextHolder] = Message.useMessage();
  const info = () => {
    messageApi.open({
      type: 'info',
      content: <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>,
      duration: 1,
    });
  };

  return (
    <Context.Provider value={{ name: 'Ant Design' }}>
      {contextHolder}
      <Button primary onClick={info}>
        Display normal message
      </Button>
    </Context.Provider>
  )
};
export const Hooks = HooksTemplate.bind({});
