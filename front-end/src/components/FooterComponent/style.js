import { Col, Row } from "antd";
import styled from "styled-components";

export const WrapperFooterComponent = styled.footer`
  flex-shrink: 0;
  background-color: #efefef;
  padding: 40px 0;
  border-top: 1px solid #ddd;
  width: 100%;
  
  @media (min-width: 1200px) {
    min-width: fit-content;
  }
`;

export const WrapperFooterContent = styled(Row)`
  margin: 0 120px;
  
  @media (max-width: 1200px) {
    margin: 0 40px;
  }
  
  @media (max-width: 768px) {
    margin: 0 20px;
  }
`;

export const FooterSection = styled(Col)`
  h3 {
    margin-bottom: 16px;
    font-size: 16px;
    font-weight: 500;
  }
  
  p {
    margin-bottom: 8px;
    font-size: 14px;
  }
`;

export const FooterLink = styled.a`
  display: block;
  color: #000;
  margin: 5px 0;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

export const FooterCopyRight = styled.div`
  font-size: 12px;
  text-align: left;
  padding: 10px;
  color: #666;
  margin-top: 20px;
  
  @media (min-width: 768px) {
    padding: 10px 120px;
  }
`;

export const WrapperFooterIcon = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 10px;
  font-size: 20px;
  
  a {
    color: rgb(0, 89, 255);
    transition: opacity 0.2s;
    
    &:hover {
      opacity: 0.8;
    }
  }
`;
