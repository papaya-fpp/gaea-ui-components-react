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
import Button from "../Button/index";
import { getPrefixCls } from '../_util/responsiveObserve';

interface SaveButtonBarProps {
  handleCancel?:() => void;
  handleSave?:() => void;
  isShow?: boolean;
  loading?: boolean;
  cancelText?: String;
  saveText?: String;
}
export const SaveButtonBar: React.FC<SaveButtonBarProps> = props => {
  const {
    handleCancel,
    handleSave,
    isShow = true,
    loading = false,
    cancelText = '取消',
    saveText = '确定',
  } = props;
  const prefixCls = getPrefixCls('save-button-bar');

  return (
      <>
        {
          isShow&&(
              <div className={prefixCls}>
                <div className={`${prefixCls}-button`}>
                  <Button
                      onClick={handleCancel}
                  >
                    {cancelText}
                  </Button>
                  <Button
                      className="margin-left-20"
                      loading={loading}
                      primary
                      onClick={handleSave}
                  >
                    {saveText}
                  </Button>
                </div>
              </div>
          )
        }
      </>
  );
};

export default SaveButtonBar;
