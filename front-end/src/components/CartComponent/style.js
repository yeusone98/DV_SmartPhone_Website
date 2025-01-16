import { Button, Table } from "antd";
import styled from "styled-components";

export const WrapperCartComponent = styled.div`
  margin: 0 300px;
  padding-bottom: 240px;
`;
export const SummaryContainer = styled.div`
  margin-top: 7px;
  padding: 20px 20px;
  text-align: right;
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) 0px 16px 32px -4px;
  
`;
export const WrapperStyleTable = styled(Table)`
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) 0px 16px 32px -4px;
  overflow: hidden;
  
`

export const StyledButton = styled(Button)`
  margin-top: 10px;
  margin-right: 10px;
`;

export const WrapperTextCartSmall = styled.div`
  font-size: 16px;
  font-weight: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  font-size: 16px;
  font-weight: 600;
`;

export const TotalAmount = styled.span`
  font-size: 20px;
  color: red;
`;

export const WrapperNote = styled.div`
  font-size: 12px;
  color: #888;
  font-style: italic;
  font-weight: 400;
`;

export const ContinueButton = styled(Button)`
  background: none;
  border: none;
  color: rgb(33, 43, 53);
  font-size: 16px;
  font-weight: 600;
  &:hover {
    color: rgb(12, 110, 209) !important;
  }
`;

export const CheckoutButton = styled(Button)`
  background-color:rgb(0, 69, 255);
  color: white;
  font-weight: 600;
  &:hover {
    background-color:rgb(56, 150, 228);
  }
`;
export const WrapperTextCartMidde = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: rgb(99, 115, 129);
`;
export const WrapperTextPrice = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

