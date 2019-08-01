/**
 * 自定义 hooks -- limitApi
 *   1. 主动调用请求，传入请求的 api 及相关信息列表
 */
/* eslint-disable @typescript-eslint/no-explicit-any,react-hooks/exhaustive-deps */
import {useState} from 'react';
import {mapLimit} from 'async';
import {AxiosPromise} from 'axios';
import {notification} from 'antd';
import {ErrorData} from 'StoreComponent';

export interface LimitApiResult {
  dataMap: {[key in string]?: any};
  loadingMap: {[key in string]?: boolean};
  errorMap: {[key in string]?: ErrorData};
}

export interface LimitRequestListItem<Type = string, Params = any> {
  type: Type;
  api: (...args: any[]) => AxiosPromise;
  params: Params;
  message?: string;
}
export interface LimitRequestList<Type = string, Params = any> {
  type: Type;
  api: (...args: any[]) => AxiosPromise;
  params: Params;
  message?: string;
}

type LimitApiReturn<T> = [
  LimitApiResult,
  (list: T[]) => Promise<any[] | undefined>,
  (param: T) => Promise<any>
];
function useLimitApiHook<T extends LimitRequestListItem>(
  limit = 2
): LimitApiReturn<T> {
  const [result, setData] = useState<LimitApiResult>({
    dataMap: {},
    loadingMap: {},
    errorMap: {},
  });

  /* 请求列表的数据 */
  const fetchLimitData = async (
    paramList: T[]
  ): Promise<unknown[] | undefined> => {
    // loading 状态的一起处理
    const initialRet = {dataMap: {}, errorMap: {}, loadingMap: {}};
    const loadingRet = paramList.reduce<LimitApiResult>((prev, cur) => {
      prev.dataMap[cur.type] = undefined;
      prev.loadingMap[cur.type] = true;
      prev.errorMap[cur.type] = undefined;
      return prev;
    }, initialRet);
    setData((prev) => ({
      dataMap: {...prev.dataMap, ...loadingRet.dataMap},
      loadingMap: {...prev.loadingMap, ...loadingRet.loadingMap},
      errorMap: {...prev.errorMap, ...loadingRet.errorMap},
    }));
    // 限频的请求，并返回结果
    const limitRet = await new Promise<unknown[]>((resolve, reject): void => {
      mapLimit(
        paramList,
        limit,
        async (param) => {
          try {
            const ret = await param.api(param.params);
            setData((prev) => ({
              ...prev,
              dataMap: {...prev.dataMap, [param.type]: ret.data},
              loadingMap: {...prev.loadingMap, [param.type]: false},
            }));
            return ret.data;
          } catch (error) {
            setData((prev) => ({
              ...prev,
              loadingMap: {...prev.loadingMap, [param.type]: false},
              errorMap: {...prev.errorMap, [param.type]: error.message},
            }));
            notification.error({
              message: `${param.message || ''}请求失败`,
              description: error.description,
            });
            return;
          }
        },
        (error, results) => {
          if (!error) {
            return resolve(results);
          }
          return reject(error.message);
        }
      );
    });

    return limitRet;
  };

  // 请求单个的数据，可用于失败后的重试
  const fetchData = async (params: T): Promise<void> => {
    setData((prev) => ({
      ...prev,
      loadingMap: {...prev.loadingMap, [params.type]: true},
      dataMap: {...prev.dataMap, [params.type]: undefined},
      errorMap: {...prev.errorMap, [params.type]: undefined},
    }));

    try {
      const result = await params.api(params.params);
      setData((prev) => ({
        ...prev,
        loadingMap: {...prev.loadingMap, [params.type]: false},
        dataMap: {...prev.dataMap, [params.type]: result.data},
      }));
      return result.data;
    } catch (error) {
      setData((prev) => ({
        ...prev,
        loadingMap: {...prev.loadingMap, [params.type]: false},
        errorMap: {...prev.errorMap, [params.type]: error.message},
      }));
      notification.error({
        message: `${params.message || ''}请求失败`,
        description: error.message,
      });
    }
  };

  return [result, fetchLimitData, fetchData];
}

export default useLimitApiHook;
