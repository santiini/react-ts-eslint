/* eslint-disable @typescript-eslint/no-explicit-any */
import {AxiosResponse} from 'axios';
import zipObject from 'lodash/zipObject';
import sumBy from 'lodash/sumBy';
import round from 'lodash/round';
import get from 'lodash/get';

/* 根据 location 获取当前的绝对地址 */
export function getUrl(path: string): string {
  const {protocol, host} = window.location;
  return `${protocol}//${host}${path}`;
}

/* axios 返回结果处理, X-Content-Header-Cols 属性列的转换 */
export function formatResponse(result: AxiosResponse): AxiosResponse {
  if (!Array.isArray(result.data)) return result;

  if (!result.headers) {
    return result;
  }

  // const keys = JSON.parse(decodeURI(result.headers['x-content-header-cols']));

  result.data = {
    data: result.data,
    // cols: keys,
    total:
      JSON.parse(result.headers['x-content-record-total']) ||
      result.data.length,
  };

  return result;
}

/* axios 返回结果处理，columns 在数组的第一项 */
export function formatArrayResponse(result: AxiosResponse): AxiosResponse {
  // ): AxiosResponse<FormatResponseOpt> | AxiosResponse<R> {
  if (!Array.isArray(result.data)) return result;

  if (result.data.length < 1) return result;
  const keys = result.data[0];
  const data = result.data.slice(1).map((item) => zipObject(keys, item));

  result.data = {
    data,
    total: JSON.parse(result.headers['x-content-record-total']),
  };

  return result;
}

/* 接口数据 -- key, value 的数组形式的处理: [name, [value]] */
export interface ArrayKeyValueOpt {
  name: number | string;
  value: number | string;
}
export function formatArrayKeyValue(list: any[]): ArrayKeyValueOpt[] {
  if (Array.isArray(list) && list.length > 0) {
    return list.map((v) => ({
      name: get(v, '0'),
      value: get(v, '1.0'),
    }));
  }
  return [];
}

/* 接口数据 -- [val1, val2, val3], 传入 [name1, name2, name3] 转换成 {name, value}  */
export function formatValuesWithNames(
  values: (string | number)[],
  names: string[],
  sliceIndex = 0
): ArrayKeyValueOpt[] {
  return values
    .map((v, i) => ({
      value: v,
      name: names[i],
    }))
    .slice(sliceIndex);
}

/* 百分比的格式化 */
export function toRatioArray(
  list: any[],
  valueKey: string,
  multiple = 2,
  decimals = 2
): any[] {
  const total = sumBy(list, valueKey);

  return list.map((v) => ({
    ...v,
    [valueKey]:
      total === 0 ? 0 : round((v[valueKey] / total) * 10 ** multiple, decimals),
  }));
}

/* number 类型的取值和判断 */
export function getNumerField(
  value: unknown,
  nullText?: string
): number | string | undefined {
  return Number.isNaN(Number(value)) ? nullText : Number(value);
}

/* 获取平台、uid */
/* 获取小红书 url */
export function getKolUrl(
  platform: string,
  accountId: string
): string | undefined {
  if (!accountId) return;
  if (platform === 'weibo') {
    return `https://weibo.com/u/${accountId}`;
  }
  if (platform === 'xiaohongshu') {
    return `https://www.xiaohongshu.com/user/profile/${accountId}`;
  }
  if (platform === 'toutiao') {
    return `https://www.toutiao.com/c/user/${accountId}`;
  }
  if (platform === 'bilibili') {
    return `https://space.bilibili.com/${accountId}`;
  }
  if (platform === 'zhihu') {
    return `https://www.zhihu.com/people/${accountId}/activities`;
  }
  if (platform === 'babytree') {
    return `http://home.babytree.com/u${accountId}`;
  }
  return;
}

/* slice--string 的分割 */
export function sliceText(text: string, length: number): string {
  if (typeof text === 'number') {
    return text;
  }
  if (typeof text === 'string') {
    return text.length > length ? `${text.substr(0, length)}...` : text;
  }
  return '';
}
