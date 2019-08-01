/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {ColumnProps} from 'antd/lib/table';
import {ColumnTypes} from './columnMap';

/* table 下载函数 */
// interface TableDownload<T> {
//   download?: (text: unknown, record: T) => React.ReactNode;
// }
type TableDownload<T> = (text: unknown, record: T) => React.ReactNode;

/* column 的自定义选项 */
interface ColumnCustorm<T = any> {
  download?: TableDownload<T>;
}

export type RenderFunc<T = any> = (
  text: unknown,
  record: T,
  index?: number
) => React.ReactNode;

export type ColumnSortValue<T = any> = (record: T) => undefined | number;

/* render-options */
export interface RenderOptions<T = any> {
  type: ColumnTypes;
  format?: string;
  nullText?: string;
  // 根据 record 获取特定值，后用于 column 的渲染: value, secondValue
  firstValue?: (
    record: T,
    text?: string | number
  ) => undefined | string | number;
  secondValue?: (
    record: T,
    text?: string | number
  ) => undefined | string | number;
  // 原始值和转化值的处理: array or string 转换
  transformToArray?: (record: T) => undefined | string[];
  transformToString?: (record: T) => undefined | string;
  // 原始的 column.render
  render?: RenderFunc<T>;
  // 获取 sortValue 的函数
  sortValue?: ColumnSortValue<T>;
}

/* column 的主要配置项 */
export interface SMColumnProps<T = any>
  extends ColumnProps<T>,
    ColumnCustorm<T> {
  beforeRender?: ColumnTypes | RenderOptions<T>;
}

/* column-translator 的参数 */
export interface ColTranslatorOpt<T> extends ColumnFieldOptions {
  column: SMColumnProps<T>;
}

/* columns-translator 的结果，继承于 ant-design 的 column */
export interface ColTranslatorResult<T = any> extends ColumnProps<T> {
  download?: TableDownload<T>;
}

/* 获取 renderObject 对象 */
export function getRenderOpt<T>(
  options: ColTranslatorOpt<T>
): RenderOptions<T> | undefined {
  const renderObj = options && options.column && options.column.beforeRender;

  return renderObj && typeof renderObj !== 'string' ? renderObj : undefined;
}

/* 单个字段的 options 转换 */
export interface ColumnFieldOptions {
  nullText?: string;
  sortType?: 'server' | 'client';
  dataIndex: string;
}
export interface ColumnFieldOptionsFn {
  (options: ColumnFieldOptions): SMColumnProps;
}
