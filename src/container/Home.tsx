import React, {FC, useState} from 'react';
import {Layout, Button} from 'antd';
import styled from '@emotion/styled';
import {NamedRouteComponentProps} from 'RouteComponent';
import logo from '../asserts/images/logo.svg';
import collapsedLogo from '../asserts/images/logo.png';
import MenuList from '../layout/MenuList';
import Footer from '../layout/Footer';
import Header from '../layout/Header';

const {Sider, Content} = Layout;

const LogoWrapper = styled.div`
  height: 50px;
  display: flex;
  align-items: center;

  img {
    margin: 0 6px 0 16px;
    height: 32px;
    border-radius: 6px;
    vertical-align: middle;
  }

  span {
    display: inline-block;
    color: rgb(104, 160, 29);
    font-size: 16px;
    position: absolute;
    top: 13px;
  }
`;

const list = [
  {name: '用户管理', value: 'user'},
  {name: '项目管理', value: 'campaign'},
  {name: '任务管理', value: 'task'},
];

interface HomeProps extends NamedRouteComponentProps {
  name?: string;
}
const Home: FC<HomeProps> = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{height: '100%', width: '100%'}}>
      <Sider trigger={null} collapsible={true} collapsed={collapsed}>
        <LogoWrapper>
          <img src={collapsed ? collapsedLogo : logo} alt="KOL Admin" />
        </LogoWrapper>
        <MenuList list={list} defaultValue="user" />
      </Sider>

      <Layout>
        <Header
          collapsed={collapsed}
          onToggleCollapsed={setCollapsed}
          style={{
            height: 64,
            flex: '0 0 auto',
          }}
        />
        <Content
          style={{margin: 24, flex: 'auto', paddingTop: 0, minHeight: 0}}
        >
          <h4>Content</h4>
          <Button>Admin</Button>
        </Content>
        <Footer style={{padding: 0, flex: '0 0 auto'}} />
      </Layout>
    </Layout>
  );
};

export default Home;
