import { Card, Typography } from "antd";
import styled from "styled-components";

const { Title, Text } = Typography;
// Styled components
export const StyledCard = styled(Card)`
  margin-bottom: 10px;
`;

export const PageContainer = styled.div`
  padding: 24px;
  min-height: 100vh;
  padding: 20px 200px;
`;

export const WarningText = styled(Text)`
  display: block;
  margin-top: 8px;
  color: #ff4d4f;
`;