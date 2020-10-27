import React, { useState } from "react";
import Post from "./post/Post";

import "./Posts.css";

import { Button, Dropdown, Input, Menu } from "antd";
import { PlusCircleOutlined, DownOutlined } from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";
import TextArea from "antd/lib/input/TextArea";

function Posts() {
  const [showPosts, setShowPost] = useState([
    {
      title: "Post 1",
      description: "This is a first post.",
      category: ["p1", "p2", "p3"],
    },
    {
      title: "Post 2",
      description: "This is a second post.",
      category: ["p5", "p7"],
    },
    {
      title: "Post 3",
      description: "This is a third post.",
      category: ["p2", "p3"],
    },
  ]);

  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const posts = showPosts.map((post, i) => <Post post={post} key={i}></Post>);

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Button type="text" size="small" onClick={showModal}>
          <PlusCircleOutlined />
          <span>Create New Category</span>
        </Button>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <a href="http://www.taobao.com/">2nd menu item</a>
      </Menu.Item>
      <Menu.Item key="2">3rd menu item</Menu.Item>
    </Menu>
  );

  const modal = (
    <div>
      <Modal
        title="Create New Post"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form>
          <div className="form-first-field">
            <label>
              Title:
              <Input placeholder="Title" />
            </label>
            <Dropdown overlay={menu} trigger={["click"]}>
              <Button>
                Category <DownOutlined />
              </Button>
            </Dropdown>
          </div>
          <div>
            <label>
              Description:
              <TextArea rows={2} />
            </label>
          </div>
        </form>
      </Modal>
    </div>
  );

  return (
    <div className="post-panel__with-button">
      <Button
        className="post-create__button"
        type="primary"
        size="large"
        onClick={showModal}
      >
        <PlusCircleOutlined />
        <span>Create New Post</span>
      </Button>

      <div className="post-panel">
        {posts}
        {modal}
      </div>
    </div>
  );
}

export default Posts;
