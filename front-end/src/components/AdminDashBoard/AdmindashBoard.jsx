import React, { useState } from 'react';
import styled from 'styled-components';
import { Layout, Menu, Card, Table, Typography, Input, Badge, Avatar, Space, Statistic } from 'antd';
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  InboxOutlined,
  BellOutlined,
  SettingOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import OrderManagement from '../OrderMangagerComponent/OrderManagerComponent';

const { Header, Sider, Content } = Layout;

// Styled Components
const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

const StyledSider = styled(Sider)`
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

const StyledHeader = styled(Header)`
  background: white;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  width: calc(100% - 200px);
  z-index: 1;
`;

const StyledContent = styled(Content)`
  margin: 88px 24px 24px;
  overflow: initial;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 24px;
`;

const ChartCard = styled(Card)`
  margin-bottom: 24px;
`;

// Sample Data
const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
];

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('1');

  const renderContent = () => {
    switch (selectedMenu) {
      case '1':
        return (
          <>
            <StatsContainer>
              <Card>
                <Statistic
                  title="Total Revenue"
                  value={45231}
                  precision={2}
                  prefix="$"
                  suffix={<small style={{ color: '#3f8600' }}>+20.1%</small>}
                />
              </Card>
              <Card>
                <Statistic
                  title="Total Orders"
                  value={1205}
                  prefix={<ShoppingCartOutlined />}
                  suffix={<small style={{ color: '#3f8600' }}>+12.5%</small>}
                />
              </Card>
              <Card>
                <Statistic
                  title="Total Customers"
                  value={3456}
                  prefix={<UserOutlined />}
                  suffix={<small style={{ color: '#3f8600' }}>+8.2%</small>}
                />
              </Card>
              <Card>
                <Statistic
                  title="Total Products"
                  value={85}
                  prefix={<InboxOutlined />}
                  suffix={<small style={{ color: '#3f8600' }}>+5.4%</small>}
                />
              </Card>
            </StatsContainer>

            <ChartCard title="Sales Overview">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#1890ff" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </>
        );
      case '3':
        return <OrderManagement />;
      default:
        return <div>Coming soon...</div>;
    }
  };

  return (
    <StyledLayout>
      <StyledSider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">Phone Store</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          selectedKeys={[selectedMenu]}
          onClick={({ key }) => setSelectedMenu(key)}
          items={[
            { key: '1', icon: <DashboardOutlined />, label: 'Dashboard' },
            { key: '2', icon: <InboxOutlined />, label: 'Products' },
            { key: '3', icon: <ShoppingCartOutlined />, label: 'Orders' },
            { key: '4', icon: <UserOutlined />, label: 'Customers' },
          ]}
        />
      </StyledSider>
      
      <Layout>
        <StyledHeader>
          <Input prefix={<SearchOutlined />} placeholder="Search..." style={{ width: 200 }} />
          <Space size="large">
            <Badge count={5}>
              <BellOutlined style={{ fontSize: 20 }} />
            </Badge>
            <SettingOutlined style={{ fontSize: 20 }} />
            <Avatar icon={<UserOutlined />} />
          </Space>
        </StyledHeader>
        
        <StyledContent>
          {renderContent()}
        </StyledContent>
      </Layout>
    </StyledLayout>
  );
};

export default AdminDashboard;
