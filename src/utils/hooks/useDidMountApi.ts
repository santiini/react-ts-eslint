/**
 * 自定义 hooks
 */
/* eslint-disable @typescript-eslint/no-explicit-any,react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react';
import {AxiosPromise} from 'axios';
import {notification} from 'antd';

interface ApiResult<T = string> {
  data?: T;
  loading: boolean;
  error: undefined | string;
}

interface UserApiParams<T, P> {
  // api: AxiosPromise<T>;
  api: (params: P) => AxiosPromise<T>;
  params: P;
  messaage?: string;
}

/**
 * 组件中的 Api 请求，以及相关状态的处理
 */
function useDidMountApiHook<T, P>(params: UserApiParams<T, P>): ApiResult<T> {
  const [result, setData] = useState<ApiResult<T>>({
    data: void 0,
    loading: false,
    error: void 0,
  });

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setData({
        data: void 0,
        loading: true,
        error: void 0,
      });
      try {
        const result = await params.api(params.params);
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

    fetchData();
  }, []);

  return result;
}

export default useDidMountApiHook;
