import styled from "styled-components";

export const WrapperFooterComponent = styled.footer`
  flex-shrink: 0;
  background-color: #efefef;
  padding: 40px 0;
  border-top: 1px solid #ddd;
  width: 100%;
`;

export const WrapperFooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
    text-align: center;
  }
`;

export const FooterSection = styled.div`
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
  text-align: center;
  padding: 10px;
  color: #666;
  margin-top: 20px;
`;

export const WrapperFooterIcon = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;
  font-size: 20px;
  justify-content: center;

  a {
    color: rgb(0, 89, 255);
    transition: opacity 0.2s;
    
    &:hover {
      opacity: 0.8;
    }
  }
`;
