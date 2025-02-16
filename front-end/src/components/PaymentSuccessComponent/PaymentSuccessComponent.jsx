import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, Button, Typography, Space, Divider } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { ButtonGroup, Header, InfoRow, StyledCard, SuccessIcon, SupportText, WrapperContainerSuccess } from './style';
import { useNavigate, useSearchParams } from 'react-router-dom';

const { Title, Text } = Typography;


const PaymentSuccessComponent = ( ) => {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Lấy orderId từ URL parameters
  const orderId = searchParams.get('orderId');
  
  // Thông tin đơn hàng từ URL parameters
  const orderData = {
    orderNumber: searchParams.get('orderNumber'),
    amount: Number(searchParams.get('amount')),
    paymentDate: searchParams.get('paymentDate'),
    paymentMethod: searchParams.get('paymentMethod'),
    customerName: searchParams.get('customerName')
  };

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
            <Text strong>{orderData.orderNumber}</Text>
          </InfoRow>
          
          <InfoRow>
            <Text type="secondary">Số tiền:</Text>
            <Text strong>{formatCurrency(orderData.amount)}</Text>
          </InfoRow>
          
          <InfoRow>
            <Text type="secondary">Thời gian:</Text>
            <Text strong>{orderData.paymentDate}</Text>
          </InfoRow>
          
          <InfoRow>
            <Text type="secondary">Phương thức:</Text>
            <Text strong>{orderData.paymentMethod}</Text>
          </InfoRow>
          
          <InfoRow>
            <Text type="secondary">Khách hàng:</Text>
            <Text strong>{orderData.customerName}</Text>
          </InfoRow>
        </Space>

        <ButtonGroup>
          <Button 
            onClick={() => navigate(`/orders/order-view/${orderId}`)} 
            type="default" 
            block
          >
            Xem chi tiết đơn hàng
          </Button>
          <Button 
            onClick={() => navigate('/')} 
            type="primary" 
            block
          >
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