import { SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

const ButtonComponent = ({
  size,
  styleButton,
  styleTextButton,
  textButton,
  ...rests
}) => {
  return (   
    <Button size={size} {...rests}>
      <span style={styleTextButton}>{textButton}</span>
    </Button>
  );
};

export default ButtonComponent;
