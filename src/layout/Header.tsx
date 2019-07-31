import React, {FC, memo, CSSProperties} from 'react';
import {Layout, Icon} from 'antd';
import {styleUtils} from '../styled-css';
import UserSettings from './UserSettings';

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

  return (
    <Layout.Header
      style={{
        ...props.style,
        ...styleUtils.alignCenter,
        backgroundColor: '#fff',
        padding: '0 14px',
      }}
    >
      <div style={{flex: 1}}>
        <Icon
          style={{fontSize: 20}}
          type={!collapsed ? 'menu-fold' : 'menu-unfold'}
          onClick={toggleTrigger}
        />
      </div>
      <UserSettings name="settings" />
    </Layout.Header>
  );
};

export default memo(Header);
