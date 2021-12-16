import React, { useState, useEffect, useRef } from 'react';
import Option from './Option';
// import { IconFont } from '@fppcomponents';
import Icon from '../Icon';
const defaultFilter = (inputValue, option) => {
  return option.value.indexOf(inputValue) > -1;
};
interface SelectProps {
  placeholder?: string;
  value?: any;
  onChange?: any;
  allowClear?: any;
  showSearch?: any;
  className?: any;
  filterOption?: any;
  onBlur?: any;
  onFocus?: any;
}

interface SelectPropsComponents extends React.FC<SelectProps> {
  Option: typeof Option;
}

const Select: SelectPropsComponents = ({
  placeholder = '',
  value,
  onChange,
  allowClear,
  showSearch,
  className,
  filterOption = defaultFilter,
  onBlur,
  onFocus,
  children
}) => {
  const [val, setVal] = useState(value);
  const [pc_shrink, set_pc_shrink_] = useState(false);
  const [listChildren, setListChildren] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [showList, setShowList] = useState(false);
  const [childText, setChildText] = useState('');
  const [inputval, setInputval] = useState('');
  const inputRef = useRef<any>(null);

  const inputChange = (e) => {
    if (!showSearch) {
      return;
    }
    const val = e.target.value;
    setInputval(val);
    const list = listChildren.filter((item) => filterOption(val, item));
    setFilterList(list);
  };

  const inputFocus = (e) => {
    e.stopPropagation();
    setInputval('');
    set_pc_shrink_(true);
    setShowList(true);
    onFocus && onFocus();
  };

  const inputBlur = (e) => {
    set_pc_shrink_(false);
    setInputval('');
    onBlur && onBlur();
    setShowList(false);
    setFilterList(listChildren);
  };

  const changeItem = (val, text) => {
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
      <div className="option_list">
        {filterList.length > 0 ? (
          filterList.map((item) => {
            return <Option key={item.key || item.value} {...item} active={val} onChange={changeItem} />;
          })
        ) : (
          <div className="kong_wrapper">
           空！
          </div>
        )}
      </div>
    );
  };

  const clickFocus = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    const list = (children as any).map((child: any) => ({ ...child.props }));
    setListChildren(list);
    setFilterList(list);
  }, [children]);

  useEffect(() => {
    if (value) {
      const child: any = filterList.filter((item) => item.value === value)[0];
      if (child) {
        setChildText(child.children);
      }
    } else {
      setChildText('');
    }
    setVal(value);
  }, [value]);

  useEffect(() => {
    if (val) {
      const child: any = filterList.filter((item) => item.value === value)[0];
      if (child) {
        setChildText(child.children);
      }
    }
  }, [filterList]);

  return (
      <div className="py-select-container">
        <div className={`py-select-wrapper ${className ? className : ''}`}>
        <span className={`from-placeholder ${pc_shrink || val ? 'pc_shrink' : ''}` + (inputval?' hide_placeholder':'')} onClick={clickFocus}>
          {placeholder}
        </span>
          <span onClick={clickFocus} className={`active_text ${pc_shrink ? 'shade' : ''}` + (inputval?' hide_placeholder':'')}>
          {childText}
        </span>
          <input
              ref={inputRef}
              className={`py-input ${!showSearch ? 'nosearch' : ''}`}
              value={inputval}
              onChange={inputChange}
              onFocus={inputFocus}
              onBlur={inputBlur}
          />
          <div className="jiantou" onClick={clickFocus}>
            {
              showList?(
                  <Icon className="zhankaishouqi" name="Retract" />
              ):(
                  <Icon className="zhankaishouqi" name="Drop-down" />
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