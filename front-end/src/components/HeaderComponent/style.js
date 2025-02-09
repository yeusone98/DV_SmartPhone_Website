import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
  max-width: 1700px;
  width: 100%;
  padding: 10px 10%;
  margin: 0 auto;
  background-color: rgb(22, 98, 240);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  box-sizing: border-box;

  @media (max-width: 992px) {
    padding: 10px 5%;
  }

  @media (max-width: 768px) {
    padding: 10px;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const WrapperHeaderAccount = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  gap: 10px;
  font-size: 12px;
`;

export const WrapperTextHeaderSmall = styled.span`
  font-size: 15px;
  color: #fff;
  white-space: nowrap;
`;

export const MobileMenuIcon = styled.div`
  display: none;
  font-size: 24px;
  color: white;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const WrapperLogo = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const WrapperSearch = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    display: none; /* Ẩn thanh tìm kiếm trên mobile */
  }
`;

export const WrapperAccountCart = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  gap: 15px;

  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
    margin-top: 10px;
  }
`;
