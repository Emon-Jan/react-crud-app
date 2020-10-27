import React from "react";
import { Link, Route } from "react-router-dom";

import { Layout, Menu } from "antd";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";

import Posts from "./posts/Posts";
import Categories from "./Categories/Categories";

import "antd/dist/antd.css";
import "./App.css";

const { Header, Content, Sider } = Layout;

function App() {
  return (
    <Layout className="layout-wrapper">
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["/"]}>
          <Menu.Item key="/" icon={<UserOutlined />}>
            <Link to="/">Posts</Link>
          </Menu.Item>
          <Menu.Item key="/categories" icon={<VideoCameraOutlined />}>
            <Link to="/categories">Categories</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="site-layout-sub-header-background">CRUD APP</Header>
        <Content className="site-layout-content">
          <div className="site-layout-background">
            <Route path="/" component={Posts} exact={true} />
            <Route path="/categories" component={Categories} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
