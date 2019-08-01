import {SMColumnProps, RenderOptions, ColumnFieldOptions} from './interface';
import {ColumnTypes} from './columnMap';

// 单一字段的统一性生成 -- 简单使用
export function translateField(
  options: ColumnFieldOptions,
  title: string,
  beforeRender?: RenderOptions | ColumnTypes,
  width?: number | string
): SMColumnProps {
  const {dataIndex} = options;

  const columnOpt = {
    title,
    dataIndex,
    beforeRender,
  };

  return typeof width !== 'undefined' ? {...columnOpt, width} : columnOpt;
}
