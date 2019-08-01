/**
 * 正常的 Content 容器
 */
import React, {FC} from 'react';
import styled from '@emotion/styled';

export const GridContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100%;
  transition: 0.3s;
`;

interface GridContentProps {
  contentWidth?: 'Fluid' | 'Fixed';
}
const GridContent: FC<GridContentProps> = (props) => {
  return <GridContainer>{props.children}</GridContainer>;
};

export default GridContent;
