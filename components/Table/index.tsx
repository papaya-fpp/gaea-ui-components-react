import React, {useEffect, useState, useRef} from 'react';
import {createColgroup, createNewList} from './ulils';
import Icon from '../Icon';
import {getPrefixCls} from '../_util/responsiveObserve';
import Pagination from '../Pagination'
const prefixCls = getPrefixCls('table');
 interface paginationProps {
     total?: number, //分页器总数
     current?: number, //分页器-当前页
     PageSize?: number, //分页器-每页页数
     showTotal?: any, //是否展示分页器总数
     showSizeChanger?: boolean, //是否显示分页器下拉
     onChange?: any;//页码改变事件

 }
 interface rowProps {
     onClick?:any,
     onMouseEnter?:any,
     onMouseLeave?:any
 }

 interface TableProps {
    columns: Array<any>; //表格列的配置
    dataSource: Array<any>, //数据数组
    rowKey: string, //表格行 key 的取值
    bordered?: boolean, //是否有边框
    width?: number, //宽度配置
    pagination: boolean | paginationProps
    onRow?: rowProps;// 行点击事件
}

const TableCollapse = ({value = 1, showTableCollapse = false, onChange}) => {
    const getSign = () => {
        return value === 1 ? (
            <span className={`${prefixCls}-plus`} onClick={() => onChange(0)}>
        +
      </span>
        ) : (
            <span className={`${prefixCls}-minus`} onClick={() => onChange(1)}>
        -
      </span>
        );
    };
    return showTableCollapse ? (
        <span className={`${prefixCls}-collapse`} style={!showTableCollapse ? {border: 'none', cursor: 'auto'} : {}}>
      {showTableCollapse && getSign()}
    </span>
    ) : null;
};

const TableComp = (props) => {
    const {columns, dataSource, rowKey, bordered = false, width, pagination,onRow}: TableProps = props;
    const [tableList, setTableList] = useState<any>([]);
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

    const handleOnClickRow = (item:any)=>{
        onRow?.onClick(item)
    }
    const handleOnMouseEnterRow = (item:any)=>{
        onRow?.onMouseEnter(item)
    }
    const handleOnMouseLeaveRow = (item:any)=>{
        onRow?.onMouseLeave(item)
    }

    // 创建 thead
    const createTHead = () => {
        return (
            <thead>
            <tr>
                {columns.map((item) => {
                    return <th style={{width:item.width}} key={item.key || item.dataIndex}>{item.title}</th>;
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
                        style = item.show ? {background: '#fafafa'} : {display: 'none'};
                    }
                    if(onRow){
                        style = {...style,'cursor':'pointer'}
                    }
                    if (item.description) {
                        return (
                            <tr onClick={()=>{onRow?.onClick&&handleOnClickRow(item)}}
                                onMouseEnter={()=>{onRow?.onMouseEnter&&handleOnMouseEnterRow(item)}}
                                onMouseLeave={()=>{onRow?.onMouseLeave&&handleOnMouseLeaveRow(item)}}
                                key={item.key}
                                style={style}
                                className={`table-row-level-${item.level}`}>
                                <td colSpan={columns.length}>{item.description}</td>
                            </tr>
                        );
                    }
                    return (
                        <tr onClick={()=>{onRow?.onClick&&handleOnClickRow(item)}}
                            onMouseEnter={()=>{onRow?.onMouseEnter&&handleOnMouseEnterRow(item)}}
                            onMouseLeave={()=>{onRow?.onMouseLeave&&handleOnMouseLeaveRow(item)}}
                            key={getRowKey(item)}
                            style={style}
                            className={`table-row-level-${item.level}`}>
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
                            <td width={item.width} key={key} data-key={key} data-rowkey={_rowKey} className={classes} >
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
                    <div className={`${prefixCls}-kong_wrapper`}>
                        <Icon name="kongzhuangtai"/>
                    </div>
                </td>
            </tr>
        );
    };

    useEffect(() => {
        const list = createNewList(dataSource, getRowKey);
        setTableList(list);
    }, [dataSource]);

    let table_styles: any = {border: bordered ? '1px solid #f6f6f6' : 'none'};
    if (width) {
        table_styles.width = width + 'px';
    }
    return (
        <div className={prefixCls}>
            <table  className={`${prefixCls}-wrapper`} ref={tableRef}>
                {/*{createColgroup(columns)}*/}
                {createTHead()}
                <tbody>{createRow()}</tbody>
            </table>
        </div>
    );
};

export default TableComp;
