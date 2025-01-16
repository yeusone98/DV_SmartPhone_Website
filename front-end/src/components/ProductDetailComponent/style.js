import { Col, Image, InputNumber } from "antd";
import styled from "styled-components";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

export const WrapeerStyleImageSmall = styled(Image)`
    height: 64px;
    width: 64px;
    border: 1px rgb(196, 190, 190) solid;
    border-radius: 5px;
`
export const WrapeerStyleImage = styled(Col)`
    flex-basis: unset;
    display: flex;
    
`
export const WrapperNameStyleNameProduct = styled.div`
    color: rgb(36, 36, 36);
    font-size: 24px;
    font-weight: 500;
    line-height: 32px;
    word-break: break-word;
`
export const WrapperTextSell= styled.span`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120, 120, 120);
`

export const WrapperPriceTextProduct = styled.div`
    font-size: 32x;
    font-weight: 500;
    color: #ff4842;
    margin: 3px 0 3px 0;
    font-weight: 400;
`
export const WrapperPriceDiscountTextProduct = styled.span`
    font-size: 24px;
    color: rgb(128,128,137);
    text-decoration: line-through;
    margin-left: 10px;
    font-weight: 400;
`

export const WrapperTextPolicy = styled.span`
    font-size: 16px;
    font-weight: 500;
    margin: 10px 0 5px 0;
`
export const WrapperTextPolicySmall = styled.span`
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: rgb(120, 120, 120);
`
export const WrapperIconContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(75, 73, 73, 0.1);
    text-align: center;
    margin-top: 10px;
`
export const WrapperQualityProduct = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
    width: 110px;
    border-radius: 6px;
    border: 1px solid #919eab52;
`

export const WrapperBtnQualityProduct = styled.button`

`
export const WrapperInputNumber = styled(InputNumber)`
    &.ant-input-number.ant-input-number-sm {
        width: 30px;
    }
`
export const WrapperTextOptionProduct= styled.div`
    font-size: 16px;
    font-weight: 500;
    margin: 4px 0px;
`
export const WrapperAddCartBuyNow = styled.div`
    display: flex;
    margin-top: 20px;
    gap: 40px;
`
export const WrapperButtonAddCart = styled(ButtonComponent)`
  width: calc(50%);
  padding: 10px 0;
  border-radius: 8px;
  background: rgb(255, 193, 7);
  color: #000;
  border: none;
  font-weight: 600;
  text-align: center;

  &:hover {
    background: rgb(183, 129, 3) !important;
    color: #000;
    span{
        color: #000 !important;
    }
  }
`
export const WrapperBtnBuyNow = styled(ButtonComponent)`
    width: calc(50%);
    padding: 10px 0;
    border-radius: 8px;
    background-color: rgb(0, 69, 255);
    color: #fff;
    border: none;
    font-weight: 600;
    text-align: center;
    &:hover {
        background: rgb(0, 39, 183) !important;
        color: #fff !important;
    }
`
export const WrapperDetailInfoProduct = styled.div`
    margin-top: 20px;
    
`
export const WrapperBtnInfoProduct = styled(ButtonComponent)`
    font-size: 14px;
    font-weight: 600;
`