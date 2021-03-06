import React, { useState } from "react";
import { Link, Route, Switch } from "react-router-dom";

import { Layout, Menu } from "antd";
import { CreditCardOutlined, UnorderedListOutlined } from "@ant-design/icons";

import Posts from "./posts/Posts";
import Categories from "./Categories/Categories";

import { withRouter } from "react-router";

import "antd/dist/antd.css";
import "./App.css";

const { Header, Content, Sider } = Layout;

function App(props) {
  const [posts, setPosts] = useState([
    {
      title: "Post 1",
      description: "Lorem ",
      category: ["p1", "p2", "p3"],
    },
    {
      title: "Post 2",
      description: "Lorem Ipsum ",
      category: ["p3", "p5"],
    },
  ]);

  const [categories, setCategories] = useState(["p1", "p2", "p3"]);

  const childProps = {
    posts: posts,
    categories,
    setCategories,
    setShowPost: setPosts,
  };

  return (
    <Layout className="layout-wrapper">
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[props.location.pathname]}
        >
          <Menu.Item key="/" icon={<CreditCardOutlined />}>
            <Link to="/">Posts</Link>
          </Menu.Item>
          <Menu.Item key="/categories" icon={<UnorderedListOutlined />}>
            <Link to="/categories">Categories</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="site-layout-sub-header-background">CRUD APP</Header>
        <Content className="site-layout-content">
          <div className="site-layout-background">
            <Switch>
              <Route
                path="/categories"
                render={(props) => <Categories {...props} {...childProps} />}
              />
              <Route
                path="/"
                render={(props) => <Posts {...props} {...childProps} />}
              />
            </Switch>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default withRouter(App);
