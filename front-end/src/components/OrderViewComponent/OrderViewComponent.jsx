import React, { useState } from 'react';
import { Table, Card, Row, Col, Typography, Tag, Descriptions, Space, Button, Modal, message } from 'antd';
import { ShoppingCartOutlined, ExclamationCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { PageContainer, StyledCard,WarningText } from './style';
import styled from 'styled-components';

const { Title, Text } = Typography;



const OrderViewComponent = () => {
  const [orderStatus, setOrderStatus] = useState('Processing');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Mock data for demonstration
  const orderInfo = {
    orderId: "ORD-2024-001",
    orderDate: "2024-02-08",
    status: orderStatus,
    customer: {
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      phone: "0123456789",
      address: "123 Đường ABC, Quận 1, TP.HCM"
    },
    payment: {
      method: "Credit Card",
      status: "Paid",
      total: "1,500,000 VNĐ"
    }
  };

  const orderItems = [
    {
      key: '1',
      product: 'iPhone 13',
      price: '20,000,000 VNĐ',
      quantity: 1,
      total: '20,000,000 VNĐ'
    },
    {
      key: '2',
      product: 'Airpods Pro',
      price: '5,000,000 VNĐ',
      quantity: 2,
      total: '10,000,000 VNĐ'
    }
  ];

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total',
      key: 'total',
    }
  ];

  const getStatusColor = (status) => {
    const statusMap = {
      Processing: 'blue',
      Completed: 'green',
      Cancelled: 'red'
    };
    return statusMap[status] || 'default';
  };

  // Các hàm xử lý modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setOrderStatus('Cancelled');
    setIsModalOpen(false);
    message.success('Đơn hàng đã được hủy thành công');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Component hiển thị nút hủy đơn hàng
  const CancelOrderButton = () => {
    if (orderStatus === 'Processing') {
      return (
        <Button danger  onClick={showModal} icon={<ExclamationCircleOutlined />}>
          
          Hủy đơn hàng
        </Button>
      );
    }
    return null;
  };

  return (
    <PageContainer>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Title style={{lineHeight:0, marginTop:0}} level={4}>
          <Space>
            <ShoppingCartOutlined />
            Chi tiết đơn hàng
          </Space>
        </Title>
        <CancelOrderButton />
      </Row>

      {/* Modal xác nhận hủy đơn hàng */}
      <Modal
        title={
          <Space>
            <WarningOutlined style={{ color: '#ff4d4f' }} />
            Xác nhận hủy đơn hàng
          </Space>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Xác nhận hủy"
        cancelText="Đóng"
        okButtonProps={{ danger: true }}
        centered
        width={500}
      >
        <div>
          <Text>Bạn có chắc chắn muốn hủy đơn hàng #{orderInfo.orderId}?</Text>
          <WarningText>
            <ul>
              <li>Đơn hàng sẽ bị hủy vĩnh viễn</li>
              <li>Nếu đã thanh toán, quá trình hoàn tiền có thể mất 5-7 ngày làm việc</li>
              <li>Hành động này không thể hoàn tác sau khi thực hiện</li>
            </ul>
          </WarningText>
        </div>
      </Modal>

      <StyledCard>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Descriptions title="Thông tin đơn hàng" bordered>
              <Descriptions.Item label="Mã đơn hàng" span={3}>
                {orderInfo.orderId}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày đặt hàng" span={3}>
                {orderInfo.orderDate}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái" span={3}>
                <Tag color={getStatusColor(orderStatus)}>
                  {orderStatus}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={12}>
            <Descriptions title="Thông tin khách hàng" bordered>
              <Descriptions.Item label="Tên" span={3}>
                {orderInfo.customer.name}
              </Descriptions.Item>
              <Descriptions.Item label="Email" span={3}>
                {orderInfo.customer.email}
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại" span={3}>
                {orderInfo.customer.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ" span={3}>
                {orderInfo.customer.address}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </StyledCard>

      <StyledCard title="Chi tiết sản phẩm">
        <Table
          columns={columns}
          dataSource={orderItems}
          pagination={false}
          summary={pageData => {
            const total = pageData.reduce((sum, item) => sum + parseFloat(item.total.replace(/[^0-9.-]+/g,"")), 0);
            return (
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={3}>
                  <strong>Tổng cộng</strong>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  <strong>{total.toLocaleString()} VNĐ</strong>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            );
          }}
        />
      </StyledCard>

      <StyledCard>
        <Descriptions title="Thông tin thanh toán" bordered>
          <Descriptions.Item label="Phương thức thanh toán" span={3}>
            {orderInfo.payment.method}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái thanh toán" span={3}>
            <Tag color={orderInfo.payment.status === 'Paid' ? 'green' : 'red'}>
              {orderInfo.payment.status}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Tổng thanh toán" span={3}>
            <strong>{orderInfo.payment.total}</strong>
          </Descriptions.Item>
        </Descriptions>
      </StyledCard>
    </PageContainer>
  );
};

export default OrderViewComponent;