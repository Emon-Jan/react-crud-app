import React, { useState } from "react";
import "./Posts.css";

import { Button, Divider, Input, message, Select } from "antd";
import { PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Post from "./post/Post";
import ModalComponent from "../Modal/Modal";

const { Option } = Select;

function Posts(props) {
  const [visible, setVisible] = useState(false);
  const [anotherModalvisible, setAnotherModalVisible] = useState(false);
  const [onEditRequest, setOnEditRequest] = useState(false);
  const [onEditIndex, setOnEditIndex] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  const clearFormState = () => {
    setTitle("");
    setDescription("");
    setCategory([]);
  };

  const showModal = () => {
    setVisible(true);
  };

  const showCategoryModal = () => {
    setAnotherModalVisible(true);
  };

  const checkFormValueEmpty = () => {
    return !!title && !!description && !!category.length;
  };

  const onCreate = () => {
    const postObj = { title, description, category };
    if (checkFormValueEmpty()) {
      props.setShowPost((states) => [...states, postObj]);
    }
    setVisible(false);
    clearFormState();
  };

  const onUpdate = () => {
    const postObj = { title, description, category };
    if (checkFormValueEmpty()) {
      const posts = props.showPosts.slice();
      posts.splice(onEditIndex, 1, postObj);
      props.setShowPost(posts);
    }
    setVisible(false);
  };

  const onDelete = (index) => {
    const posts = props.showPosts.slice();
    posts.splice(index, 1);
    props.setShowPost(posts);
  };

  const updatePostState = ({ title, description, category }) => {
    setTitle(title);
    setDescription(description);
    setCategory(category);
  };

  const onEdit = (index) => {
    setOnEditRequest(true);
    setOnEditIndex(index);
    updatePostState(props.showPosts[index]);
    showModal();
  };

  const categories = props.categories.map((category) => (
    <Option key={category}>{category}</Option>
  ));

  const handleTitleChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handleNewCategoryChange = (e) => {
    e.preventDefault();
    setCategoryName(e.target.value);
  };

  const warning = (msg) => {
    message.warning(msg);
  };

  const onCreateCategory = () => {
    const isCategoryExists = props.categories.includes(categoryName);
    if (isCategoryExists) {
      warning(`Category "${categoryName}" already exists`);
    }
    if (!!categoryName && !isCategoryExists) {
      props.setCategories((states) => [...states, categoryName]);
      setCategory((states) => [...states, categoryName]);
    }
    setAnotherModalVisible(false);
    setCategoryName("");
  };

  const postForm = (
    <form>
      <div className="form-input-label">
        <label htmlFor="title">
          Title
          <Input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
        </label>
      </div>
      <div className="form-input-label">
        <label htmlFor="description">
          Description
          <Input
            type="textarea"
            id="description"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </label>
      </div>
      <div className="form-input-label">
        <label>
          Category
          <Select
            className="select-input"
            mode="multiple"
            placeholder="Select category"
            onChange={handleCategoryChange}
            value={category}
            dropdownRender={(menu) => (
              <div>
                <Button
                  type="text"
                  size="small"
                  block={true}
                  onClick={showCategoryModal}
                >
                  <PlusOutlined />
                  <span>Create New Category</span>
                </Button>
                <Divider className="divider" />
                {menu}
              </div>
            )}
          >
            {categories}
          </Select>
        </label>
      </div>
    </form>
  );

  const categoryForm = (
    <form>
      <div className="form-input-label">
        <label htmlFor="categoryName">
          Category
          <Input
            type="text"
            id="categoryName"
            name="categoryName"
            value={categoryName}
            onChange={handleNewCategoryChange}
            onPressEnter={(e) => {
              e.preventDefault();
            }}
          />
        </label>
      </div>
    </form>
  );

  const posts = props.showPosts.map((post, i) => (
    <Post
      post={post}
      categories={props.categories}
      onDeletePost={onDelete}
      onEditPost={onEdit}
      index={i}
      key={i}
    ></Post>
  ));

  const closeModal = () => {
    setVisible(false);
    setAnotherModalVisible(false);
    clearFormState();
    setOnEditRequest(false);
  };

  const closeAnotherModal = () => {
    setAnotherModalVisible(false);
  };

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
        <ModalComponent
          modalTitle={onEditRequest ? "Update Post" : "Create New Post"}
          okText={"Save"}
          visible={visible}
          onAction={onEditRequest ? onUpdate : onCreate}
          onCancel={closeModal}
        >
          {postForm}
        </ModalComponent>
        <ModalComponent
          modalTitle={"Create New Category"}
          okText={"Save"}
          visible={anotherModalvisible}
          onAction={onCreateCategory}
          onCancel={closeAnotherModal}
          zIndex={2000}
        >
          {categoryForm}
        </ModalComponent>
      </div>
    </div>
  );
}

export default Posts;
