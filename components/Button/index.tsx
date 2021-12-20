import React from 'react';
import Icon from '../Icon';
import { getPrefixCls } from '../_util/responsiveObserve';
interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;

  danger?: boolean;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label?: string;

  children: string | React.ReactNode;
  /**
   * icon 图标
   */
  icon?: string;
  /**
   * loading 图标
   */
  loading?: boolean;
  /**
   * Optional click handler
   */
  onClick?: () => void;

  className?:any;

  style?:any;
}

/**
 * Primary UI component for user interaction
 */
const Button = ({
  primary = false,
  danger = false,
  disabled = false,
  size = 'medium',
  backgroundColor,
  label,
  children,
  icon,
  loading,
  style,
  className,
  ...props
}: ButtonProps) => {
  const prefixCls = getPrefixCls('button');
  const mode = primary ? `${prefixCls}--primary` : `${prefixCls}--secondary`;
  const dangerState = danger ? (primary?`${prefixCls}--danger-primary` : `${prefixCls}--danger-secondary`):'';
  const disabledState = disabled ? `${prefixCls}--disabled` : '';
  return (
    <button
      type="button"
      className={[`${prefixCls}`, `${prefixCls}--${size}`, mode,disabledState,dangerState,className].join(' ')}
      style={{ backgroundColor,...style }}
      {...props}
    >
      <div className={[`${prefixCls}-text`].join(' ')}>
        {
            icon && <Icon className={[`${prefixCls}--icon`].join(' ')} name={icon} />
        }
        {
          loading && <Icon className={[`${prefixCls}--icon`].join(' ')} name={"Bell"} />
        }
        {
          !children&&label&&(
              <div className={[`${prefixCls}--label`].join(' ')}>{label}</div>
          )
        }
        {
          children&&(
              <div className={[`${prefixCls}--label`].join(' ')}>{children}</div>
          )
        }
      </div>
    </button>
  );
};

export default Button