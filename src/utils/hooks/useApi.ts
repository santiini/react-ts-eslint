/**
 * 自定义 hooks
 */
/* eslint-disable @typescript-eslint/no-explicit-any,react-hooks/exhaustive-deps */
import {useState} from 'react';
import {AxiosPromise} from 'axios';
import {notification} from 'antd';

export interface ApiResult<T = string> {
  data?: T;
  loading: boolean;
  error: undefined | string;
}

interface UserApiParams<T, P> {
  // api: AxiosPromise<T>;
  api: (params: P) => AxiosPromise<T>;
  messaage?: string;
}

/**
 * 组件中的 Api 请求，以及相关状态的处理
 */
function useApiHook<T, P>(
  params: UserApiParams<T, P>
): [ApiResult<T>, (fetchParams: P) => void] {
  const [result, setData] = useState<ApiResult<T>>({
    data: void 0,
    loading: false,
    error: void 0,
  });

  const fetchData = async (fetchParams: P): Promise<void> => {
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
    } catch (error) {
      notification.error({
        message: '请求出错了！',
        description: `${params.messaage || '错误信息'}: ${error.messaage ||
          ''}`,
      });
      setData(() => ({
        data: void 0,
        loading: false,
        error: error.message,
      }));
    }
  };

  return [result, fetchData];
}

export default useApiHook;
