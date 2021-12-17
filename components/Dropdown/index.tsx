
import React from 'react';
import classNames from 'classnames';
import { getPrefixCls } from '../_util/responsiveObserve';
import Icon from '../Icon';

type ItemProps = {
  key: string | number,
  label: string
}

interface DropdownProps {
  arrow?: boolean;
  disabled?: boolean;
  trigger?: 'click' | 'hover';
  visible?: boolean;
  list?: Array<ItemProps>;
  title?: string;
  placement?: ('bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight');
  onChange?: (item: ItemProps) => void;
}

const Dropdown: React.FC<DropdownProps> = (props) => {
  const {
    arrow = true,
    disabled,
    trigger = 'click',
    visible,
    list = [],
    title,
    children,
    onChange,
    placement = 'bottomLeft',
  } = props;

  const totalHeight = list.length * 36 + 16;
  let titleHeight = 0;
  let hiddenTimer: any = null;
  const [ listStyle, setListStyle ] = React.useState({})
  const [ hidden, setHidden ] = React.useState(true);
  const setListHidden = (status: boolean) => {
    if (disabled) return;
    if (visible === undefined) {
      setHiddenHandle(status)
    }
  }

  const setHiddenHandle = (status: boolean) => {
    if (status) {
      if (listRef.current) {
        listRef.current.style.height = 0 + 'px';
      }
      clearTimeout(hiddenTimer);
      hiddenTimer = setTimeout(() => {
        setHidden(true)
        clearTimeout(hiddenTimer)
      }, 300)
      
    } else {
      setHidden(false)
    }
  }

  const titleRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);

  const prefixCls = getPrefixCls('dropdown');

  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-disabled`]: disabled
    }
  );

  const listClasses = classNames(
    `${prefixCls}-list`,
    {
      [`${prefixCls}-list-hidden`]: hidden
    }
  )

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  const clickHandle = () => {
    if (trigger === 'click') {
      setListHidden(!hidden)
    }
  }

  const mouseOverHandle = () => {
    if (trigger === 'hover') {
      setListHidden(false)
    }
  }

  const mouseOutHandle = () => {
    if (trigger === 'hover') {
      setListHidden(true)
    }
  }

  const renderItem = () => {
    return (
      list.map((item: ItemProps) => {
      return <li
        className={`${prefixCls}-list-item`}
        key={item.key}
        onClick={() => {
          setHidden(true)
          onChange && onChange(item)
        }}
      >
        {item.label}</li>
      })
    )
  }

  React.useEffect(()=>{
    if (listRef.current && !hidden) {
      listRef.current.style.height = totalHeight + 'px';
    }
  }, [hidden])
  
  React.useEffect(()=>{
    visible !== undefined && !disabled && setHiddenHandle(visible)
  },[visible])
  
  const documentClickHidden = () => setListHidden(true);

  React.useEffect(() => {
    if (titleRef.current) {
      titleHeight = titleRef.current.offsetHeight;
      const topH = titleHeight + 6;
      let listPos = {}
      switch (placement) {
        case 'bottomLeft':
          listPos = { top: topH, left: 0};
          break;
        case 'bottomRight':
          listPos = { top: topH, right: 0};
          break;
        case 'topLeft':
          listPos = { bottom: topH, left: 0};
          break;
        case 'topRight':
          listPos = { bottom: topH, right: 0};
          break;
        default:
          listPos = { top: topH, left: 0};
          break;
      }
      setListStyle(listPos)
    }

    document.addEventListener('click', documentClickHidden, false);

    return () => {
      document.removeEventListener('click', documentClickHidden);
    }
  },[])

  return (
    <div
      className={classes}
      onClick={stopPropagation}
      onMouseOver={mouseOverHandle}
      onMouseOut={mouseOutHandle}
    >
      <div className={`${prefixCls}-title`} ref={titleRef} onClick={clickHandle}>
        {children ? children : <span>{title}</span>}
        {arrow && <Icon className="drop-down" name="Drop-down" />}
      </div>
      <ul className={listClasses} style={listStyle} ref={listRef}>
        {renderItem()}
      </ul>
    </div>
  )
};

export default Dropdown
