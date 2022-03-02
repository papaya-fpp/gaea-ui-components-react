/**
 * @name 页面保存按钮
 * @param isShow    保存bar是否显示
 * @param handleSave  保存按钮回调
 * @param handleCancel 取消按钮回调
 * @param loading 保存按钮的loading效果
 * @param cancelText 取消按钮文案
 * @param saveText 保存按钮文案
 */

import React,{useState,useEffect} from "react";
import { getPrefixCls } from '../_util/responsiveObserve';
import Icon from '../Icon';

interface AlertProps {
  icon: React.ReactNode;
  title: string | React.ReactNode;
  content: string | React.ReactNode;
  border: Boolean;
  visible: Boolean;
  type?: string;// info success warning err
}
export const Alert: React.FC<AlertProps> = props => {
  const {
    icon,
    title,
    content,
    border = true,
    visible = true,
    type = 'info',
  } = props;
  const prefixCls = getPrefixCls('alert');
  const [isShow, setIsShow] = useState(visible);
  useEffect(() => {
    setIsShow(visible);
  }, [visible]);

  return (
      <>
        {isShow && (
            <div className={`${prefixCls}`}>
              {
                border? (
                    <div className={`${prefixCls}-section ${prefixCls}-boder ${prefixCls}-${type}`}>
                      <div className={`${prefixCls}-icon`}>
                        {
                          icon?icon: (
                              <div>
                                {
                                  type==='info'&&(
                                      <Icon size={24} name="tishi-lanse"/>
                                  )
                                }
                                {
                                  type==='success'&&(
                                      <Icon size={24} name="tishi-lvse"/>
                                  )
                                }
                                {
                                  type==='warning'&&(
                                      <Icon size={24} name="tishi-huangse"/>
                                  )
                                }
                                {
                                  type==='err'&&(
                                      <Icon size={24} name="tishi-hongse"/>
                                  )
                                }
                              </div>
                          )
                        }
                      </div>
                      <div>
                        {
                          title&&(
                              <div className={`${prefixCls}-title`}>{title}</div>
                          )
                        }
                        {
                          content&&(
                              <div className={`${prefixCls}-content`}>{content}</div>
                          )
                        }
                      </div>
                    </div>
                ):(
                    <div className={`${prefixCls}-section ${prefixCls}-no-boder ${prefixCls}-${type}`}>
                      <div className={`${prefixCls}-icon`}>
                        {
                          icon?icon: (
                              <div>
                                {
                                  type==='info'&&(
                                      <Icon size={20} name="tishi-lanse"/>
                                  )
                                }
                                {
                                  type==='success'&&(
                                      <Icon size={20} name="tishi-lvse"/>
                                  )
                                }
                                {
                                  type==='warning'&&(
                                      <Icon size={20} name="tishi-huangse"/>
                                  )
                                }
                                {
                                  type==='err'&&(
                                      <Icon size={20} name="tishi-hongse"/>
                                  )
                                }
                              </div>
                          )
                        }
                      </div>
                      <div>
                        {
                          title&&(
                              <div className={`${prefixCls}-title`}>{title}</div>
                          )
                        }
                        {
                          content&&(
                              <div className={`${prefixCls}-content`}>{content}</div>
                          )
                        }
                      </div>
                    </div>
                )
              }
            </div>

        )}
      </>
  );
};

export default Alert;
