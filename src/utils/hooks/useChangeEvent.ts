/**
 * 自定义 Hooks --- 提高代码的重用性
 */
import {useState, useCallback} from 'react';

interface EventChange {
  (e: React.ChangeEvent<HTMLInputElement>): void;
}

interface UseEventValueFn {
  (str: string): [string, EventChange];
}

const useEventValueHook: UseEventValueFn = (str) => {
  const [value, setValue] = useState(str);

  const memoizedCb = useCallback<EventChange>((e) => {
    setValue(e.target.value);
  }, []);

  return [value, memoizedCb];
};

export default useEventValueHook;
