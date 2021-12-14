import React, { useEffect, useState } from 'react';
import Icon from '../Icon';
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
    onChangeType?: any; //修改输入框类型
    onChange?: any;
    onBlur?: any;
    onFocus?: any;
    className?: string;
    error?: boolean;
    errorText?: string;
    readonly?: boolean;
    maxLength?: number;
    fixed?: number;
    onlyPpositive?: boolean;
    ref?: any;
}

/**
 * Primary UI component for user interaction
 */
export const Input = ({
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
                          onChangeType,
                          onChange,
                          onBlur,
                          onFocus,
                          className = '',
                          errorText = '',
                          readonly = false,
                          maxLength,
                          fixed,
                          onlyPpositive,
                          id = '',
                          ref = null,
                          ...props
                      }: InputProps) => {
    const [val, setVal] = useState(value || '');
    const numberReg = /^[0-9]+\.?[0-9]*/;
    const setValueHandle = (value:any) => {
        let val = value.toString();
        if (value === '') return setVal(val);
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
    useEffect(() => {
        setValueHandle(value);
    }, [value]);
    return (
        <div className={`py-input-body ${className}`}>
            <div className={'py-input-label' + (label != '' ? '' : ' is-hide')}>{label + ' :'}</div>
            <div className={'py-input' + ` ${size}` + (error ? ' error' : '')  + (readonly ? ' readonly' : '')}>
                {
                    type==='textarea'?(
                            <textarea
                                className="py-textarea-affix-wrapper"
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
                    ):(
                        <div className={'py-input-wrapper' + (groupAddon ? ' py-input-group' : '')}>
                            <div className="py-input-affix-wrapper">
                                {
                                    prefix && <Icon className="py-input-prefix" name={prefix} />
                                }
                                <input
                                    ref={ref}
                                    placeholder={placeholder}
                                    type={type === 'number' ? 'text' : type}
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
                                    !passwordIcon&&suffix&&(
                                        <Icon className="py-input-suffix" name={suffix} />
                                    )
                                }
                                {
                                    type==='password'&&passwordIcon&&(
                                        <span>
                                            {
                                                type==='password'&&(
                                                    <Icon
                                                    onClick={() => {
                                                        if (onChangeType) {
                                                            onChangeType('zhengyan');
                                                        }
                                                    }}
                                                    className="py-input-suffix" name="zhengyan" />)
                                            }
                                            {
                                                type!=='password'&&(<Icon
                                                    onClick={() => {
                                                        if (onChangeType) {
                                                            onChangeType('biyan');
                                                        }
                                                    }}
                                                    className="py-input-suffix"
                                                    name="biyan" />)
                                            }
                                        </span>
                                    )
                                }
                            </div>
                            {/*操作按钮 例如:复制*/}
                            {
                                groupAddon&&(
                                    <div onClick={onAddon} className="py-input-group-addon">
                                        <Icon name={groupAddon} />
                                    </div>
                                )
                            }

                        </div>
                    )
                }

            </div>
            <div className={'error-text' + (errorText != '' ? '' : ' is-hide')}>{errorText}</div>
        </div>
    );
};
