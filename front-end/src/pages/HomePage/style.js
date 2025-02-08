import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: flex-start;
  font-weight: 600;
  font-size: 16px;
  border-bottom: 1px solid rgb(182, 182, 182);
  height: 44px;
   margin-bottom: -6px; 
   color: rgb(110, 110, 112);
`;
export const WrapperTextHome = styled.div`
font-size: 20px;
  font-weight: 600;
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
  border-radius: 5px;
  border: 1px rgb(231, 231, 231) solid;
`;
export const WrapperBottonMore = styled(ButtonComponent)`
  border: 1px solid rgb(63, 113, 250);
  color: rgb(0, 69, 255);
  width: 440px;
  height: 38px;
  font-weight: 500;

  &:hover {
    background: rgb(209, 219, 223);
    span {
      color: rgb(0, 69, 255);
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
export const WrapperSlideProduct = styled.div`
  border: 1px solid rgb(231, 231, 231) ;
  border-radius: 5px;
`
export const SpaceFooter = styled.div`
  height: 20px;

`