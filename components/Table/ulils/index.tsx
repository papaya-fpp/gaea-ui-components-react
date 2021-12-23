import React from 'react';

export const createColgroup = (columns) => {
  const ary:Array<any> = [];
  let prevWitch = '';
  for (let i = 0; i < columns.length; i++) {
    if (columns[i].width) {
      if (columns[i].width == prevWitch) {
        ary[i - 1].num++;
      } else {
        ary[i] = { width: columns[i].width, num: 1 };
      }
      prevWitch = columns[i].width;
    } else {
      prevWitch = '';
    }
  }
  const colDom:Array<any> = [];
  for (let i = 0; i < ary.length; i++) {
    if (!ary[i]) {
      colDom.push(() => <col />);
    } else {
      colDom.push(() => <col span={ary[i].num} style={{ width: ary[i].width }} />);
    }
  }
  return (
    <colgroup>
      {colDom.map((Item, index) => (
        <Item key={index} />
      ))}
    </colgroup>
  );
};

export const createNewList = (list, getRowKey, level = 0, parentId?) => {
  let ary:Array<any> = [];
  for (let i = 0; i < list.length; i++) {
    const { description, children, ...data } = list[i];
    const isCollapse = !!(description || (children && children.length > 0));
    const item_key = getRowKey(data);
    const obj:any = {
      ...data,
      level,
      isCollapse,
      collapseValue: 1 // 1 折叠 0 展开
    };
    if (level > 0 && parentId) {
      obj.parentId = parentId;
      obj.show = false;
    }
    ary.push(obj);
    if (description) {
      ary.push({
        description,
        key: item_key + '-' + 'description',
        level: level + 1,
        show: false,
        parentId: item_key
      });
    }
    if (children && children.length > 0) {
      ary = ary.concat(createNewList(children, getRowKey, level + 1, item_key));
    }
  }
  return ary;
};
