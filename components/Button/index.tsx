import React from 'react';

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
  /**
   * icon 图标
   */
  icon: React.ReactNode;
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
        <div className={['storybook-button--icon'].join(' ')}>{icon}</div>
        {
          label&&(
              <div className={['storybook-button--label'].join(' ')}>{label}</div>
          )
        }
      </div>
    </button>
  );
};

export default Button