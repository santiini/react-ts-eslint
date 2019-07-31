import React, {FC, useState} from 'react';
import {Layout, Menu, Icon, Button} from 'antd';
import {NamedRouteComponentProps} from 'RouteComponent';

const {Header, Sider, Content} = Layout;

interface HomeProps extends NamedRouteComponentProps {
  name?: string;
}
const Home: FC<HomeProps> = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleTrigger = (): void => {
    setCollapsed((prev) => !prev);
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible={true} collapsed={collapsed}>
        <div>Logo</div>
        <Menu theme="dark" mode="inline" defaultOpenKeys={['1']}>
          <Menu.Item key="1">
            <Icon type="user" />
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="user" />
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="user" />
          </Menu.Item>
          <Menu.Item key="4">
            <Icon type="user" />
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header>
          <Icon
            type={!collapsed ? 'menu-fold' : 'menu-unfold'}
            onClick={toggleTrigger}
          />
        </Header>
        <Content>
          <h4>Content</h4>
          <Button>1111111111</Button>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
