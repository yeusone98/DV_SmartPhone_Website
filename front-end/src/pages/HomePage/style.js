import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  justify-content: flex-start;
  font-weight: 600;
  font-size: 15px;
  border-bottom: 1px solid rgb(182, 182, 182);
  height: 44px;
`;

export const WrapperProductList = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding: 16px;
`;
export const WrapperProductListCetegory = styled.div`
  height: 22px;
  min-width: 22px;
  line-height: 22px;
  border-radius: 8px;
  align-items: center;
  white-space: nowrap;
  display: inline-flex;
  justify-content: center;
  padding: 0px 8px;
  color: rgb(12, 83, 183);
  background-color: rgba(24, 144, 255, 0.16);
  font-weight: 700;
  margin-left: 5px;
  font-size: 12px;
  display: inline-block;
  top: 0;
  left: 0;
`;
export const WrapperProducts = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
`;
export const WrapperBottonMore = styled(ButtonComponent)`
  border: 1px solid rgb(63, 113, 250);
  color: rgb(0, 69, 255);
  width: 240px;
  height: 38px;
  font-weight: 500;

  &:hover {
    background: rgb(86, 131, 255);
    color: #fff;
    span {
      color: #fff;
    }
  }
`;
export const WrapperTextTitleProduct = styled.div`
  display: flex;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(75, 73, 73, 0.1);
  margin-top:10px;
  margin-bottom: 10px;
`;
