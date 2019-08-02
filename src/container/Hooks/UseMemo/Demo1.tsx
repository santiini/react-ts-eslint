/* eslint-disable no-console */
/**
 * PureComponent 和 memo 函数式组件
 *   1. 作用相同，减少组件渲染
 *   2. 通过简单的判断  props 的引用是否是一个值，非完全相等
 *   3. memo(Component, isRender) 的第二个参数
 */
import React, {FC, memo} from 'react';
import {ButtonProps} from 'antd/lib/button';
import {MButton} from '../../styledComponents/Antd';

interface TestButtonProps {
  onClick?: ButtonProps['onClick'];
  // 解决 memo 问题
  children?: React.ReactNode;
}
export default class TestButton extends React.PureComponent<TestButtonProps> {
  public render(): React.ReactNode {
    console.log('TestButton');
    return (
      <MButton onClick={this.props.onClick}>{this.props.children}</MButton>
    );
  }
}

const TestButton2: FC<TestButtonProps> = (props) => {
  console.log('TestFnButton');
  return <MButton onClick={props.onClick}>{props.children}</MButton>;
};

// memo 的第二个参数，判断组件是否相等: (prevProps, nextProps) => boolean
export const TestFnButton = memo(TestButton2);
