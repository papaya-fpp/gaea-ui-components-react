import React, {useEffect, useState,useRef} from 'react';
import Icon from '../Icon';
import {getPrefixCls} from '../_util/responsiveObserve';

interface InputProps {
    label?: string;
    placeholder?: any;
    prefix?: React.ReactNode | string; // 前置图标
    suffix?: React.ReactNode | string; // 后置图标
    groupAddon?: React.ReactNode | string;// 操作的按钮（例：复制）
    verificationCode?: boolean;// 是否有验证码
    verificationCodeLoading?: boolean;// 验证码(接口请求中 触发 loading)
    verificationCodeTrgger?: boolean;// 是否触发倒计时(一般接口请求成功之后再触发)
    verificationCodeTime?: Number | string;// 验证码倒计时时间
    verificationCodeText?: React.ReactNode | string;// 验证码文案
    sendVerificationCode?: any;// 点击发送验证码
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
                                                verificationCode,// 验证码
                                                verificationCodeTime = 60,// 验证码倒计时间
                                                verificationCodeText = '发送验证码',// 验证码
                                                sendVerificationCode,// 发送验证码
                                                verificationCodeLoading,// 发送验证码
                                                verificationCodeTrgger,// 发送验证码
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
    const [verificationCodeDisabled, setVerificationCodeDisabled] = useState(false);
    const [verificationCodeTimeTemp, setVerificationCodeTimeTemp] = useState(+verificationCodeTime);
    const [verificationCodeTextTemp, setVerificationCodeTextTemp] = useState(verificationCodeText);
    const timeChangeRef = useRef<any>(null)
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
    const clearIntervalEvent = () => {
        clearInterval(timeChangeRef.current);
    }
    const setIntervalEvent = () => {
        timeChangeRef.current = setInterval(() => {
            setVerificationCodeTimeTemp((t:number) => --t)
        }, 1000);
    }
    const handleClickVerificationCode = () => {
        sendVerificationCode()
    }
    useEffect(()=>{
        // 注意，不要使用 setTime(t-1) ： 闭包问题会导致time一直为59
        if(verificationCodeTrgger){ //当触发接口成功之后,再倒计时,否则一直loading
            setIntervalEvent()
            setVerificationCodeDisabled(true);
        }
    },[verificationCodeTrgger])
    useEffect(() => {
        clearIntervalEvent()
        return () => clearIntervalEvent();
    }, []);
    useEffect(() => {
        setVal(value);
    }, [value]);
    useEffect(() => {
        setTypeTemp(type);
    }, [type]);
    useEffect(() => {
        setVerificationCodeTextTemp(verificationCodeText);
    }, [verificationCodeText]);
    useEffect(() => {
        if ((verificationCodeTimeTemp > 0) && (verificationCodeTimeTemp < +verificationCodeTime)) {
            setVerificationCodeTextTemp(`${verificationCodeTimeTemp}s后重发`);
        } else {
            clearIntervalEvent();
            setVerificationCodeTextTemp(verificationCodeText)
            setVerificationCodeDisabled(false);
            setVerificationCodeTimeTemp(+verificationCodeTime)
        }
    }, [verificationCodeTimeTemp]);
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
                                {/*前缀图标*/}
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
                                <div className={`${prefixClsInput}-all-icon`}>
                                    {/*清除图标*/}
                                    {
                                        val && allowClear && (
                                            <Icon className={[`${prefixClsInput}-clear`,passwordIcon?`${prefixClsInput}-clear-space`:''].join(' ')} onClick={handleClear}
                                                  name="guanbi1"/>
                                        )
                                    }
                                    {/*后缀图标*/}
                                    {
                                        !passwordIcon && suffix && (
                                            <Icon className={`${prefixClsInput}-suffix`} name={suffix}/>
                                        )
                                    }
                                    {/*密码眼睛图标*/}
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
                                    {/*发送验证码*/}
                                    {
                                        verificationCode&&(
                                            <div onClick={()=>{!verificationCodeDisabled && handleClickVerificationCode()}} className={[`${prefixClsInput}-verification-code`,(verificationCodeDisabled || verificationCodeLoading)?`${prefixClsInput}-verification-disabled`:''].join(' ')}>
                                                {
                                                    verificationCodeLoading && <Icon className={[`${prefixClsInput}-loading-icon`].join(' ')} name={"Spinnerjiazai1"} />
                                                }
                                                {verificationCodeTextTemp}
                                            </div>
                                        )
                                    }
                                </div>
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