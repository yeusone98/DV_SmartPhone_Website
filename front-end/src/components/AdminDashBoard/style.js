import { Card, Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import styled from "styled-components";

export const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

export const StyledSider = styled(Sider)`
  .ant-layout-sider-children {
    position: fixed;
    width: 200px;
    height: 100vh;
  }
  
  .logo {
    height: 32px;
    margin: 16px;
    color: white;
    font-size: 18px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const StyledHeader = styled(Header)`
  background: white;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  width: calc(100% - 200px);
  z-index: 1;
`;

export const StyledContent = styled(Content)`
  margin: 88px 24px 24px;
  overflow: initial;
`;

export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 24px;
`;

export const ChartCard = styled(Card)`
  margin-bottom: 24px;
`;