import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import React from "react";

const ButtonInputSearch = (props) => {
  const { size, placeholder, textButton } = props;
  return (
    <div style={{ display: "flex", backgroundColor: "#fff" }}>
      <Input size={size} variant="borderless" placeholder={placeholder} />
      <Button type="text" size={size} icon={<SearchOutlined />}>
        {textButton}
      </Button>
    </div>
  );
};

export default ButtonInputSearch;
