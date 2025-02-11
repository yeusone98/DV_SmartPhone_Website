import { Card } from "antd";
import styled from "styled-components";

// export const WrapperCardStyle = styled(Card)`
//     width: 200px;
//     & img {
//         margin-top: 10px;
//         height: 200px;
//         width: 200px;
//     }
// `
export const WrapperCardStyle = styled(Card)`

  width: 100%;
  max-width: 200px; 
  height: 360px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border: 1px solid rgb(230, 224, 224);
  & img {
    margin-top: 10px;
    max-width: 100%;
    height: auto;
    max-height: 200px;
    object-fit: contain; 
  }
`;

export const StyleNameProduct = styled.div`
  font-weight: 400;
  font-size: 15px;
  line-height: 1.2;
  color: rgb(56,56,61);
  word-wrap: break-word;
  max-width: 100%;
  overflow: hidden;
`;
export const WrapperReportText = styled.div`
    font-size: 12px;
    color: rgb(128,128,137);
    display: flex;
    align-items: center;
    margin-top: 5px;
`
export const WrapperPriceText = styled.div`
  font-size: 17px;
  font-weight: 500;
  color: rgb(0, 69, 255);
  margin: 3px 0;
  display: flex;
  flex-direction: column; /* Xếp giá theo cột */
`;
export const WrapperPriceDiscountText = styled.div`
  font-size: 13px;
  color: rgb(128,128,137);
  text-decoration: line-through;
  margin-top: 2px; /* Thêm khoảng cách để tránh bị cắt */
  white-space: nowrap; /* Tránh bị ngắt giữa dòng */
`;
export const WrapperDiscoutHeader = styled.div`
  display: inline-block;
  background-color: #ff424e; 
  color: white;
  font-size: 14px;
  font-weight: bold;
  padding: 1px 3px;
  border-radius: 4px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
`