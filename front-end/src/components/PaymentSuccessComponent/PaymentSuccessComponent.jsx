import React from 'react';
import styled from 'styled-components';
import { Card, Button, Typography, Space, Divider } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { ButtonGroup, Header, InfoRow, StyledCard, SuccessIcon, SupportText, WrapperContainerSuccess } from './style';

const { Title, Text } = Typography;


const PaymentSuccessComponent = ({ orderData }) => {
  // Default data if no order data provided
  const defaultOrderData = {
    orderId: 'ORD123456',
    amount: 1500000,
    paymentDate: new Date().toLocaleString('vi-VN'),
    paymentMethod: 'VNPay',
    customerName: 'Nguyễn Văn A',
  };

  const order = orderData || defaultOrderData;

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <WrapperContainerSuccess>
      <StyledCard>
        <Header>
          <Space direction="vertical" size={16}>
            <SuccessIcon />
            <Title level={3} style={{ margin: 0 }}>
              Thanh toán thành công!
            </Title>
            <Text type="secondary">
              Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi
            </Text>
          </Space>
        </Header>

        <Divider />

        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          <InfoRow>
            <Text type="secondary">Mã đơn hàng:</Text>
            <Text strong>{order.orderId}</Text>
          </InfoRow>
          
          <InfoRow>
            <Text type="secondary">Số tiền:</Text>
            <Text strong>{formatCurrency(order.amount)}</Text>
          </InfoRow>
          
          <InfoRow>
            <Text type="secondary">Thời gian:</Text>
            <Text strong>{order.paymentDate}</Text>
          </InfoRow>
          
          <InfoRow>
            <Text type="secondary">Phương thức:</Text>
            <Text strong>{order.paymentMethod}</Text>
          </InfoRow>
          
          <InfoRow>
            <Text type="secondary">Khách hàng:</Text>
            <Text strong>{order.customerName}</Text>
          </InfoRow>
        </Space>

        <ButtonGroup>
          <Button type="default" block>
            Xem chi tiết đơn hàng
          </Button>
          <Button type="primary" block>
            Tiếp tục mua sắm
          </Button>
        </ButtonGroup>

        <SupportText type="secondary">
          Mọi thắc mắc xin vui lòng liên hệ:{' '}
          <a href="tel:1900000000">1900 000 000</a>
        </SupportText>
      </StyledCard>
    </WrapperContainerSuccess>
  );
};

export default PaymentSuccessComponent;