import React from "react";
import { Card, Tag, Row, Col } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./Post.css";

const { Meta } = Card;

function Post(props) {
  const tags = props.post.category.map((t, index) => (
    <Tag className="tag-name" key={index}>
      {t}
    </Tag>
  ));

  return (
    <Card
      className="card-post"
      hoverable={true}
      actions={[
        <EditOutlined
          key="edit"
          onClick={() => props.onEditPost(props.index)}
        />,
        <DeleteOutlined
          key="delete"
          onClick={() => {
            props.onDeletePost(props.index);
          }}
        />,
      ]}
    >
      <Row gutter={16}>
        <Col span={16}>
          <Meta title={props.post.title} description={props.post.description} />
        </Col>
        <Col span={4}>
          <Card bordered={false}>
            <Meta title="Category" style={{ padding: "0 0 5px 0" }}></Meta>
            {tags}
          </Card>
        </Col>
      </Row>
    </Card>
  );
}

export default Post;
