import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Button from '../Button';
import { fixedScroll, resetScroll } from '../_util/scrollControl';
import './style/index.scss';

interface ModalProps {
  visible: Boolean;
  wrapClassName?: string;
  width?: number;
  title?: string;
  cancelText?: string;
  okText?: string;
  children?: any;
  onCancel?: any;
  onOK?: any;
  closable?: boolean;
  footer?: any;
  maskClosable?: boolean;
}

interface ModalComponentProps extends React.FC<ModalProps> {
  confirm: typeof confirm;
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
  const getModalDOM = () => {
    return (
        <div className="py-modal">
          <div className="py-modal-mask" />
          <div className={`py-modal-warp ${wrapClassName}`} onClick={maskClosableFn}>
            <div className="py-modal-content" style={style} onClick={stopPropagationFn}>
              {title && (
                  <div className="py-modal-header">
                    <div className="py-modal-title">{title}</div>
                  </div>
              )}
              {closable && (
                  <div className="close-wrapper" onClick={handleCancel}>
                    关闭按钮
                  </div>
              )}
              <div className="py-modal-body">{children}</div>
              {footer || footer === null ? (
                  footer
              ) : (
                  <div className="py-modal-footer">
                    <Button onClick={handleCancel}>{cancelText}</Button>
                    <Button color="primary" onClick={handleOK}>
                      {okText}
                    </Button>
                  </div>
              )}
            </div>
          </div>
        </div>
    );
  };
  return visible && typeof window !== 'undefined' && target
      ? ReactDOM.createPortal(getModalDOM(), document.getElementById('modal-root'))
      : null;
};

interface ModalConfirmProps {
  title?: string;
  content?: any;
  cancelText?: string;
  okText?: string;
  onCancel?: any;
  onOK?: any;
  footer?: any;
  closable?: boolean;
  width?: any;
  wrapClassName?: string;
}

const confirm = (props: ModalConfirmProps) => {
  const { content, onCancel, onOK, ...restProps } = props;
  let div = document.createElement('div');
  document.body.appendChild(div);
  // 关闭
  const destroy = () => {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  };
  const handleCancel = () => {
    onCancel && onCancel();
    destroy();
  };
  const handleOk = () => {
    onOK && onOK();
    destroy();
  };
  let currentConfig = Object.assign(
      {
        visible: true,
        children: content,
        onCancel: handleCancel,
        onOK: handleOk
      },
      restProps
  );
  const render = (config) => {
    ReactDOM.render(<Modal {...config} />, div);
  };
  render(currentConfig);
  return {
    destroy: destroy
  };
};

/*
 *
 *  const modal = Modal.confirm({
 *    title: '123',
 *    content: '123123123',
 *    onCancel(){
 *      console.log(1)
 *    },
 *    onOK(){
 *      console.log(2)
 *    }
 *  })
 *
 *  关闭
 *  modal.destroy()
 */
Modal.confirm = confirm;
export default Modal;
