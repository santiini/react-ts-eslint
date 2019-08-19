/* eslint-disable @typescript-eslint/no-explicit-any,react-hooks/exhaustive-deps */
/**
 * 受控 Table, params 参数控制 Table 的渲染与否, loading 组件由外部控制
 * 区别于 ParamsTable
 *   1. loading 由外部控制，dataSource 由外部控制, 更加自由和灵活
 *   2. fetchData ==> onChange 事件，反馈 TableParams 变化
 *
 * tip:
 *   1. params 类型继承于 TableParams, 支持额外的参数, 额外参数的变化也会触发 onChange
 */
import React, {
  FC,
  useState,
  useEffect,
  memo,
  useMemo,
  useCallback,
} from 'react';
import {Table} from 'antd';
import {
  ColumnProps,
  PaginationConfig,
  SorterResult,
  TableProps,
} from 'antd/lib/table';
import sumBy from 'lodash/sumBy';
import isEqual from 'lodash/isEqual';
import {initConfig} from '../../utils/table';
import {TableParams} from 'ProjectBasic';

type SelectedRowKeys = string[] | number[];

interface ExtendTableProps<T extends TableParams = TableParams> {
  rowKey?: string; // selectedRowKeys 对应的 ids
  total: number; // 总数
  error?: any;
  loading?: boolean;
  params?: T; // Table 的参数，必须包含 Table Params
  list: Record<string, any>[]; // Table 的数据, 受控
  columns: ColumnProps<any>[]; // columns, 从父组件传入，受控
  components?: TableProps<any>['components'];
  /* selectedRowKeys */
  selectedKeys?: SelectedRowKeys;
  onSelect?: (selectedKeys: SelectedRowKeys) => void;
  onChange?: (params: TableParams) => void;
}
const ExtendTable: FC<ExtendTableProps> = (props) => {
  const {rowKey = 'id', onSelect} = props;
  const [selectedRowKeys, setRowKeys] = useState(props.selectedKeys || []);
  // const [tableParams, setTableParams] = useState<TableParams | undefined>(
  //   props.params
  // );

  /* table onChange */
  const handleTableChange = useCallback(
    (
      pagination: PaginationConfig,
      filters: Record<string, string[]>,
      sorter: SorterResult<any>
    ): void => {
      const {current = 1, pageSize = 10} = pagination;
      const tableParams = props.params;
      let startIndex =
        tableParams && pageSize !== tableParams.maxResults
          ? 0
          : (current - 1) * pageSize;

      const {columnKey} = (sorter || {}) as SorterResult<any>;
      // const sortKey = order === 'ascend' ? columnKey : `-${columnKey}`
      const {sort, filter} = tableParams || {sort: '', filter: {}};
      const sortKey =
        (columnKey && `${sorter.order === 'ascend' ? '' : '-'}${columnKey}`) ||
        sort;
      /* sorter onchange */
      if (sort && sortKey && !isEqual(sortKey, sort)) {
        startIndex = 0;
      }

      /* filters */
      if (
        !(!Object.keys(filters).length && !Object.keys(filter).length) &&
        !isEqual(filter, filters)
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

      /* 变化的回调 */
      if (props.onChange) {
        props.onChange(newParams);
      }
    },
    []
  );

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
      loading: props.loading,
      total: props.total || 0,
      error: props.error,
    },
    (props.params && props.params.startIndex / props.params.maxResults + 1) || 1
  );

  /* columns, scrollX 的配置 */
  const tableScrollOpt = useMemo(() => {
    /* table scroll */
    const columns = (props.columns || []).slice();
    const windowWidth = document.querySelector('.main-content')
      ? (document.querySelector('.main-content') as HTMLElement).offsetWidth
      : 1380;

    const scrollX = sumBy(props.columns, 'width');

    const newColumns = columns.map((v) => {
      // if (v.hasOwnProperty('fixed')) {
      //   v.fixed = windowWidth - 160 >= scrollX ? false : v.fixed;
      // }
      // return v;
      // 数组的复制，不改变原来的 columns
      return {
        ...v,
        fixed:
          v.hasOwnProperty('fixed') && windowWidth - 160 <= scrollX
            ? v.fixed
            : false,
      };
    });
    return {
      scrollX: scrollX,
      columns: newColumns,
    };
  }, [props.columns]);

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
        components={props.components}
        rowKey={rowKey}
        loading={props.loading}
        locale={{
          emptyText:
            (props.loading && '加载中...') ||
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

ExtendTable.displayName = 'ControlledTable';

export default memo(ExtendTable);
