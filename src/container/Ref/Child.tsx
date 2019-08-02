import React, {forwardRef, ReactElement, useState} from 'react';
import {MRow} from '../styledComponents/Antd';

interface ChildProps {
  title: string;
}
/**
 * 1. forwardRef<>(props, ref) 的参数
 *   1. props: 组件的 props
 *   2. ref: 父组件传递下来的 ref
 */
const Child = forwardRef<HTMLButtonElement, ChildProps>(
  (props, ref): ReactElement | null => {
    const {title} = props;
    const [time, setTime] = useState(0);

    const handleClick = (): void => {
      console.warn('子组件的点击事件');
      setTime(new Date().getMilliseconds());
    };

    return (
      <MRow style={{border: '1px solid #eee', padding: 10}}>
        <h4>Child: {time}</h4>
        <button ref={ref} onClick={handleClick}>
          {title}
        </button>
      </MRow>
    );
  }
);

export default Child;
