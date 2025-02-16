import { Button } from "antd";
import styled from "styled-components";

export const ScrollButton = styled(Button)`
  position: fixed;
  bottom: 20px;
  right: 30px;
  width: 50px;
  min-width: 50px !important;
  height: 50px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #fff !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  opacity: ${props => props.$visible ? 1 : 0};
  pointer-events: ${props => props.$visible ? 'auto' : 'none'};
  z-index: 999;
  border: none;

  &:hover {
    background:rgb(221, 218, 218) !important;
    transform: translateY(-2px);
  }

  .anticon {
    font-size: 18px !important;
    color: #666;
  }
`;