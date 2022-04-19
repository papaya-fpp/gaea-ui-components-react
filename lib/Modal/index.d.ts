import React from "react";
interface ModalProps {
    visible?: Boolean;
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
    loading?: boolean;
    disabled?: boolean;
    maskClosable?: boolean;
    cancelButtonBgColor?: string;
    okButtonBgColor?: string;
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
    loading?: boolean;
    disabled?: boolean;
    width?: any;
    wrapClassName?: string;
    cancelButtonBgColor?: string;
    okButtonBgColor?: string;
}
declare const Modal: ModalComponentProps;
declare const confirm: (props: ModalConfirmProps) => {
    destroy: () => void;
};
export default Modal;
