import React from "react";
import { Button } from "antd";
import {
  PhoneOutlined,
  MessageOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { ButtonContainer, CircleButton, StyledButton } from "./style";

import messenger from "../../assets/images/messenger.png";
import telephone from "../../assets/images/telephone.png";
import zalo from "../../assets/images/zalo.png";
const ContactButtonComponent = () => {
  return (
    <ButtonContainer>
        <a href="https://m.me/61572796689433" target="_blank" rel="noopener noreferrer">
      <StyledButton 
        icon={
          <img
            style={{ height: "50px", width: "50px" }}
            src={messenger}
            alt="messenger"
          />
        }
        
      >
      </StyledButton>
      </a>
      <a href="tel:+848386838683">
      <StyledButton
        icon={
          <img
            style={{ height: "50px", width: "50px" }}
            src={telephone}
            alt="messenger"
          />
        }
        
      >
      </StyledButton>
      </a>
      <StyledButton
        icon={
          <img
            style={{ height: "50px", width: "50px" }}
            src={zalo}
            alt="zalo"
          />
        }
        
      >
      </StyledButton>
    </ButtonContainer>
  );
};

export default ContactButtonComponent;
