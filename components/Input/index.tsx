import React, {useEffect, useState} from 'react';
import Icon from '../Icon';
import {getPrefixCls} from '../_util/responsiveObserve';

interface InputProps {
    label?: string;
    placeholder?: any;
    prefix?: React.ReactNode | string; // 前置图标
    suffix?: React.ReactNode | string; // 后置图标
    groupAddon?: React.ReactNode | string;// 操作的按钮（例：复制）
    passwordIcon?: boolean;// 密码的眼睛图标
    type?: string;
    id?: string;
    name?: string;
    value?: string;
    size?: string;
    onAddon?: any; //右侧操作按钮 点击事件（例：复制）
    onChange?: any;
    onBlur?: any;
    onFocus?: any;
    className?: string;
    error?: boolean;
    errorText?: string;
    readonly?: boolean;
    allowClear?: boolean;
    maxLength?: number;
    fixed?: number;
    onlyPpositive?: boolean;
    ref?: any;
}

/**
 * Primary UI component for user interaction
 */
export const Input: React.FC<InputProps> = ({
                                                label = '',
                                                placeholder = '',
                                                prefix,
                                                suffix,
                                                passwordIcon,
                                                groupAddon,
                                                type = 'text',
                                                name = '',
                                                value = '',
                                                size = '',
                                                error = false,
                                                onAddon,
                                                onChange,
                                                onBlur,
                                                onFocus,
                                                className = '',
                                                errorText = '',
                                                readonly = false,
                                                allowClear = false,
                                                maxLength,
                                                fixed,
                                                onlyPpositive,
                                                id = '',
                                                ref = null,
                                                ...props
                                            }: InputProps) => {
    const prefixClsInput = getPrefixCls('input');
    const prefixClsTextarea = getPrefixCls('textarea');
    const [val, setVal] = useState(value || '');
    const [typeTemp, setTypeTemp] = useState(type);
    const numberReg = /^[0-9]+\.?[0-9]*/;
    const setValueHandle = (value: any) => {
        let val = value.toString();
        // if (value === '') return setVal(val);
        if (type === 'number') {
            const valAry = val.match(numberReg);
            val = valAry ? valAry[0] : 0;
            if (maxLength) {
                val = val.length > maxLength ? val.slice(0, maxLength) : val;
            }
            if (fixed) {
                if (val.split('.')[1] && val.split('.')[1].length > fixed) {
                    val = Math.floor(val * 100) / 100;
                }
            }
            if (onlyPpositive) {
                val = Number(val) < 0 ? 0 : val;
            }
        }
        setVal(val);
        onChange && onChange(val);
    };
    const handleClear = () => {
        setValueHandle('')
    }
    useEffect(() => {
        setVal(value);
        // setValueHandle(value);
    }, [value]);
    useEffect(() => {
        setTypeTemp(type);
    }, [type]);
    return (
        <div className={`${prefixClsInput}-body ${className}`}>
            {
                label && (
                    <div className={`${prefixClsInput}-label` + (label != '' ? '' : ' is-hide')}>{label + ' :'}</div>
                )
            }
            {
                type === 'textarea' ? (
                    <div
                        className={`${prefixClsTextarea}` + ` ${size}` + (error ? ' error' : '') + (readonly ? ' readonly' : '')}>
                         <textarea
                             className={`${prefixClsTextarea}-affix-wrapper`}
                             ref={ref}
                             placeholder={placeholder}
                             id={id}
                             name={name}
                             readOnly={readonly}
                             value={val}
                             maxLength={maxLength}
                             onFocus={() => {
                                 if (onFocus) {
                                     onFocus();
                                 }
                             }}
                             onBlur={(e) => {
                                 if (onBlur) {
                                     onBlur(e.target.value);
                                 }
                             }}
                             onChange={(e) => {
                                 setValueHandle(e.target.value);
                             }}
                         />
                    </div>
                ) : (
                    <div
                        className={`${prefixClsInput}` + ` ${size}` + (error ? ' error' : '') + (readonly ? ' readonly' : '')}>
                        <div className={`${prefixClsInput}-wrapper` + (groupAddon ? ` ${prefixClsInput}-group` : '')}>
                            <div className={`${prefixClsInput}-affix-wrapper`}>
                                {
                                    prefix && <Icon className={`${prefixClsInput}-prefix`} name={prefix}/>
                                }
                                <input
                                    ref={ref}
                                    placeholder={placeholder}
                                    type={typeTemp === 'number' ? 'text' : typeTemp}
                                    id={id}
                                    name={name}
                                    readOnly={readonly}
                                    value={val}
                                    maxLength={maxLength}
                                    onFocus={() => {
                                        if (onFocus) {
                                            onFocus();
                                        }
                                    }}
                                    onBlur={(e) => {
                                        if (onBlur) {
                                            onBlur(e.target.value);
                                        }
                                    }}
                                    onChange={(e) => {
                                        setValueHandle(e.target.value);
                                    }}
                                />
                                {
                                    !passwordIcon && suffix && (
                                        <Icon className={`${prefixClsInput}-suffix`} name={suffix}/>
                                    )
                                }
                                {/*清除图标*/}
                                {
                                    val && allowClear && (
                                        <Icon className={[`${prefixClsInput}-clear`,passwordIcon?`${prefixClsInput}-clear-space`:''].join(' ')} onClick={handleClear}
                                              name="guanbi1"/>
                                    )
                                }
                                {
                                    passwordIcon && (
                                        <span>
                                            {
                                                typeTemp === 'password' && (
                                                    <Icon
                                                        onClick={() => {
                                                            setTypeTemp('text')
                                                        }}
                                                        className={`${prefixClsInput}-suffix`} name="zhengyan"/>)
                                            }
                                            {
                                                typeTemp !== 'password' && (<Icon
                                                    onClick={() => {
                                                        setTypeTemp('password')
                                                    }}
                                                    className={`${prefixClsInput}-suffix`}
                                                    name="biyan"/>)
                                            }
                                        </span>
                                    )
                                }
                            </div>
                            {/*操作按钮 例如:复制*/}
                            {
                                groupAddon && (
                                    <div onClick={onAddon} className={`${prefixClsInput}-group-addon`}>
                                        <Icon name={groupAddon}/>
                                    </div>
                                )
                            }

                        </div>
                    </div>
                )
            }
            <div className={'error-text' + (errorText != '' ? '' : ' is-hide')}>{errorText}</div>
        </div>
    );
};

export default Input;