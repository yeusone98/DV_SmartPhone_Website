import { Button } from "antd";
import styled from "styled-components";

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
  margin: 16px 0;
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
  margin-top: 24px;
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

export const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

export const ReviewerName = styled.span`
  margin-left: 8px;
  font-weight: 500;
`;

export const ReviewDate = styled.span`
  margin-left: auto;
  color: #8c8c8c;
`;

export const VerifiedBadge = styled.span`
  background: #e6f7ff;
  color: #1890ff;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  margin-left: 12px;
`;