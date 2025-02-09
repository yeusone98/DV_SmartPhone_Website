import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperContainer = styled.div`
  max-width: 1200px;
  padding: 0 12%;
  margin: 0 auto;
  background-color: #efefef;
  overflow: hidden;
`;

export const WrapperTypeProduct = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  font-size: 16px;
  height: auto;
  padding: 10px;
  color: rgb(92, 92, 95);
`;

export const WrapperTextTitleProduct = styled.div`
  display: flex;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(75, 73, 73, 0.1);
  margin: 10px 0;
  padding: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  justify-content: center;
  border-radius: 5px;
  border: 1px solid rgb(231, 231, 231);
  padding: 10px;
  max-width: 100%;
  width: 100%; /* Giữ nó trong phạm vi phần tử cha */
  box-sizing: border-box; /* Đảm bảo padding không làm tràn */

  @media (min-width: 1200px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: 1199px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;



export const WrapperBottonMore = styled(ButtonComponent)`
  border: 1px solid rgb(63, 113, 250);
  color: rgb(0, 69, 255);
  width: 100%;
  max-width: 240px;
  height: 38px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;

  &:hover {
    background: rgb(209, 219, 223);
    span {
      color: rgb(0, 69, 255);
    }
  }
`;

export const SpaceFooter = styled.div`
  height: 20px;
`;
export const WrapperSlideProducts = styled.div`
  border-radius: 5px;
`;