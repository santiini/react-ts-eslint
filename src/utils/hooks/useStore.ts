/**
 * 自定义 hooks: 高度集合的获取、增加、删除、修改，使用时要注意实际情况
 *   1. store 的数据获取
 *   2. store 的数据更新
 *   3. store 的数据删除
 */
/* eslint-disable @typescript-eslint/no-explicit-any,react-hooks/exhaustive-deps */
import {useState, useMemo} from 'react';
import {AxiosPromise} from 'axios';
import {notification} from 'antd';
import get from 'lodash/get';
import {FormatResponseOpt} from 'StoreComponent';

/* 判断 data 类型是 AxiosRequestList 的结果 */
function isAxiosListResult<T = any>(data: any): data is FormatResponseOpt<T> {
  if (typeof data === 'object' && data.data && data.data instanceof Array) {
    return true;
  }
  return false;
}

export interface ApiResult<T = string> {
  data?: T;
  loading: boolean;
  error: undefined | string;
}

interface UserApiParams<P0, P1, P2, P3, T1, T2> {
  // api: AxiosPromise<T>;
  fetch: (params: P0) => AxiosPromise<T1>;
  add?: (params: P1) => AxiosPromise<T1>;
  update?: (params: P2) => AxiosPromise<T2>;
  remove?: (params: P3) => AxiosPromise;
  addMsg?: string;
  fetchMsg?: string;
  updateMsg?: string;
  removeMsg?: string;
}

interface ApiHooksResult<T, P0, P1, P2, P3> {
  result: ApiResult<T>;
  fetchApi: (fetchParams: P0) => Promise<boolean>;
  addApi?: (updateParams: P1) => Promise<boolean>;
  updateApi?: (updateParams: P2) => Promise<boolean>;
  removeApi?: (updateParams: P3) => Promise<boolean>;
}

/**
 * 组件中的 Api 请求，以及相关状态的处理
 */
function useStoreHook<P0, P1, P2, P3, T1, T2>(
  params: UserApiParams<P0, P1, P2, P3, T1, T2>
): ApiHooksResult<T1, P0, P1, P2, P3> {
  const [result, setData] = useState<ApiResult<T1>>({
    data: void 0,
    loading: false,
    error: void 0,
  });

  /* fetch: 获取数据 */
  const fetchData = useMemo(() => {
    return async (fetchParams: P0): Promise<boolean> => {
      setData({data: void 0, loading: true, error: void 0});
      try {
        const result = await params.fetch(fetchParams);
        setData({data: result.data, loading: false, error: void 0});
        return true;
      } catch (error) {
        notification.error({
          message: '请求出错了！',
          description: `${params.fetchMsg || '错误信息'}: ${error.message ||
            ''}`,
        });
        setData(() => ({data: void 0, loading: false, error: error.message}));
        return false;
      }
    };
  }, []);

  /* add */
  const addData = useMemo(() => {
    if (!params.add) return;
    return async (addParams: P1): Promise<boolean> => {
      if (!params.add) return false;
      setData((prev) => ({...prev, loading: true}));
      try {
        const result = await params.add(addParams);
        setData((prev) => {
          if (isAxiosListResult(prev.data)) {
            prev.data.data = [result.data, ...prev.data.data];
            prev.data.total = prev.data.total + 1;
          }
          return {
            ...prev,
            loading: false,
          };
        });
        return true;
      } catch (error) {
        notification.error({
          message: '请求出错了！',
          description: `${params.addMsg || '错误信息'}: ${error.message || ''}`,
        });
        setData((prev) => ({...prev, loading: false, error: error.message}));
        return false;
      }
    };
  }, []);

  /* update: 更新数据 */
  const updateData = useMemo(() => {
    if (!params.update) return;
    return async (updateParams: P2): Promise<boolean> => {
      if (!params.update) return false;
      setData((prev) => ({...prev, loading: true}));
      try {
        const result = await params.update(updateParams);
        if (!!result.data) {
          setData((prev) => {
            // 数组数据的更新
            let newData = prev.data as any;
            if (newData && newData.data instanceof Array) {
              newData.data = newData.data.map((v: any) =>
                v.id === get(result.data, 'id') ? {...v, ...result.data} : v
              );
            } else {
              newData = {...prev.data, ...(result.data as any)};
            }
            return {
              ...prev,
              loading: false,
              data: newData || prev.data,
            };
          });
        }
        return true;
      } catch (error) {
        notification.error({
          message: '请求出错了！',
          description: `${params.updateMsg || '错误信息'}: ${error.message ||
            ''}`,
        });
        setData((prev) => ({...prev, loading: false, error: error.message}));
        return false;
      }
    };
  }, []);

  // remove
  const removeData = useMemo(() => {
    if (!params.remove) return;
    return async (removeParams: P3): Promise<boolean> => {
      if (!params.remove) return false;
      setData((prev) => ({...prev, loading: true}));
      try {
        await params.remove(removeParams);
        const removeId = get(removeParams, 'id', removeParams);
        setData((prev) => {
          if (isAxiosListResult(prev.data)) {
            prev.data.data = prev.data.data.filter((v) => removeId !== v.id);
            prev.data.total = prev.data.total - 1;
          }
          return {
            ...prev,
            loading: false,
          };
        });
        return true;
      } catch (error) {
        notification.error({
          message: '请求出错了！',
          description: `${params.removeMsg || '错误信息'}: ${error.message ||
            ''}`,
        });
        setData((prev) => ({...prev, loading: false, error: error.message}));
        return false;
      }
    };
  }, []);

  return {
    result,
    fetchApi: fetchData,
    addApi: addData,
    updateApi: updateData,
    removeApi: removeData,
  };
}

export default useStoreHook;
