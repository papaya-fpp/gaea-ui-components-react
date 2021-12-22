import React, { useEffect, useState, useRef } from 'react';
import { createColgroup, createNewList } from './ulils';
interface TableProps {
    columns: Array<any>; //表格列的配置
    dataSource:Array<any>, //数据数组
    rowKey:string, //表格行 key 的取值
    bordered?:boolean, //是否有边框
    width?:Number //宽度配置
}
const TableCollapse = ({ value = 1, showTableCollapse = false, onChange }) => {
  const getSign = () => {
    return value === 1 ? (
        <span className="plus" onClick={() => onChange(0)}>
        +
      </span>
    ) : (
        <span className="minus" onClick={() => onChange(1)}>
        -
      </span>
    );
  };
  return showTableCollapse ? (
      <span className="table-collapse" style={!showTableCollapse ? { border: 'none', cursor: 'auto' } : {}}>
      {showTableCollapse && getSign()}
    </span>
  ) : null;
};

const TableComp = (props) => {
  const { columns, dataSource, rowKey, bordered = false, width }:TableProps = props;
  const [tableList, setTableList] = useState([]);
  const tableRef = useRef(null);
  const getRowKey = React.useMemo(() => {
    if (typeof rowKey === 'function') {
      return rowKey;
    }
    return (record) => record[rowKey];
  }, [rowKey]);

  // 点击
  const hangeHandle = (data, status) => {
    setTableList((prevTableList) => {
      const diffId = getRowKey(data);
      return prevTableList.map((item) => {
        if (diffId === getRowKey(item)) {
          item.collapseValue = status;
        }
        if (item.parentId && diffId === item.parentId) {
          item.show = status ? false : true;
        }
        return item;
      });
    });
  };

  // 创建 thead
  const createTHead = () => {
    return (
        <thead>
        <tr>
          {columns.map((item) => {
            return <th key={item.key || item.dataIndex}>{item.title}</th>;
          })}
        </tr>
        </thead>
    );
  };
  // 创建 行
  const createRow = () => {
    if (tableList.length < 1) return empytStatus();
    return (
        <>
          {tableList.map((item) => {
            let style = {};
            if (item.level > 0) {
              style = item.show ? { background: '#fafafa' } : { display: 'none' };
            }
            if (item.description) {
              return (
                  <tr key={item.key} style={style} className={`table-row-level-${item.level}`}>
                    <td colSpan={columns.length}>{item.description}</td>
                  </tr>
              );
            }
            return (
                <tr key={getRowKey(item)} style={style} className={`table-row-level-${item.level}`}>
                  {createCol(item)}
                </tr>
            );
          })}
        </>
    );
  };

  // 创建 列
  const createCol = React.useCallback(
      (obj) => {
        return (
            <>
              {columns.map((item, index) => {
                const key = item.dataIndex || item.key;
                let content = obj[key];
                let classes = `table-cell table-cell-level-${obj.level}`;
                let _rowKey = getRowKey(obj);
                if (item.render) {
                  content = item.render(obj[key], obj);
                }
                return (
                    <td key={key} data-key={key} data-rowkey={_rowKey} className={classes}>
                      {index === 0 && (
                          <TableCollapse
                              showTableCollapse={obj.isCollapse}
                              value={obj.collapseValue}
                              onChange={(status) => hangeHandle(obj, status)}
                          />
                      )}
                      {content}
                    </td>
                );
              })}
            </>
        );
      },
      [columns, getRowKey]
  );

  // 空状态

  const empytStatus = () => {
    return (
        <tr>
          <td colSpan={columns.length}>
            <div className="kong_wrapper">
              空
            </div>
          </td>
        </tr>
    );
  };

  useEffect(() => {
    const list = createNewList(dataSource, getRowKey);
    setTableList(list);
  }, [dataSource]);

  let table_styles: any = { border: bordered ? '1px solid #f6f6f6' : 'none' };
  if (width) {
    table_styles.width = width + 'px';
  }

  return (
      <div className="table-wrapper">
        <table className="self-table" ref={tableRef} style={table_styles}>
          {createColgroup(columns)}
          {createTHead()}
          <tbody>{createRow()}</tbody>
        </table>
      </div>
  );
};

export default TableComp;
