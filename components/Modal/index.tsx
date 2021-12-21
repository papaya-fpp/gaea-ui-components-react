import React, { useState, useEffect } from "react";
import { fixedScroll, resetScroll } from "../_util/scrollControl";
import Button from "../Button/index";
import ReactDOM from 'react-dom';
import Icon from "../Icon";
import { getPrefixCls } from "../_util/responsiveObserve";
interface ModalProps {
  visible: Boolean;
  wrapClassName?: string;
  width?: number;
  title?: string | React.ReactNode;
  cancelText?: string | React.ReactNode;
  okText?: string | React.ReactNode;
  children?: any;
  onCancel?: () => void;
  onOK?: () => void;
  closable?: boolean;
  footer?: any;
  maskClosable?: boolean;
}

interface ModalComponentProps extends React.FC<ModalProps> {
  confirm: typeof confirm;
}

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

const Modal: ModalComponentProps = ({
  visible,
  wrapClassName = "",
  width,
  title,
  cancelText = "Cancel",
  okText = "OK",
  children,
  onCancel,
  onOK,
  closable = false,
  footer,
  maskClosable = true,
}) => {
  const prefixCls = getPrefixCls("modal");
  const [target, setTarget] = useState(null);
  const [style] = useState(width ? { width: width + "px" } : {});
  // 点击关闭
  const handleCancel = () => onCancel && onCancel();
  // mask 点击关闭
  const maskClosableFn = () => maskClosable && handleCancel();
  // 阻止冒泡
  const stopPropagationFn = (e) => e.stopPropagation();
  // 点击确定
  const handleOK = () => onOK && onOK();
  useEffect(() => {
    setTarget(document.getElementById("fpp-modal-root") as any);
  }, []);
  useEffect(() => {
    visible ? fixedScroll() : resetScroll();
  }, [visible]);
  const getModalDOM = () => {
    return (
        <div className={`${prefixCls}`}>
          <div className={`${prefixCls}-mask`} />
          <div
              className={`${prefixCls}-warp ${wrapClassName}`}
              onClick={maskClosableFn}
          >
            <div
                className={`${prefixCls}-content`}
                style={style}
                onClick={stopPropagationFn}
            >
              <div className={`${prefixCls}-header`}>
                {title && <div className={`${prefixCls}-title`}>{title}</div>}
                {closable && (
                    <div
                        className={`${prefixCls}-close-wrapper`}
                        onClick={handleCancel}
                    >
                      <Icon color="rgba(94, 108, 132, 0.49)" name="a-Crosssign" />
                    </div>
                )}
              </div>

              <div className={`${prefixCls}-body`}>{children}</div>
              {footer || footer === null ? (
                  footer
              ) : (
                  <div className={`${prefixCls}-footer`}>
                    <Button onClick={handleCancel}>{cancelText}</Button>
                    <Button backgroundColor="#FF8A8A" primary onClick={handleOK}>
                      {okText}
                    </Button>
                  </div>
              )}
            </div>
          </div>
        </div>
    );
  };
  const creatdiv = () => {
    //创建一个div
    var div = document.createElement('div');
    div.id = "fpp-modal-root";//设置div的属性
    var bo = document.body; //获取body对象.
    //动态插入到body中
    bo.insertBefore(div, bo.lastChild);
  }

  let modalRoot = document.getElementById('fpp-modal-root')
  if(!modalRoot){
    creatdiv()
  }
  return visible && typeof window !== 'undefined' && target && ReactDOM.createPortal(getModalDOM(),modalRoot);
};
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
Modal.confirm = confirm;
export default Modal;
