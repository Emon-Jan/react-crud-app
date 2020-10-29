import React from "react";
import { Card, Button, List } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const Category = ({ categories, onDelete, onEdit }) => {
  return (
    <Card className="card-category" title="Categories">
      <List
        dataSource={categories}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button
                type="link"
                key="item"
                onClick={() => onEdit(item, index)}
              >
                <EditOutlined />
              </Button>,
              <Button
                type="link"
                key="item"
                onClick={() => onDelete(item, index)}
              >
                <DeleteOutlined />
              </Button>,
            ]}
          >
            {item}
          </List.Item>
        )}
      />
    </Card>
  );
};

export default Category;
