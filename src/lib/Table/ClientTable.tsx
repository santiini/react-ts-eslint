/**
 * 本地排序的 Table
 *   1. 翻页，排序都由 Table 自己控制
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {FC, useState, useEffect, memo, useMemo} from 'react';
import {Table} from 'antd';
import {ColumnProps, TableProps} from 'antd/lib/table';
import sumBy from 'lodash/sumBy';
import isEqual from 'lodash/isEqual';
import {initConfig} from '../../utils/table';

type SelectedRowKeys = string[] | number[];

interface ExtendTableProps {
  rowKey: TableProps<any>['rowKey']; // selectedRowKeys 对应的 ids
  total: number; // 总数
  list: any[]; // Table 的数据, 受控
  columns: ColumnProps<any>[]; // columns, 从父组件传入，受控
  loading: boolean;
  /* selectedRowKeys */
  selectedKeys?: SelectedRowKeys;
  onSelect?: (selectedKeys: SelectedRowKeys) => void;
}
const ClientTableCom: FC<ExtendTableProps> = (props) => {
  const {rowKey = 'id', onSelect} = props;
  const [selectedRowKeys, setRowKeys] = useState(props.selectedKeys || []);
  // pagination
  const {client} = initConfig({total: props.list.length});

  /* rowSelections -- 受控制，可有可无 */
  const rowSelections = useMemo(() => {
    if (!props.selectedKeys) return;
    return {
      selectedRowKeys,
      /* rowSelections onchange */
      onChange: (selectedKeys: SelectedRowKeys): void => {
        setRowKeys(selectedKeys);
      },
    };
  }, [props.selectedKeys]);
  // }, [selectedRowKeys, props.selectedKeys]);

  /* columns, scrollX 的配置 */
  const tableScrollOpt = useMemo(() => {
    /* table scroll */
    const columns = props.columns || [];
    const windowWidth = document.querySelector('.main-content')
      ? (document.querySelector('.main-content') as HTMLElement).offsetWidth
      : 1380;

    const scrollX = sumBy(props.columns, 'width');

    columns.forEach((v) => {
      if (v.hasOwnProperty('fixed')) {
        v.fixed = windowWidth - 160 >= scrollX ? false : true;
      }
    });
    return {
      scrollX: scrollX,
      columns,
    };
  }, [props.columns]);

  /* 内部变化，通知到父组件 */
  useEffect(() => {
    if (onSelect) {
      onSelect(selectedRowKeys);
    }
  }, [selectedRowKeys]);
  // }, [selectedRowKeys, onSelect]);

  /* selectedKeys 判断变化，控制 selectedRowKeys */
  useEffect(() => {
    if (!props.selectedKeys) return;
    if (!isEqual(props.selectedKeys, selectedRowKeys)) {
      // 更新操作需要限制和谨慎，防止组件的重复刷新
      setRowKeys(props.selectedKeys || []);
    }
  }, [props.selectedKeys]);

  return (
    <div>
      <Table
        rowKey={rowKey}
        loading={props.loading}
        locale={{
          emptyText: (props.loading && '加载中...') || '暂无数据',
        }}
        scroll={{x: tableScrollOpt.scrollX}}
        pagination={client}
        columns={tableScrollOpt.columns}
        dataSource={props.list}
        rowSelection={rowSelections}
      />
    </div>
  );
};

const ClientTable = memo(ClientTableCom);

export default ClientTable;
