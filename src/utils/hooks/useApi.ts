/**
 * 自定义 hooks
 */
/* eslint-disable @typescript-eslint/no-explicit-any,react-hooks/exhaustive-deps */
import {useState, useCallback} from 'react';
import {AxiosPromise, AxiosResponse} from 'axios';
import {notification} from 'antd';

export interface ApiResult<T = string> {
  data?: T;
  loading: boolean;
  error: undefined | string;
}

interface UserApiParams<T, P> {
  // api: AxiosPromise<T>;
  api: (params: P) => AxiosPromise<T>;
  message?: string;
}

/**
 * 组件中的 Api 请求，以及相关状态的处理
 */
function useApiHook<T, P>(
  params: UserApiParams<T, P>
): [ApiResult<T>, (fetchParams: P) => Promise<AxiosResponse<T> | void>] {
  const [result, setData] = useState<ApiResult<T>>({
    data: void 0,
    loading: false,
    error: void 0,
  });

  // 缓存请求函数
  const fetchData = useCallback(async (fetchParams: P): Promise<AxiosResponse<
    T
  > | void> => {
    setData({
      data: void 0,
      loading: true,
      error: void 0,
    });
    try {
      const result = await params.api(fetchParams);
      setData({
        data: result.data,
        loading: false,
        error: void 0,
      });
      return result;
    } catch (error) {
      notification.error({
        message: '请求出错了！',
        description: `${params.message || '错误信息'}: ${error.message || ''}`,
      });
      setData(() => ({
        data: void 0,
        loading: false,
        error: error.message,
      }));
    }
  }, []);

  return [result, fetchData];
}

export default useApiHook;
