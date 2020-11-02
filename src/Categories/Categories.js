import React, { useState } from "react";
import { Button, Input, message } from "antd";

import { PlusCircleOutlined } from "@ant-design/icons";
import "./Categories.css";
import ModalComponent from "../Modal/Modal";
import Category from "./category/category";

function Categories(props) {
  const [categoryName, setCategoryName] = useState("");
  const [oldCategoryName, setOldCategoryName] = useState("");
  const [visible, setVisible] = useState(false);
  const [onEditRequest, setOnEditRequest] = useState(false);
  const [onEditIndex, setOnEditIndex] = useState(null);

  const clearFormState = () => {
    setCategoryName("");
  };

  const showModal = () => {
    setVisible(true);
  };

  const checkFormValueEmpty = () => {
    return !!categoryName;
  };

  const warning = (msg) => {
    message.warning(msg);
  };

  const onCreate = () => {
    const isCategoryExists = props.categories.includes(categoryName);
    if (isCategoryExists) {
      warning(`Category "${categoryName}" already exists`);
    }
    if (checkFormValueEmpty() && !isCategoryExists) {
      props.setCategories((states) => [...states, categoryName]);
    }
    setVisible(false);
    clearFormState();
  };

  const onUpdate = () => {
    const isCategoryExists = props.categories.includes(categoryName);
    if (isCategoryExists) {
      warning(`Category "${categoryName}" already exists`);
    }
    if (checkFormValueEmpty() && !isCategoryExists) {
      const categories = props.categories.slice();
      categories.splice(onEditIndex, 1, categoryName);
      const posts = props.posts
        .slice()
        .filter((post) => post.category.includes(oldCategoryName));
      posts.map((post) => {
        const indexOfCategory = post.category.indexOf(oldCategoryName);
        post.category.splice(indexOfCategory, 1, categoryName);
        return post;
      });
      props.setCategories(categories);
    }
    setVisible(false);
    clearFormState();
  };

  const onDelete = (item, index) => {
    const categories = props.categories.slice();
    categories.splice(index, 1);
    const posts = props.posts.slice();
    const filteredPosts = posts.filter((post) => post.category.includes(item));
    filteredPosts.map((post) => {
      const indexOfCategory = post.category.indexOf(item);
      post.category.splice(indexOfCategory, 1);
      return post;
    });
    props.setCategories(categories);
  };

  const onEdit = (item, index) => {
    setOnEditRequest(true);
    setOnEditIndex(index);
    setCategoryName(item);
    setOldCategoryName(item);
    showModal();
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setCategoryName(e.target.value);
  };

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
            onChange={handleCategoryChange}
            onPressEnter={(e) => {
              e.preventDefault();
            }}
          />
        </label>
      </div>
    </form>
  );

  const closeModal = () => {
    setVisible(false);
    clearFormState();
    setOnEditRequest(false);
  };

  return (
    <div className="category-panel__with-button">
      <Button
        className="category-create__button"
        type="primary"
        size="large"
        onClick={showModal}
      >
        <PlusCircleOutlined />
        <span>Create New Category</span>
      </Button>
      <div className="category-panel">
        <Category
          categories={props.categories}
          onDelete={onDelete}
          onEdit={onEdit}
        />
        <ModalComponent
          modalTitle={onEditRequest ? "Update Category" : "Create New Category"}
          okText={"Save"}
          visible={visible}
          onAction={onEditRequest ? onUpdate : onCreate}
          onCancel={closeModal}
        >
          {categoryForm}
        </ModalComponent>
      </div>
    </div>
  );
}

export default Categories;
