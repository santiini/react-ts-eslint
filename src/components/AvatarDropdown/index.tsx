import React, {FC} from 'react';
import {Avatar, Dropdown, Spin, Menu, Icon} from 'antd';
import {ClickParam} from 'antd/lib/menu';
import styled from '@emotion/styled';

const StyledAction = styled.div`
  display: inline-block;
  height: 100%;
  padding: 0 12px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover,
  &.opend {
    background-color: ${(props): string => props.theme.bgColor || '#e6f7ff'};
  }
`;

const StyledMenu = styled(Menu)`
  min-width: 160px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  .ant-menu-item {
    &:hover {
      background-color: #e6f7ff;
    }
  }
`;

interface AvatarmenuProps {
  onClick: (value: ClickParam) => void;
}
const Avatarmenu: FC<AvatarmenuProps> = (props) => (
  <StyledMenu selectedKeys={[]} style={{minWidth: 160}} onClick={props.onClick}>
    <Menu.Item key="center">
      <Icon type="user" />
      个人中心
    </Menu.Item>
    <Menu.Item key="settings">
      <Icon type="setting" />
      个人设置
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="logout">
      <Icon type="logout" />
      退出登录
    </Menu.Item>
  </StyledMenu>
);

export interface User {
  avatar?: string;
  name?: string;
  title?: string;
}

interface AvatarDropdownProps {
  menu?: boolean;
  user?: User;
}
const AvatarDropdown: FC<AvatarDropdownProps> = (props) => {
  const {menu, user = {}} = props;

  const handleMenuClick = (value: ClickParam): void => {
    if (value.key === 'logout') {
      console.warn('登出');
    }
  };

  if (!menu) {
    return (
      <span>
        <Avatar src={user.avatar} size="small" alt="avatar" />
        <span>{user.name}</span>
      </span>
    );
  }

  return user && user.name ? (
    <Dropdown overlay={<Avatarmenu onClick={handleMenuClick} />}>
      <StyledAction>
        <Avatar src={user.avatar} size="small" alt="avatar" />
        <span style={{padding: 12}}>{user.name}</span>
      </StyledAction>
    </Dropdown>
  ) : (
    <Spin size="small" style={{marginLeft: 8, marginRight: 8}} />
  );
};

export default AvatarDropdown;
