import React, { useState, useEffect, useRef } from 'react';
import './index.scss';

const numberReg = /^[0-9]+\.?[0-9]*/;
interface InputProps {
  placeholder?: string;
  value?: any;
  maxLength?: number;
  type?: string;
  fixed?: number;
  onlyPpositive?: boolean;
  onChange?: any;
  className?: any;
  name?: any;
  id?: any;
  onBlur?: any;
  onFocus?: any;
}

const Input: React.FC<InputProps> = ({
  placeholder = '',
  value = '',
  maxLength,
  type = 'text',
  fixed,
  onlyPpositive,
  onChange,
  className,
  name,
  id,
  onBlur,
  onFocus
}) => {
  const [val, setVal] = useState(value);
  const [pc_shrink, set_pc_shrink] = useState(false);
  const inputRef = useRef<any>(null);
  const inputChange = (e) => {
    const c_v = e.target.value;
    let val = c_v.toString();
    // if(c_v === '') return setVal(val);
    if (type === 'number') {
      // if (val !== '') {
      //   const valAry = val.match(numberReg);
      //   val = valAry ? valAry[0] : 0;
      // }
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
  const clickFocus = () => {
    inputRef.current.focus();
  };
  const inputFocus = () => {
    set_pc_shrink(true);
    onFocus && onFocus();
  };

  const inputBlur = () => {
    if (val) {
      set_pc_shrink(true);
    } else {
      set_pc_shrink(false);
    }
    onBlur && onBlur();
  };

  useEffect(() => {
    setVal(value);
    // inputBlur()
    if (value) {
      set_pc_shrink(true);
    }
  }, [value]);
  return (
    <div className={`fpp-new-input-wrapper ${className ? className : ''}`}>
      <span className={`from-placeholder ${pc_shrink ? 'pc_shrink' : ''}`} onClick={clickFocus}>
        {placeholder}
      </span>
      <input
        ref={inputRef}
        id={id}
        placeholder=""
        className="fpp-new-input"
        name={name}
        value={val}
        onChange={inputChange}
        onFocus={inputFocus}
        onBlur={inputBlur}
      />
    </div>
  );
};

export default Input;
