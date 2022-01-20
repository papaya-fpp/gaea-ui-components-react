import React from 'react';
import classNames from 'classnames';
import RcSwitch from './RcSwitch';
import devWarning from '../_util/devWarning';
import { getPrefixCls } from '../_util/responsiveObserve';

export type SwitchSize = 'small' | 'default';
export type SwitchChangeEventHandler = (checked: boolean, event: MouseEvent) => void;
export type SwitchClickEventHandler = SwitchChangeEventHandler;

export interface SwitchProps {
    prefixCls?: string;
    size?: SwitchSize;
    className?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: SwitchChangeEventHandler;
    onClick?: SwitchClickEventHandler;
    checkedChildren?: React.ReactNode;
    unCheckedChildren?: React.ReactNode;
    disabled?: boolean;
    loading?: boolean;
    autoFocus?: boolean;
    style?: React.CSSProperties;
    title?: string;
    tabIndex?: number;
}

interface CompoundedComponent extends React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLElement>>{};


const Switch = React.forwardRef<unknown, SwitchProps>(
	(
		{
			prefixCls: customizePrefixCls,
			size: customizeSize,
			loading,
      className = '',
      disabled,
      ...props
		},
		ref
	) => {
	devWarning(
		'checked' in props || !('value' in props),
		'Switch',
		'`value` is not a valid prop, do you mean `checked`?',
	);

	const prefixCls = getPrefixCls('switch');

	const loadingIcon = (
		<div className={`${prefixCls}-handle`}>
			{/* {loading && <LoadingOutlined className={`${prefixCls}-loading-icon`} />} */}
		</div>
	);

	const classes = classNames(
		{
			[`${prefixCls}-small`]: customizeSize === 'small',
			[`${prefixCls}-loading`]: loading,
		},
		className,
	);

	return (
		<RcSwitch
			{...props}
			prefixCls={prefixCls}
			className={classes}
			disabled={disabled || loading}
			ref={ref as any}
			loadingIcon={loadingIcon}
		/>
	)
}) as CompoundedComponent;

Switch.displayName = 'Switch';
export default React.memo(Switch);
