import { Button, Card } from "antd";
import styled from "styled-components";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
export const CheckoutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`;
export const StyledCard = styled(Card)`
  margin-bottom: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;
export const OrderSummary = styled.div`
  background: #f5f5f5;
  padding: 24px;
  border-radius: 8px;
`;
export const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  color: ${props => props.$isTotal ? '#ff4842' : 'inherit'};
  font-weight: ${props => props.$isTotal ? 'bold' : 'normal'};
  font-size: ${props => props.$isTotal ? '16px' : '14px'};
`;
export const VatText = styled.div`
  text-align: right;
  font-size: 12px;
  color: #666;
  margin-top: 4px;
`;
export const DiscountNote = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 16px;
  font-style: italic;
`;
export const NavigationButtons = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 24px;
`;
export const WrapperBtnContinue = styled(Button)`
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
export const WrapperBtnBack = styled(Button)`
  background: transparent;
  color: #666;
  
  &:hover {
    background: transparent !important;
    color: #333 !important;
  }
`;