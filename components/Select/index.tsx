import React, {useState, useEffect, useRef} from 'react';
import Option from './Option';
import Icon from '../Icon';
import { getPrefixCls } from '../_util/responsiveObserve';

const defaultFilter = (inputValue: any, option: any) => {
    return option.value.indexOf(inputValue) > -1;
};

interface SelectProps {
    label?: string;
    placeholder?: string;
    value?: any;
    onChange?: any;
    allowClear?: boolean;
    showSearch?: any;
    className?: any;
    filterOption?: any;
    onBlur?: any;
    onFocus?: any;
    disabled?: boolean;
}

interface SelectPropsComponents extends React.FC<SelectProps> {
    Option: typeof Option;
}

const Select: SelectPropsComponents = ({
                                           label,
                                           placeholder = '',
                                           value,
                                           onChange,
                                           allowClear = false,
                                           showSearch,
                                           className,
                                           filterOption = defaultFilter,
                                           onBlur,
                                           onFocus,
                                           children,
                                           disabled = false,
                                       }) => {
    const prefixCls = getPrefixCls('select');
    const [val, setVal] = useState(value);
    const [pc_shrink, set_pc_shrink_] = useState(false);
    const [listChildren, setListChildren] = useState([]);
    const [filterList, setFilterList] = useState([]);
    const [showList, setShowList] = useState(false);
    const [childText, setChildText] = useState('');
    const [inputval, setInputval] = useState('');
    const inputRef = useRef<any>(null);

    const inputChange = (e: any) => {
        if (!showSearch) {
            return;
        }
        const val = e.target.value;
        setInputval(val);
        const list = listChildren.filter((item) => filterOption(val, item));
        setFilterList(list);
    };
    const clickFocus = (e:any) => {
        inputRef.current.focus();
    };
    const inputFocus = (e: any) => {
        e.stopPropagation();
        setInputval('');
        set_pc_shrink_(true);
        setShowList(true);
        onFocus && onFocus();
    };

    const inputBlur = () => {
        set_pc_shrink_(false);
        setInputval('');
        onBlur && onBlur();
        setShowList(false);
        setFilterList(listChildren);
    };
    //阻止浏览器默认事件
    const handlePreventDefault = (e:any)=>{
        e.preventDefault()
    }
    const handleOpen = () => {
        setShowList(true);
        inputRef.current.focus();
    }
    const handleClose = (e:any) => {
        setShowList(false);
        inputRef.current.blur();
    }
    const changeItem = (val: any, text: any) => {
        setVal(val);
        setInputval(text);
        setChildText(text);
        setShowList(false);
        onChange && onChange(val);
        setFilterList(listChildren);
    };

    const getListNode = () => {
        if (!showList) {
            return null;
        }
        return (
            <div className={`${prefixCls}-option_content`}>
                <div className={`${prefixCls}-option_list`}>
                    {filterList.length > 0 ? (
                        filterList.map((item: any) => {
                            return <Option key={item.key || item.value} {...item} active={val} onChange={changeItem}/>;
                        })
                    ) : (
                        <div onClick={(e)=>{e.stopPropagation()}} className={`${prefixCls}-kong_wrapper`}>
                            <Icon name="kongzhuangtai"/>
                        </div>
                    )}
                </div>
            </div>
        );
    };


     const handleClear = () => {
         set_pc_shrink_(false);
         setInputval('');
         setChildText('')
         setVal('')
         onChange && onChange('');
     }
    useEffect(() => {
        const list = (children as any).map((child: any) => ({...child.props}));
        setListChildren(list);
        setFilterList(list);
    }, [children]);
    useEffect(() => {
        setVal(value); // todo 打开之后有bug,form表单默认有值的情况下 清除剩最后一个字符的时候 再点击删除 会将初始值重新赋值过来
    }, [value]);
    useEffect(() => {
        if (val) {
            const child: any = filterList.filter((item: any) => item.value === val)[0];
            if (child) {
                setChildText(child.children);
            }
        } else {
            setChildText('');
        }
    }, [val,filterList]);

    return (
        <div className={`${prefixCls}-container`}>
            {
                label && (
                    <div className={`${prefixCls}-label` + (label != '' ? '' : ` ${prefixCls}-is-hide`)}>{label + ' :'}</div>
                )
            }
            <div className={`${prefixCls}-wrapper ${!filterOption ? `${prefixCls}-cursorPointer` : ''} ${className ? className : ''} ${disabled ? ' disabled' : ''}`}>
                <span
                    className={`${prefixCls}-form-placeholder ${ val ? `${prefixCls}-pc_shrink` : ''}` + (inputval ? ` ${prefixCls}-hide_placeholder` : '')}
                    onMouseDown={handlePreventDefault}
                    onClick={handleOpen}
                >
                    {placeholder}
                </span>
                <span
                    onMouseDown={handlePreventDefault}
                    onClick={handleOpen}
                    className={`${prefixCls}-active_text ${pc_shrink ? 'shade' : ''}` + (inputval ? ` ${prefixCls}-hide_placeholder` : '')}>
                    {childText}
                </span>
                <input
                    disabled={disabled}
                    ref={inputRef}
                    className={`${prefixCls}-input ${!showSearch ? 'nosearch' : ''}`}
                    value={inputval}
                    onChange={inputChange}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                />
                {/*清除图标*/}
                {
                    childText&&allowClear&&!disabled&&(
                        <div className={`${prefixCls}-clear`} onClick={handleClear}>
                            <Icon name="guanbi1"/>
                        </div>
                    )
                }

                {/*右侧箭头*/}
                {/*onMouseDown={handlePreventDefault} 是为了阻止浏览器默认事件（因为点击handleClose关闭下拉的时候 会先触发onblur 事件，导致下拉框抖动关不掉）*/}
                <div className={`${prefixCls}-jiantou`} onMouseDown={handlePreventDefault} >
                    {
                        showList ? (
                            <div className={`${prefixCls}-jiantou-icon`}>
                                <Icon  onClick={handleClose} name="Retract"/>
                            </div>
                        ) : (
                            <div className={`${prefixCls}-jiantou-icon`}>
                                <Icon  onClick={handleOpen} name="Drop-down"/>
                            </div>
                        )
                    }
                </div>
            </div>
            {getListNode()}
        </div>
    );
};
Select.Option = Option;
export default Select;
