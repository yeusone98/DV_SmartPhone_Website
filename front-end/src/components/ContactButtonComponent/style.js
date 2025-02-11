import { Button } from "antd";
import styled from "styled-components";

export const ButtonContainer = styled.div`
  position: fixed;
  right: 40px;
  bottom: 100px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StyledButton = styled(Button)`
    width: 100%;
    height: 100%;
    font-weight: bold;
    background-color: transparent;
    border: none;
`;
