/* eslint-disable @typescript-eslint/no-explicit-any */
import get from 'lodash/get';
import {PaginationConfig} from 'antd/lib/table';
import {ErrorData} from 'StoreComponent';
import {SMColumnProps} from '../lib/columns/interface';
import {convertExcel} from './excel';

/**
 * @export 获取 Table 的 paginagion 和 locale
 * @param {Pagination<any>} stateData
 * @param {number} [currentPage]
 * @returns
 */
interface Pagination<T> {
  data?: T;
  success?: boolean;
  loading?: boolean;
  error?: ErrorData;
  total?: number;
}
export function initConfig(
  stateData: Pagination<any>,
  currentPage?: number
): Record<'client' | 'server', PaginationConfig> {
  const {total} = stateData;
  return {
    // pagination: 服务端分页
    server: {
      total,
      pageSizeOptions: ['10', '20', '50', '100'],
      defaultPageSize: 10,
      showQuickJumper: true,
      showSizeChanger: true,
      showTotal(totalNum: number): string {
        const {current, pageSize}: any = this;
        const min = (current - 1) * pageSize + 1;
        const max = current * pageSize;
        return `${min}-${max} 共${totalNum}项`;
      },
      current: currentPage,
    },
    // // locale
    // locale: {
    //   emptyText:
    //     (loading && '加载中...') || (error && '加载出错') || '暂无数据',
    // },
    // pagination: 本地分页
    client: {
      total,
      pageSizeOptions: ['10', '20', '50', '100'],
      defaultPageSize: 10,
      showQuickJumper: true,
      showSizeChanger: true,
      showTotal(totalNum: number): string {
        const {current, pageSize}: any = this;
        const min = (current - 1) * pageSize + 1;
        const max = current * pageSize;
        return `${min}-${max} 共${totalNum}项`;
      },
    },
  };
}

/**
 * 转化数据为 excel, .xlsx 格式
 * @export
 * @param {string} fileName
 * @param {IColumnProps<any>[]} columns
 * @param {Array<Record<string, any>>} list
 * @param {({ columnKey: string; order: 'ascend' | 'descend' })} [sort]
 * @param {string} [nullText]
 */
export function downloadDatabyColumns(
  fileName: string,
  columns: SMColumnProps<any>[],
  list: Record<string, any>[],
  sort?: {columnKey: string; order: 'ascend' | 'descend'},
  nullText?: string
): void {
  /* 表头：1. title 时字符串 2. title 是 组件 */
  const tHeaders = columns.map((v) =>
    typeof v.title === 'string' ? v.title : get(v, 'title.props.primary')
  );

  let data = list;

  /* 排序处理 */
  if (sort) {
    data = list.sort((a, b) => {
      const sortA = get(a, sort.columnKey, -1);
      const sortB = get(b, sort.columnKey, -1);

      return sort.order === 'descend' ? sortB - sortA : sortA - sortB;
    });
  }

  const fileData = data.map((value) => {
    return columns.map((column, i) => {
      /* 原始数据 */
      let columnData = get(value, column.dataIndex || '', '');
      /* Table 渲染结果 */
      let showValue = columnData;
      if (column.download) {
        showValue = column.download(columnData, value);
      } else if (column.render) {
        showValue = column.render(showValue, value, i);
      }

      /* 特殊文本的标点处理 */
      if (column.dataIndex === 'content.status.text') {
        columnData = (columnData && columnData.replace(/“/g, '’')) || '';
        columnData = (columnData && columnData.replace(/"/g, "'")) || '';
      }

      if (
        !showValue ||
        (typeof showValue !== 'string' && Number.isNaN(Number(showValue)))
      ) {
        return typeof columnData === 'number' ? String(columnData) : columnData;
      }

      const nullShowText = nullText || '--';
      return showValue === nullShowText ? '' : String(showValue);
    });
  });

  convertExcel([tHeaders, ...fileData], fileName);
}
