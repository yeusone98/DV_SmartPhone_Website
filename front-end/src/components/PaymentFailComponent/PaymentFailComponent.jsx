import { Button, Divider, Space, Typography, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { ButtonGroup, ErrorIcon, ErrorMessage, Header, InfoRow, StyledCard, SupportText, WrapperContainerFail } from './style';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { deleteOrderAPI, createPaymentVnPayAPI, getOrderByIdAPI } from '../../apis';
const { Title, Text } = Typography;


const PaymentFailComponent = ( ) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);

  // Lấy thông tin từ URL params
  const orderData = {
    orderId: searchParams.get('orderId'),
    orderNumber: searchParams.get('orderNumber'),
    amount: Number(searchParams.get('amount')),
    paymentDate: searchParams.get('paymentDate'),
    customerName: searchParams.get('customerName'),
    errorCode: searchParams.get('errorCode'),
    errorMessage: searchParams.get('errorMessage'),
    paymentMethod: 'VNPAY'
  };

  // Fetch chi tiết đơn hàng
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (orderData.orderId) {
        try {
          const response = await getOrderByIdAPI(orderData.orderId);
          setOrderDetails(response);
        } catch (error) {
          console.error('Lỗi khi lấy thông tin đơn hàng:', error);
        }
      }
    };
    fetchOrderDetails();
  }, [orderData.orderId]);

  // Xử lý thử lại thanh toán VNPAY
  const handleRetryPayment = async () => {
    try {
      const response = await createPaymentVnPayAPI({
        orderId: orderData.orderId,
        amount: orderData.amount
      });
      if (response.paymentUrl) {
        window.location.href = response.paymentUrl;
      } else {
        message.error('Không thể tạo lại thanh toán');
      }
    } catch (error) {
      console.error('Lỗi khi thử lại:', error);
      message.error('Thử lại thất bại, vui lòng thử lại sau');
    }
  };

  // Xử lý chọn phương thức khác
  const handleChooseOtherMethod = async () => {
    try {
      // Xóa đơn hàng hiện tại
      await deleteOrderAPI(orderData.orderId);
      
      // Chuyển hướng đến trang checkout với thông tin đã lưu
      navigate('/checkout', {
        state: {
          productItems: orderDetails.products.map(p => ({
            product_id: p.product_id,
            product_name: p.product_name,
            image_url: p.image_url,
            color: p.color,
            storage: p.storage,
            quantity: p.quantity,
            unit_price: p.unit_price
          })),
          totalPrice: orderDetails.total_price,
          shippingInfo: {
            fullName: orderDetails.full_name,
            phone: orderDetails.phone_number,
            province: orderDetails.province,
            district: orderDetails.district,
            ward: orderDetails.ward,
            address: orderDetails.address_detail
          }
        }
      });
    } catch (error) {
      console.error('Lỗi khi chọn phương thức khác:', error);
      message.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };


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
            Mã lỗi: {orderData.errorCode}
            <br />
            Lý do: {orderData.errorMessage}
          </Text>
        </ErrorMessage>

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
          <Button type="primary" danger block onClick={handleRetryPayment}>
            Thử lại
          </Button>
          <Button type="primary" block onClick={handleChooseOtherMethod}>
            Chọn phương thức khác
          </Button>
          <Button onClick={() => navigate('/')} 
            type="default" 
            block>
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