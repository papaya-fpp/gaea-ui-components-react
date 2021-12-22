import React, { useState, useEffect } from 'react';
import Select from '../Select'
const { Option } = Select;
interface PaginationProps {
  total: number; //总数
  current?: number; //当前页
  PageSize?: number; // 页数
  showSizeChanger?: boolean; //是否显示分页器
  showTotal?: any; //是否显示分页器
  onChange?: any;
}

const Pagination: React.FC<PaginationProps> = ({ total, current = 1, PageSize = 10, showSizeChanger = false, showTotal, onChange }) => {
  const dotPageNum = 5;
  const [optionList,setOptionList] = useState([
    {
      value:10,
      label:'10页/条',
    },
    {
      value:20,
      label:'20页/条',
    },
    {
      value:50,
      label:'50页/条',
    },
    {
      value:100,
      label:'100页/条',
    },
  ])
  const [pageCount, setPageCount] = useState(Math.ceil(total / PageSize));
  const [showList, setShowList] = useState([]);
  const [comCurrent, setComCurrent] = useState(+current);
  const [defaultPageSize, setDefaultPageSize] = useState(+PageSize);
  useEffect(() => {
    const initPageCount = Math.ceil(total / PageSize);
    setPageCount(initPageCount);
    setDefaultPageSize(PageSize);
  }, [total, PageSize]);


  const createShowList = (curt) => {
    let ary = [];
    if (pageCount <= 7) {
      for (let i = 1; i <= pageCount; i++) {
        ary.push(i);
      }
    } else {
      if (curt <= 4) {
        for (let i = 1; i <= 5; i++) {
          ary.push(i);
        }
        ary.push('next', pageCount);
      } else if (curt >= pageCount - 3) {
        ary.push(1, 'prev');
        for (let i = pageCount - 4; i <= pageCount; i++) {
          ary.push(i);
        }
      } else {
        ary.push(1, 'prev', curt - 1, curt, curt + 1, 'next', pageCount);
      }
    }
    setShowList(ary);
  };
  const handleClick = (type, val) => {
    let pageNUm = 1;
    if (type === 'num') {
      pageNUm = val;
    } else if (type === 'prev') {
      if (comCurrent == 1) {
        return;
      }
      pageNUm = comCurrent - val > 0 ? comCurrent - val : 1;
    } else {
      if (comCurrent == pageCount) {
        return;
      }
      pageNUm = comCurrent + val <= pageCount ? comCurrent + val : pageCount;
    }
    setComCurrent(+pageNUm);
    createShowList(+pageNUm);
    onChange && onChange(+pageNUm);
  };
  const handleChangeSize = (value) => {
    setDefaultPageSize(value)
    setPageCount(Math.ceil(total / value))
  }
  useEffect(() => {
    createShowList(+current);
  }, [current, pageCount]);
  return total > 0 ? (
      <div className="fpp-pagination">
        {
          showTotal&&(
              <div className="fpp-pagination-total">{showTotal}</div>
          )
        }
        <ul className="fpp-pagination-list">
          <li
              className="page-prev-arrow"
              onClick={() => {
                handleClick('prev', 1);
              }}
          >
            <div className="page-prev-arrow-d">
              《
              {/*<Icon name="page-arrow" size={16} />*/}
            </div>
          </li>
          {showList.map((item) => {
            if (item === 'prev') {
              return (
                  <li
                      key={item}
                      className={`fpp-pagination-dot pagination-prev`}
                      onClick={() => {
                        handleClick('prev', dotPageNum);
                      }}
                  >
                    <span className="dot">•••</span>
                    <div className="prev-icon">
                      《
                     {/* <Icon name="page-dbl-arrow" size={14} />*/}
                    </div>
                  </li>
              );
            } else if (item === 'next') {
              return (
                  <li
                      key={item}
                      className={`fpp-pagination-dot pagination-next`}
                      onClick={() => {
                        handleClick('next', dotPageNum);
                      }}
                  >
                    <span className="dot">•••</span>
                    <div className="next-icon">
                      》
                      {/*<Icon name="page-dbl-arrow" size={14} />*/}
                    </div>
                  </li>
              );
            } else {
              return (
                  <li
                      key={item}
                      className={`pageNum ${comCurrent === item ? 'active' : ''}`}
                      onClick={() => {
                        handleClick('num', item);
                      }}
                  >
                    {item}
                  </li>
              );
            }
          })}
          <li
              className="page-next-arrow"
              onClick={() => {
                handleClick('next', 1);
              }}
          >
            <div className="page-next-arrow-d">
              》
              {/*<Icon name="page-arrow" size={16} />*/}
            </div>
          </li>
        </ul>
        {
          showSizeChanger&&(
              <div className="fpp-pagination-options">
                <Select
                    filterOption={false}
                    value={defaultPageSize}
                    onChange={handleChangeSize}
                >
                  {optionList &&
                  optionList.map((item) => (
                      <Option key={item.value} value={item.value}>
                        {item.label}
                      </Option>
                  ))}
                </Select>
              </div>
          )
        }
      </div>
  ) : null;
};

export default Pagination;
