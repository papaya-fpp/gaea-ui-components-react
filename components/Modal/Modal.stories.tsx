import React, {useState, useEffect} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import Modal from './index';
import Button from '../Button/index'

export default {
    title: 'Feedback/Modal',
    component: Modal,
} as ComponentMeta<typeof Modal>;
const Template: ComponentStory<typeof Modal> = (args) => {

    const [visible, setVisible] = useState(args.visible);

    const onCancelHandle = () => {
        setVisible(false);
    }
    const confirm = () => {
        Modal.confirm({
            title: 'Confirm',
            // icon: '',
            content: 'Bla bla ...',
            okText: 'confirm',
            cancelText: 'cancel',
        });
    }
    useEffect(() => {
        setVisible(args.visible)
    }, [args.visible])

    return (
        <div>
            <Button onClick={confirm}>confirm</Button>
            <Modal {...args} onCancel={onCancelHandle} onOK={confirm} visible={visible}/>
        </div>)
};
export const ModalExample = Template.bind({});
ModalExample.args = {
    visible: true,
    wrapClassName: 'self-modal',
    // width: 500,
    title: <div>标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</div>,
    cancelText: '取消',
    okText: '确定',
    children: <div>弹窗内容弹窗内容弹窗内容弹窗内容弹窗内容弹窗内容弹窗内容弹窗内容弹窗内容弹窗内容弹窗内容弹窗内容弹窗内容弹窗内容弹窗内容弹窗内容弹窗内容弹窗内容弹窗内容弹窗内容弹窗内容弹窗内容弹窗内容弹窗内容弹窗内容弹窗内容弹窗内容</div>,
    onCancel: () => {
    },
    onOK: () => {
    },
    okButtonBgColor:'',
    cancelButtonBgColor:'',
    closable: true,
    // footer: '底部',
    maskClosable: true,
}