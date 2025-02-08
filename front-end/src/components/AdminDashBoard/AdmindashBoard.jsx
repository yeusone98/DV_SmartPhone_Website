import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Layout, Menu, Card, Typography, Input, Badge, Avatar, Space, Statistic, Dropdown, message } from 'antd';
import { DashboardOutlined, ShoppingCartOutlined, UserOutlined, InboxOutlined, BellOutlined, SettingOutlined, SearchOutlined, LogoutOutlined } from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import OrderManagement from '../OrderMangagerComponent/OrderManagerComponent';
import CustomerManagagerComponent from '../CustomerManagagerComponent/CustomerManagagerComponent';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectCurrentUser } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import ProductManagement from '../ProductManagerComponent/ProductManagerComponent';
import { fetchDashboardDataAPI } from '../../apis'; // Import API call

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
  const [collapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('1');
  const [dashboardData, setDashboardData] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser); // Lấy user từ Redux

  // Gọi dữ liệu dashboard
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await fetchDashboardDataAPI();
        setDashboardData(data);
      } catch (error) {
        message.error('Lỗi khi tải dữ liệu tổng quan!');
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    // Xóa cookies chứa token
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');

    // Xóa user trong Redux
    dispatch(logout());

    // Hiển thị thông báo và chuyển hướng về trang login
    message.success('Đăng xuất thành công!');
    navigate('/login');
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="logout" onClick={handleLogout} style={{ color: 'red', alignItems: 'center', justifyContent: 'center' }}>
        Đăng xuất
        <LogoutOutlined style={{ marginLeft: '5px' }} />
      </Menu.Item>
    </Menu>
  );

  const renderContent = () => {
    switch (selectedMenu) {
      case '1':
        return (
          <>
            <StatsContainer>
              <Card>
                <Statistic
                  title="Total Revenue"
                  value={dashboardData.totalRevenue}
                  suffix="đ"
                />
              </Card>
              <Card>
                <Statistic
                  title="Total Orders"
                  value={dashboardData.totalOrders}
                  prefix={<ShoppingCartOutlined />}
                />
              </Card>
              <Card>
                <Statistic
                  title="Total Customers"
                  value={dashboardData.totalCustomers}
                  prefix={<UserOutlined />}
                />
              </Card>
              <Card>
                <Statistic
                  title="Total Products"
                  value={dashboardData.totalProducts}
                  prefix={<InboxOutlined />}
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
      case '2':
        return <ProductManagement />;
      case '3':
        return <OrderManagement />;
      default:
        return <CustomerManagagerComponent />;
    }
  };

  return (
    <StyledLayout>
      <StyledSider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">VDSTORE</div>
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

            <Dropdown overlay={userMenu} trigger={['click']}>
              <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <Avatar icon={<UserOutlined />} style={{ marginRight: '8px' }} />
                <Typography.Text>{currentUser?.displayName || 'User'}</Typography.Text>
              </div>
            </Dropdown>
          </Space>
        </StyledHeader>

        <StyledContent>{renderContent()}</StyledContent>
      </Layout>
    </StyledLayout>
  );
};

export default AdminDashboard;
