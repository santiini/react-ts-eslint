/* eslint-disable @typescript-eslint/no-explicit-any,react-hooks/exhaustive-deps */
/**
 * 受控 Table, params 参数控制 Table 的渲染与否
 * loading, pagination, rowSelection 等由内部控制,
 * 父组件只提供 fetchData, Table 的数据获取只应该在组件内部进行，调用传入的 fetchData
 * tips:
 * 1. columns 此时是动态可变传入的, 由父组件受控
 * 2. params 必须包含 ITableParams，同时还可以包含外部的额外参数(serachName, teamId等)
 * 3. params 的两种变化方式：
 *    3.1. 组件内部触发 tableParams 变化 --> fetchData -->
 *        外部保存新的 params --> 判断 params 和 tableParams 相等;
 *    3.2. 组件外部 param 变化 --> 判断 params 和 tableParams setTableParams -->
 *        组件内部触发 tableParams 变化 --> fetchData --> 外部 params 没有变化
 * 4. rowSelection 和 params 的流程一致，内部控制和外部控制
 */
import React, {FC, useState, useEffect, memo, useMemo} from 'react';
import {Table} from 'antd';
import {ColumnProps, PaginationConfig, SorterResult} from 'antd/lib/table';
import sumBy from 'lodash/sumBy';
import isEqual from 'lodash/isEqual';
import {initConfig} from '../../utils/table';

type SelectedRowKeys = string[] | number[];
export interface TableParams {
  startIndex: number;
  maxResults: number;
  sort: string;
  filter: Record<string, string[]>;
}

export type TableParamsProps = TableParams;

interface ExtendTableProps {
  rowKey?: string; // selectedRowKeys 对应的 ids
  total: number; // 总数
  error?: any;
  params?: TableParamsProps; // Table 的参数，必须包含 Table Params
  list: Record<string, any>[]; // Table 的数据, 受控
  columns: ColumnProps<any>[]; // columns, 从父组件传入，受控
  fetchData: (params: TableParamsProps) => Promise<any>;
  /* selectedRowKeys */
  selectedKeys?: SelectedRowKeys;
  onSelect?: (selectedKeys: SelectedRowKeys) => void;
}
const ExtendTable: FC<ExtendTableProps> = (props) => {
  const {rowKey = 'id', onSelect} = props;
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setRowKeys] = useState(props.selectedKeys || []);
  const [tableParams, setTableParams] = useState<TableParams | undefined>(
    props.params
  );

  /* table onChange */
  const handleTableChange = (
    pagination: PaginationConfig,
    filters: Record<string, string[]>,
    sorter: SorterResult<any>
  ): void => {
    const {current = 1, pageSize = 10} = pagination;

    let startIndex =
      tableParams && pageSize !== tableParams.maxResults
        ? 0
        : (current - 1) * pageSize;

    const {columnKey} = (sorter || {}) as SorterResult<any>;
    // const sortKey = order === 'ascend' ? columnKey : `-${columnKey}`
    const {sort, filter} = tableParams || {sort: '', filter: void 0};
    const sortKey = (columnKey && `-${columnKey}`) || sort;

    /* sorter onchange */
    if (sort && sortKey && !isEqual(sortKey, sort)) {
      startIndex = 0;
    }

    /* filters */
    if (
      Object.keys(filters).length > 0 &&
      !isEqual(Object.keys(filters).length > 0, filter)
    ) {
      startIndex = 0;
    }

    const newParams = {
      ...tableParams,
      startIndex: startIndex,
      maxResults: pageSize,
      sort: sortKey,
      filter: filters,
    };

    if (isEqual(newParams, tableParams)) {
      return;
    }

    setTableParams(newParams);
  };

  /* rowSelections */
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

  /* pagition */
  /* pagition */
  const {server} = initConfig(
    {
      loading,
      total: props.total || 0,
      error: props.error,
    },
    (!!tableParams && tableParams.startIndex / tableParams.maxResults + 1) || 1
  );

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

  /* 模拟 setState({}, () => {}}), 页面初始化也会执行 */
  useEffect(() => {
    if (!tableParams) return;
    if (Date.now() > 1000) {
      return;
    }
    /* 获取数据，控制 loading */
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      try {
        if (selectedRowKeys.length > 0) {
          setRowKeys([]);
        }
        await props.fetchData(tableParams);
      } catch (error) {}
      setLoading(false);
    };
    fetchData();
  }, [tableParams]);

  /* 判断 params 参数是否发生变化, props.params --> tableParams --> fetchData */
  useEffect(() => {
    if (!isEqual(props.params, tableParams)) {
      setTableParams(props.params);
    }
  }, [props.params]);

  /* 内部变化，通知到父组件 */
  useEffect(() => {
    if (onSelect) {
      onSelect(selectedRowKeys);
    }
  }, [selectedRowKeys]);

  /* selectedKeys 判断变化，控制 selectedRowKeys */
  useEffect(() => {
    if (!isEqual(props.selectedKeys, selectedRowKeys)) {
      setRowKeys(props.selectedKeys || []);
    }
  }, [props.selectedKeys]);

  return (
    <div>
      <Table
        rowKey={rowKey}
        loading={loading}
        locale={{
          emptyText:
            (loading && '加载中...') ||
            (props.error && '加载出错') ||
            '暂无数据',
        }}
        scroll={{x: tableScrollOpt.scrollX}}
        pagination={server}
        columns={tableScrollOpt.columns}
        dataSource={props.list}
        rowSelection={rowSelections}
        onChange={handleTableChange}
      />
    </div>
  );
};

const ParamsTable = memo(ExtendTable);

export default ParamsTable;
