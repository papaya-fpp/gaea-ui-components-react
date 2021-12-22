import React, { useState, ReactNode } from "react";
import { getPrefixCls } from "../_util/responsiveObserve";

interface CardProps {
  title?: string | ReactNode; //标题
  extra?: string | ReactNode; //标题右侧dom
  children?: string | ReactNode; //内容
  footer?: string | ReactNode; //底部
  expandable?: boolean; //是否可展开
}
const Card: React.FC<CardProps> = ({ title, extra, children, footer, expandable }) => {
  const prefixCls = getPrefixCls("card");
  const [fold, setFold] = useState(true);
  const handleFold = () => {
    setFold(!fold);
  };
  return (
      <>
        <div className={prefixCls}>
          {
            (title || extra) && (
                <div className={`${prefixCls}-header`}>
                  <div className={`${prefixCls}-title`}>{title}</div>
                  {extra && <div className={`${prefixCls}-extra`}>{extra}</div>}
                </div>
            )
          }
          <div className={`${prefixCls}-body ${fold && expandable ? `${prefixCls}-fold` : ""}`}>
            {children}
          </div>
          {expandable && (
              <div onClick={handleFold}>
                {fold ? (
                    <div className={`${prefixCls}-fold-btn`}>展开</div>
                ) : (
                    <div className={`${prefixCls}-fold-btn`}>收起</div>
                )}
              </div>
          )}
          {footer && <div className={`${prefixCls}-footer`}>{footer}</div>}
        </div>
      </>
  );
};

export default Card;
