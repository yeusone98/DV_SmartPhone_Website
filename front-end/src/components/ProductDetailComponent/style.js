import { Button, Col, Image, InputNumber, Rate } from "antd";
import styled from "styled-components";
import ButtonComponent from "../ButtonComponent/ButtonComponent";





// export const WrapperProductDetailPage = styled.div`
//     height: 150vh;
// `

//!1
export const WrapperProductDetailPage = styled.div`
  min-height: 100vh;
  height: auto;
  padding-bottom: 40px;
  overflow: visible;
`
export const WrapeerStyleImageSmall = styled(Image)`
  height: 64px;
  width: 64px;
  border: 1px rgb(196, 190, 190) solid;
  border-radius: 5px;
`;
export const WrapeerStyleImage = styled(Col)`
  flex-basis: unset;
  display: flex;
`;
export const WrapperNameStyleNameProduct = styled.div`
  color: rgb(36, 36, 36);
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
  word-break: break-word;
`;
export const WrapperTextSell = styled.span`
  font-size: 15px;
  line-height: 24px;
  color: rgb(120, 120, 120);
`;

export const WrapperPriceTextProduct = styled.div`
  font-size: 32x;
  font-weight: 500;
  color: #ff4842;
  margin: 3px 0 3px 0;
  font-weight: 400;
`;
export const WrapperPriceDiscountTextProduct = styled.span`
  font-size: 24px;
  color: rgb(128, 128, 137);
  text-decoration: line-through;
  margin-left: 10px;
  font-weight: 400;
`;

export const WrapperTextPolicy = styled.span`
  font-size: 16px;
  font-weight: 500;
  margin: 10px 0 5px 0;
`;
export const WrapperTextPolicySmall = styled.span`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: rgb(120, 120, 120);
`;
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
`;
export const WrapperQualityProduct = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  width: 110px;
  border-radius: 6px;
  border: 1px solid #919eab52;
`;

export const WrapperBtnQualityProduct = styled.button``;
export const WrapperInputNumber = styled(InputNumber)`
  &.ant-input-number.ant-input-number-sm {
    width: 30px;
  }
`;
export const WrapperTextOptionProduct = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin: 4px 0px;
`;
export const WrapperAddCartBuyNow = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 40px;
`;
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
    span {
      color: #000 !important;
    }
  }
`;
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
`;
// export const WrapperDetailInfoProduct = styled.div`
//   margin-top: 20px;
// `;

export const WrapperDetailInfoProduct = styled.div`
  position: relative;
  margin-top: 20px;
  margin-bottom: 40px;
  z-index: 1;
`;
export const WrapperBtnInfoProduct = styled(ButtonComponent)`
  font-size: 14px;
  font-weight: 600;
`;

//!aaaaaaaaaaaaaa

// export const WrapperReviews = styled.div`
//   margin-top: 20px;
//   padding: 20px;
//   background-color: #fff;
//   border-radius: 8px;
// `;
export const WrapperReviews = styled.div` 
  position: relative;
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
`;
export const ReviewHeader = styled.div`
  border: 1px rgb(231, 231, 231) solid;

  
`;
export const WrapperBtnWriteReview = styled(Button)`
  color: rgb(0, 69, 255);
  font-weight: 600;
  font-size: 15px;
`;
export const TextTitleReview = styled.h6`
  font-weight: 600;
  font-size: 16px;
  margin: 0;
  margin-top: 10px;

`
export const AverageRating = styled.h2`
  font-size: 48px;
  color: rgb(255, 72, 66);
  font-weight: 700;
  margin: 0;
`;
export const ViewTextRate = styled.p`
  color: rgb(99, 115, 129);
  font-size: 14px;
  margin:0;
  margin-bottom: 10px;
`;
export const SpaceReview = styled.div`
  height: 100%;
  border-left: 1px solid rgb(231, 231, 231);
  border-right: 1px solid rgb(231, 231, 231);
`
export const ReviewBody = styled.div`
  position: relative;
  border: 1px solid rgb(231, 231, 231);
`;


export const ReviewItem = styled.div`
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;
export const ReviewAuthor = styled(Image)`
  width: 10px;
  height:10px;
`;

export const ReviewContent = styled.div`
  margin-top: 5px;
  font-size: 14px;
  color: #555;
`;
export const HelpfulButton = styled(Button)`
  font-size: 12px;
  margin-top: 5px;
`;

//!======


// Styled Components
export const WrapperContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
`;

export const ProductSection = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 16px;
`;

export const ImageContainer = styled.div`
  border: 1px solid #919eab52;
  border-radius: 8px;
  padding-right: 30px;
`;

export const ProductTitle = styled.h1`
  color: rgb(36, 36, 36);
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
  word-break: break-word;
`;

export const PriceContainer = styled.div`
  margin: 16px 0;
`;

export const CurrentPrice = styled.span`
  font-size: 32px;
  color: #ff4842;
  font-weight: 500;
`;

export const OriginalPrice = styled.span`
  font-size: 24px;
  color: #808089;
  text-decoration: line-through;
  margin-left: 12px;
`;

export const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #919eab52;
  border-radius: 6px;
  width: 110px;
`;

export const QuantityButton = styled(Button)`
  border: none;
  padding: 0 8px;
  height: 32px;
  &:hover {
    background: transparent;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 20px;
`;

export const AddToCartButton = styled(Button)`
  width: 200px;
  background: rgb(255, 193, 7);
  &:hover {
    background: rgb(183, 129, 3) !important;
  }
`;

export const BuyNowButton = styled(Button)`
  width: 200px;
  background: rgb(0, 69, 255);
  &:hover {
    background: rgb(0, 39, 183) !important;
  }
`;

export const TabContainer = styled.div`
  position: relative;
  margin-top: 24px;

  > div:first-child {
    position: sticky;
    top: 0;
    background: white;
    z-index: 2;
    padding: 10px 0;
  }
`;

export const TabButton = styled(Button)`
  ${props => props.active && `
    color: #1890ff;
    border-bottom: 2px solid #1890ff;
  `}
  border-radius: 0;
  margin-right: 24px;
`;

export const ReviewCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  margin-top: 16px;
`;



export const ReviewerName = styled.span`
  margin-left: 8px;
  font-weight: 500;
  font-size: 14px;
`;

export const ReviewDate = styled.span`
  margin-left: 10px;
  color: #8c8c8c;
  font-size: 12px;
`;

export const VerifiedBadge = styled.span`
  background: #e6f7ff;
  color: #1890ff;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  margin-left: 12px;
`;

export const WrapperTabBtn = styled(TabButton)`
    font-size: 14px;
    font-weight: 600;

`
export const WrapperRateStar = styled(Rate)`
   &.ant-rate {
    font-size: 24px;
    
    .ant-rate-star:not(.ant-rate-star-full) .ant-rate-star-first,
    .ant-rate-star:not(.ant-rate-star-full) .ant-rate-star-second {
      color: #d9d9d9; 
    }
    
    .ant-rate-star-full .ant-rate-star-first,
    .ant-rate-star-full .ant-rate-star-second {
      color: rgb(241, 165, 0); 
    }

    .ant-rate-star:hover {
      transform: scale(1.1);
    }
  }
`
// export const WrapperSpecs = styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     max-width: 960px;
// `

export const WrapperSpecs = styled.div`
  position: relative;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  
  table {
    width: 100%;
    border-collapse: collapse;
    
    td {
      padding: 12px;
      vertical-align: top;
      word-break: break-word;
      
      &:first-child {
        width: 30%;
      }
    }
  }
`;

