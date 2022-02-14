/**
 * @name 页面保存按钮
 * @param isShow    保存bar是否显示
 * @param handleSave  保存按钮回调
 * @param handleCancel 取消按钮回调
 * @param loading 保存按钮的loading效果
 * @param cancelText 取消按钮文案
 * @param saveText 保存按钮文案
 */
import React from "react";
interface SaveButtonBarProps {
    handleCancel?: () => void;
    handleSave?: () => void;
    isShow?: boolean;
    loading?: boolean;
    cancelText?: String;
    saveText?: String;
}
export declare const SaveButtonBar: React.FC<SaveButtonBarProps>;
export default SaveButtonBar;
