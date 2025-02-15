import { Button, Divider, Space, Typography } from 'antd';
import React from 'react';
import { ButtonGroup, ErrorIcon, ErrorMessage, Header, InfoRow, StyledCard, SupportText, WrapperContainerFail } from './style';

const { Title, Text } = Typography;


const PaymentFailComponent = ({ orderData }) => {


    const defaultOrderData = {
    orderId: 'ORD123456',
    amount: 1500000,
    paymentDate: new Date().toLocaleString('vi-VN'),
    paymentMethod: 'VNPay',
    customerName: 'Nguyễn Văn A',
    errorCode: 'ERR_PAYMENT_24',
    errorMessage: 'Giao dịch bị hủy bởi người dùng'
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
    <WrapperContainerFail>
      <StyledCard>
        <Header>
          <Space direction="vertical" size={16}>
            <ErrorIcon />
            <Title level={3} style={{ margin: 0, color: '#ff4d4f' }}>
              Thanh toán thất bại!
            </Title>
            <Text type="secondary">
              Đã có lỗi xảy ra trong quá trình thanh toán
            </Text>
          </Space>
        </Header>

        <ErrorMessage>
          <Text type="danger">
            Mã lỗi: {order.errorCode}
            <br />
            Lý do: {order.errorMessage}
          </Text>
        </ErrorMessage>

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
          <Button type="primary" danger block>
            Thử lại
          </Button>
          <Button type="default" block>
            Chọn phương thức khác
          </Button>
          <Button type="link" block>
            Quay về trang chủ
          </Button>
        </ButtonGroup>

        <SupportText type="secondary">
          Nếu bạn đã bị trừ tiền, vui lòng liên hệ:{' '}
          <a href="tel:1900888888">1900 888 888</a>
          <br />
          hoặc gửi email về <a href="mailto:huynhvande2k2@gmail.com">support@example.com</a>
        </SupportText>
      </StyledCard>
    </WrapperContainerFail>
  );
};

export default PaymentFailComponent;