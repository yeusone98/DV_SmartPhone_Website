import styled from 'styled-components';
import { Card, Button, Typography, Space, Divider } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';


export const { Title, Text } = Typography;

// Styled Components
export const WrapperContainerFail = styled.div`
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

export const ErrorIcon = styled(CloseCircleFilled)`
  font-size: 48px;
  color: #ff4d4f;
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

export const ErrorMessage = styled.div`
  background-color: #fff2f0;
  border: 1px solid #ffccc7;
  border-radius: 4px;
  padding: 12px;
  margin: 16px 0;
`;

export const SupportText = styled(Text)`
  display: block;
  text-align: center;
  margin-top: 24px;
`;