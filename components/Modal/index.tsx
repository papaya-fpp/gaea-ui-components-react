import React, { useState, useEffect } from 'react';
import { fixedScroll, resetScroll } from '../_util/scrollControl';
import Button from '../Button/index';
import Icon from '../Icon';
import {getPrefixCls} from "../_util/responsiveObserve";
interface ModalProps {
    visible: Boolean;
    wrapClassName?: string;
    width?: number;
    title?: string | React.ReactNode;
    cancelText?: string | React.ReactNode;
    okText?: string | React.ReactNode;
    children?: any;
    onCancel?: any;
    onOK?: any;
    closable?: boolean;
    footer?: any;
    maskClosable?: boolean;
}

interface ModalComponentProps extends React.FC<ModalProps> {
    // confirm: typeof confirm;
}


const Modal: ModalComponentProps = ({
                                        visible,
                                        wrapClassName = '',
                                        width,
                                        title,
                                        cancelText = 'Cancel',
                                        okText = 'OK',
                                        children,
                                        onCancel,
                                        onOK,
                                        closable = false,
                                        footer,
                                        maskClosable = true
                                    }) => {
    const prefixCls = getPrefixCls('modal');
    const [target, setTarget] = useState(null);
    const [style] = useState(width ? { width: width + 'px' } : {});
    // 点击关闭
    const handleCancel = () => onCancel && onCancel();
    // mask 点击关闭
    const maskClosableFn = () => maskClosable && handleCancel();
    // 阻止冒泡
    const stopPropagationFn = (e) => e.stopPropagation();
    // 点击确定
    const handleOK = () => onOK && onOK();
    useEffect(() => {
        setTarget(document.getElementById('modal-root') as any);
    }, []);
    useEffect(() => {
        visible ? fixedScroll() : resetScroll();
    }, [visible]);

    return visible? <div className={`${prefixCls}`}>
        <div className={`${prefixCls}-mask`} />
        <div className={`${prefixCls}-warp ${wrapClassName}`} onClick={maskClosableFn}>
            <div className={`${prefixCls}-content`} style={style} onClick={stopPropagationFn}>
                <div className={`${prefixCls}-header`}>
                    {
                        title &&(<div className={`${prefixCls}-title`}>{title}</div>)
                    }
                    {   closable && (
                        <div className={`${prefixCls}-close-wrapper`} onClick={handleCancel}>
                            <Icon color="rgba(94, 108, 132, 0.49)" name="a-Crosssign" />
                        </div>)
                    }
                </div>

                <div className={`${prefixCls}-body`}>{children}</div>
                {footer || footer === null ? (
                    footer
                ) : (
                    <div className={`${prefixCls}-footer`}>
                        <Button  onClick={handleCancel}>{cancelText}</Button>
                        <Button backgroundColor="#FF8A8A" primary onClick={handleOK}>
                            {okText}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    </div>:null
}

export default Modal
