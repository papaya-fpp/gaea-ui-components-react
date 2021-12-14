import React from 'react';
import Icon from '../Icon';
interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
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
  label: string;

  children: string | React.ReactNode;
  /**
   * icon 图标
   */
  icon: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
const Button = ({
  primary = false,
  disabled = false,
  size = 'medium',
  backgroundColor,
  label,
  children,
  icon,
  ...props
}: ButtonProps) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  const disabledState = disabled ? 'storybook-button--disabled' : '';
  return (
    <button
      type="button"
      className={['storybook-button', `storybook-button--${size}`, mode,disabledState].join(' ')}
      style={{ backgroundColor }}
      {...props}
    >
      <div className={['storybook-button-text'].join(' ')}>
        {
            icon && <Icon className={['storybook-button--icon'].join(' ')} name={icon} />
        }
        {
          !children&&label&&(
              <div className={['storybook-button--label'].join(' ')}>{label}</div>
          )
        }
        {
          children&&(
              <div className={['storybook-button--label'].join(' ')}>{children}</div>
          )
        }
      </div>
    </button>
  );
};

export default Button