import React from "react";
import "./Post.css";
import { Card } from "antd";
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";

const { Meta } = Card;

function Post(props) {
  return (
    <Card
      className="card-post"
      hoverable={true}
      actions={[
        <EditOutlined key="edit" onClick={() => console.log("clicked")} />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta title={props.post.title} description={props.post.description} />
    </Card>
  );
}

export default Post;
