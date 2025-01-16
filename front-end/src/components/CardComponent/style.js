import { Card } from "antd";
import styled from "styled-components";

export const WrapperCardStyle = styled(Card)`
    width: 200px;
    & img {
        margin-top: 10px;
        height: 200px;
        width: 200px;
    }
`

export const StyleNameProduct = styled.div`
    font-weight: 400;
    font-size: 15px;
    line-height: 16px;
    color: rgb(56,56,61)
`
export const WrapperReportText = styled.div`
    font-size: 12px;
    color: rgb(128,128,137);
    display: flex;
    align-items: center;
`
export const WrapperPriceText = styled.div`
    font-size: 17px;
    font-weight: 500;
    color: rgb(0, 69, 255);
    margin: 3px 0 3px 0;
`
export const WrapperPriceDiscountText = styled.div`
    font-size: 13px;
    color: rgb(128,128,137);
    text-decoration: line-through;
`
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