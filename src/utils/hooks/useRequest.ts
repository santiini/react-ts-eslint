import {AxiosPromise} from 'axios';
import {notification} from 'antd';
import {useCallback} from 'react';

interface UserRequestParams<T, P> {
  // api: AxiosPromise<T>;
  api: (params: P) => AxiosPromise<T>;
  message?: string;
}
function useRequestHook<T, P>(
  params: UserRequestParams<T, P>
): (fetchParams: P) => Promise<boolean> {
  const fetchData = useCallback(
    async (fetchParams: P): Promise<boolean> => {
      try {
        await params.api(fetchParams);
        return true;
      } catch (error) {
        notification.error({
          message: '请求出错了！',
          description: `${params.message || '错误信息'}: ${error.message ||
            ''}`,
        });
        return false;
      }
    },
    [params]
  );

  return fetchData;
}

export default useRequestHook;
