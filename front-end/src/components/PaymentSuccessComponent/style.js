import { CheckCircleFilled } from '@ant-design/icons';
import { Card, Typography } from 'antd';
import styled from 'styled-components';

const { Title, Text } = Typography;




export const WrapperContainerSuccess = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledCard = styled(Card)`
  max-width: 450px;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  .ant-card-body {
    padding: 24px;
  }
`;

export const SuccessIcon = styled(CheckCircleFilled)`
  font-size: 48px;
  color: #52c41a;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
`;

export const SupportText = styled(Text)`
  display: block;
  text-align: center;
  margin-top: 24px;
`;