import React, { useState } from 'react';
import { Table, Card, Row, Col, Typography, Tag, Descriptions, Space, Button, Modal, message } from 'antd';
import { ShoppingCartOutlined, ExclamationCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { PageContainer, StyledCard,WarningText } from './style';
import styled from 'styled-components';

const { Title, Text } = Typography;



const OrderViewComponent = ({ orderData }) => {
  const [orderStatus, setOrderStatus] = useState('Processing');
  
  // Mock data for demonstration
  const orderInfo = {
    orderId: orderData.orderId,
    orderDate: orderData.orderDate,
    customer: {
      name: orderData.customer.name,
      phone: orderData.customer.phone,
      address: orderData.customer.address
    },
    payment: {
      method: orderData.payment.method,
      status: orderData.payment.status,
      total: orderData.payment.total
    }
  };

  const orderItems = orderData.items?.map((item, index) => ({
    key: item.key,
    product: item.product,
    price: item.price,
    quantity: item.quantity,
    total: item.total
  })) || [];

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



  return (
    <PageContainer>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Title style={{lineHeight:0, marginTop:0}} level={4}>
          <Space>
            <ShoppingCartOutlined />
            Chi tiết đơn hàng
          </Space>
        </Title>
      </Row>

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
              <Tag 
                color={
                  orderInfo.payment.status === 'Pending' ? 'yellow' :
                  orderInfo.payment.status === 'Paid' ? 'green' :
                  orderInfo.payment.status === 'Failed' ? 'red' :
                  orderInfo.payment.status === 'Confirmed' ? 'blue' :
                  orderInfo.payment.status === 'Completed' ? 'lime' :
                  orderInfo.payment.status === 'Cancel' ? 'gray' :
                  'default' 
                }
              >
                {orderInfo.payment.status}
              </Tag>
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={12}>
            <Descriptions title="Thông tin khách hàng" bordered>
              <Descriptions.Item label="Tên" span={3}>
                {orderInfo.customer.name}
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
          <Descriptions.Item label="Tổng thanh toán" span={3}>
            <strong>{orderInfo.payment.total}</strong>
          </Descriptions.Item>
        </Descriptions>
      </StyledCard>
    </PageContainer>
  );
};

export default OrderViewComponent;