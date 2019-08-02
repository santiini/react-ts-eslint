import React, {FC, useRef} from 'react';
import PageHeaderWrapper from '../../layout/PageHeaderWrapper';
import Child from './Child';
import {MRow, MButton} from '../styledComponents/Antd';

interface ForWordRefDemoProps {
  name?: string;
}
const ForWordRefDemo: FC<ForWordRefDemoProps> = (props) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleTrigger = (): void => {
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  };

  return (
    <PageHeaderWrapper title="ForwardRef">
      <h4>1. 测试 forwardRef</h4>
      <Child title="Child-Button" ref={buttonRef} />
      <MRow>
        <MButton onClick={handleTrigger}>触发Child的点击事件</MButton>
      </MRow>
    </PageHeaderWrapper>
  );
};

export default ForWordRefDemo;
