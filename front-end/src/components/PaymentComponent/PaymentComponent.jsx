import { CheckOutlined, CreditCardOutlined, HomeOutlined, LeftOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Radio, Row, Select, Steps, message } from 'antd';
import { useLocation } from "react-router-dom";
import React, { useState } from 'react';
import bank_transfer from '../../assets/images/bank.png';
import cod_icon from '../../assets/images/cod_icon.png';
import qr_code from '../../assets/images/qr_code.png';
import vnpay_icon from '../../assets/images/vnpay.png';
import { CheckoutContainer, DiscountNote, NavigationButtons, OrderSummary, PriceRow, StyledCard, VatText, WrapperBtnBack, WrapperBtnContinue } from './style';
import { placeOrderAPI, fetchCartAPI } from '../../apis';


const PaymentComponent = () => {
  const location = useLocation();
  const { cartItems, totalPrice } = location.state;
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('COD');

  const steps = [
    { title: 'Shipping', icon: <HomeOutlined /> },
    { title: 'Payment', icon: <CreditCardOutlined /> },
    { title: 'Confirmation', icon: <CheckOutlined /> }
  ];

  // Xử lý chuyển bước
  const handleNextStep = async () => {
    if (current === 0) {
      try {
        // Validate form thông tin vận chuyển
        const values = await form.validateFields();
        setShippingInfo(values);
        setCurrent(1);
      } catch (error) {
        console.error('Validation Failed:', error);
      }
    } else if (current === 1) {
      // Chuyển sang xử lý thanh toán
      handleSubmitOrder();
    }
  };

  // Xử lý đặt hàng
  const handleSubmitOrder = async () => {
    if (!paymentMethod) {
      message.error('Vui lòng chọn phương thức thanh toán');
      return;
    }

    try {
      // Tạo dữ liệu đơn hàng
      const orderData = {
        province: shippingInfo.province,
        district: shippingInfo.district,
        ward: shippingInfo.ward,
        address_detail: shippingInfo.address, 
        full_name: shippingInfo.fullName,    
        phone_number: shippingInfo.phone,   
        paymentMethod,
        products: cartItems.map(item => ({
          product_id: item.product_id,
          product_name: item.product_name,
          image_url: item.image_url,
          color: item.color,
          storage: item.storage,
          quantity: item.quantity,
          unit_price: item.unit_price,
          total_price_per_product: item.unit_price * item.quantity
        })),
        total_price: totalPrice
      };
      console.log("Order Data to Send:", orderData);
      // Gọi API đặt hàng
      const response = await placeOrderAPI(orderData);

      // Kiểm tra phản hồi từ API
      if (response && response.message === "Đặt hàng thành công!") {
        await fetchCartAPI(); // Load lại giỏ hàng
        message.success('Đặt hàng thành công!');
        setCurrent(2);
      } else {
        message.error(response?.message || 'Có lỗi xảy ra khi đặt hàng');
      }
    } catch (error) {
      console.error('Order Error:', error);
      message.error('Đặt hàng thất bại, vui lòng thử lại!');
    }
};


  const renderShippingForm = () => (
    <Form form={form} layout="vertical">
      <Form.Item label="Họ và tên" name="fullName" rules={[{ required: true, message: 'Vui lòng nhập tên của bạn' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Số điện thoại" name="phone" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại của bạn' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Tỉnh/Thành phố" name="province" rules={[{ required: true, message: 'Vui lòng nhập thành phố' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Quận/Huyện" name="district" rules={[{ required: true, message: 'Vui lòng nhập quận/huyện' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Phường/Xã" name="ward" rules={[{ required: true, message: 'Vui lòng nhập phường/xã' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Địa chỉ cụ thể" name="address" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ cụ thể' }]}>
        <Input />
      </Form.Item>
    </Form>
  );

  const renderPaymentForm = () => (
        <Form form={form} layout="vertical">
        <Form.Item label="Phương thức thanh toán" required>
          <Radio.Group 
            value={paymentMethod} 
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
          <Radio.Button value="COD" style={{ width: '100%', height: '50px', display: 'flex', alignItems: 'center', padding: '0 16px' }}>
            Thanh toán khi nhận hàng (COD)
          </Radio.Button>
          <Radio.Button value="Banking" style={{ width: '100%', height: '50px', display: 'flex', alignItems: 'center', padding: '0 16px' }}>
            Thanh toán qua ngân hàng
          </Radio.Button>
        </Radio.Group>
      </Form.Item>
      {paymentMethod === 'Banking' && (
        <div>
          <h4>Thông tin chuyển khoản</h4>
          <p>Ngân hàng: MB Bank</p>
          <p>Số tài khoản: 5320109082002</p>
          <p>Chủ tài khoản: Huỳnh Văn Đệ</p>
          <p>Nội dung: [Mã đơn hàng] - [Số điện thoại]</p>
        </div>
      )}
    </Form>
  );

  const renderConfirmation = () => (
    <div style={{ textAlign: 'center', padding: '40px 0' }}>
      <CheckOutlined style={{ fontSize: 64, color: '#52c41a' }} />
      <h2>Đặt hàng thành công!</h2>
      <p>Mã đơn hàng của bạn: #123456</p>
    </div>
  );

  const renderStepContent = () => {
    switch (current) {
      case 0: return renderShippingForm();
      case 1: return renderPaymentForm();
      case 2: return renderConfirmation();
      default: return null;
    }
  };

  return (
    <CheckoutContainer>
      <Steps current={current} items={steps} style={{ marginBottom: 24 }} />
      <Row gutter={35}>
        <Col span={10}>
          <StyledCard>{renderStepContent()}</StyledCard>
        </Col>
        <Col span={13}>
        <StyledCard title="Thông tin đơn hàng">
          <OrderSummary>
              {cartItems.map((item, index) => (
                  <div key={index} style={{ marginBottom: '10px' }}>
                      <PriceRow>
                          <img
                              src={item.image_url}  // Hiển thị hình ảnh sản phẩm
                              alt={item.product_name}
                              style={{ width: '50px', marginRight: '10px' }} 
                          />
                          <span>{item.product_name} {item.storage} GB {item.color} số lượng: {item.quantity}</span>
                          <span>{item.total_price_per_product.toLocaleString()} đ</span>
                      </PriceRow>
                  </div>
              ))}
          </OrderSummary>
          <PriceRow>
                  <span>Tổng tiền</span>
                  <span>{totalPrice.toLocaleString()} đ</span>
              </PriceRow>
          <VatText>(Bao gồm thuế VAT)</VatText>
      </StyledCard>

      <NavigationButtons>
        {current < 2 && (
          <WrapperBtnContinue size="large" onClick={handleNextStep}>
            {current === 1 ? 'Đặt hàng' : 'Tiếp tục'}
          </WrapperBtnContinue>
        )}
        {current > 0 && current !== 2 && (
          <WrapperBtnBack 
            icon={<LeftOutlined />} 
            onClick={() => setCurrent(current - 1)}
          >
            Quay lại
          </WrapperBtnBack>
        )}
      </NavigationButtons>
        </Col>
      </Row>
    </CheckoutContainer>
  );
};

export default PaymentComponent;