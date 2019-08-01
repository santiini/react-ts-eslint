import React, {FC, memo, CSSProperties} from 'react';
import {Layout, Icon} from 'antd';
import styled from '@emotion/styled';
import UserSettings from './UserSettings';

const HeaderContainer = styled.div`
  width: 100%;
  position: relative;
  padding: 0;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  align-items: center;
`;

interface HeaderProps {
  collapsed?: boolean;
  onToggleCollapsed?: (value: boolean) => void;
  style?: CSSProperties;
}
const Header: FC<HeaderProps> = (props) => {
  const {collapsed, onToggleCollapsed} = props;

  const toggleTrigger = (): void => {
    if (onToggleCollapsed) {
      onToggleCollapsed(!collapsed);
    }
  };

  // zIndex: 2 导致和 PageHeader 不在一个 zIndex, box-shadow 可以看见效果
  return (
    <Layout.Header style={{padding: 0, zIndex: 2}}>
      <HeaderContainer style={props.style}>
        <div style={{flex: 1, padding: '0 14px'}}>
          <Icon
            style={{fontSize: 20}}
            type={!collapsed ? 'menu-fold' : 'menu-unfold'}
            onClick={toggleTrigger}
          />
        </div>
        <UserSettings name="settings" />
      </HeaderContainer>
    </Layout.Header>
  );
};

export default memo(Header);
