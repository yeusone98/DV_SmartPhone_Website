import { CheckOutlined, CreditCardOutlined, HomeOutlined, LeftOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Radio, Row, Select, Steps } from 'antd';
import React, { useState } from 'react';
import bank_transfer from '../../assets/images/bank.png';
import cod_icon from '../../assets/images/cod_icon.png';
import qr_code from '../../assets/images/qr_code.png';
import vnpay_icon from '../../assets/images/vnpay.png';
import { CheckoutContainer, DiscountNote, NavigationButtons, OrderSummary, PriceRow, StyledCard, VatText, WrapperBtnBack, WrapperBtnContinue } from './style';
const { Option } = Select;
const TestComponent = () => {
  const [current, setCurrent] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [form] = Form.useForm();
  const steps = [
    {
      title: 'Shipping',
      icon: <HomeOutlined />,
    },
    {
      title: 'Payment',
      icon: <CreditCardOutlined />,
    },
    {
      title: 'Confirmation',
      icon: <CheckOutlined />,
    },
  ];
  const onFinish = (values) => {
    console.log('Success:', values);
    setCurrent(current + 1);
  };
  const handleContinue = () => {
    form.submit();
  };
  const handleBack = () => {
    setCurrent(current - 1);
  };
  const renderShippingForm = () => (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Họ và tên"
            name="fullName"
            rules={[{ required: true, message: 'Vui lòng nhập tên của bạn' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại của bạn' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        label="Thành phố"
        name="city"
        rules={[{ required: true, message: 'Vui lòng chọn thành phố' }]}
      >
        <Select placeholder="Hà Nội">
          <Option value="hanoi">Hà Nội</Option>
          <Option value="hcm">tp.Hồ Chí Minh</Option>
          <Option value="danang">Đà Nẵng</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Quận/Huyện"
        name="district"
        rules={[{ required: true, message: 'Vui lòng chọn quận/huyện' }]}
      >
        <Select placeholder="Chọn quận/huyện">
          <Select.Option value="district1">Quận 1</Select.Option>
          <Select.Option value="district2">Quận 2</Select.Option>
          <Select.Option value="district2">Quận 3</Select.Option>
          <Select.Option value="district2">Quận 4</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Phường/Xã"
        name="ward"
        rules={[{ required: true, message: 'Vui lòng chọn phường/xã' }]}
      >
        <Select placeholder="Chọn phường/xã">
          <Select.Option value="ward1">Phường 1</Select.Option>
          <Select.Option value="ward2">Phường 2</Select.Option>
          <Select.Option value="ward2">Phường 3</Select.Option>
          <Select.Option value="ward2">Phường 4</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Địa chỉ cụ thể"
        name="address"
        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ cụ thể' }]}
      >
        <Input placeholder="Số nhà, tên đường..." />
      </Form.Item>
      <Form.Item label="Ghi chú" name="note">
        <Input.TextArea placeholder="Nhập ghi chú nếu cần..." />
      </Form.Item>
    </Form>
  );
  const renderPaymentForm = () => (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item 
        label="Phương thức thanh toán"
        required
      >
        <Radio.Group value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <div style={{ marginBottom: '16px' }}>
            <Radio.Button value="credit" style={{ width: '100%', height: '50px', display: 'flex', alignItems: 'center', padding: '0 16px' }}>
              <img src={vnpay_icon} alt="VNPAY" style={{ height: '30px', marginRight: '8px' }} />
              VNPAY - Thẻ ATM/Thẻ tín dụng/Thẻ ghi nợ
            </Radio.Button>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <Radio.Button value="bank" style={{ width: '100%', height: '50px', display: 'flex', alignItems: 'center', padding: '0 16px',  }}>
              <img src={bank_transfer} alt="Bank Transfer" style={{ height: '30px', marginRight: '8px' }} />
              Chuyển khoản qua ngân hàng
            </Radio.Button>
          </div>
          <div>
            <Radio.Button value="cod" style={{ width: '100%', height: '50px', display: 'flex', alignItems: 'center', padding: '0 16px' }}>
              <img src={cod_icon} alt="COD" style={{ height: '30px', marginRight: '8px' }} />
              Thanh toán khi nhận hàng (COD)
            </Radio.Button>
          </div>
        </Radio.Group>
      </Form.Item>
      {paymentMethod === 'bank' && (
        <Row>
          <Col span={12}>
          <div style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px' }}>
          <h4>Thông tin chuyển khoản:</h4>
          <p>Ngân hàng: MB BANK</p>
          <p>Số tài khoản: 5320109082002</p>
          <p>Chủ tài khoản: HUYNH VAN DE</p>
          <p>Nội dung: [Mã đơn hàng] _ [Số điện thoại]</p>
          </div>
          </Col>
          <img src={qr_code} alt="QR Code" style={{ height:'234px' , marginLeft: '40px', borderRadius:'7px'}} />
          <Col span={12}>
          </Col >
        </Row>
      )}
    </Form>
  );
  const renderConfirmation = () => (
    <div style={{ textAlign: 'center', padding: '40px 0' }}>
      <CheckOutlined style={{ fontSize: 64, color: '#52c41a' }} />
      <h2>Đặt hàng thành công!</h2>
      <p>Mã đơn hàng của bạn: #123456</p>
      <p style={{ marginTop: '20px' }}>Cảm ơn bạn đã mua hàng. Chúng tôi sẽ sớm liên hệ với bạn.</p>
      <Button type="text" style={{ marginTop: '20px', textDecoration: 'underline', fontSize:'14px' }}>Xem chi tiết đơn hàng</Button>
    </div>
  );
  const renderStepContent = () => {
    switch (current) {
      case 0:
        return renderShippingForm();
      case 1:
        return renderPaymentForm();
      case 2:
        return renderConfirmation();
      default:
        return null;
    }
  };
  return (
    <CheckoutContainer>
      <Steps current={current} items={steps} style={{ marginBottom: 24 }} />
      
      <Row gutter={24}>
        <Col span={16}>
          <StyledCard>{renderStepContent()}</StyledCard>
        </Col>
        
        <Col span={8}>
          <StyledCard title="Thông tin đơn hàng">
            <OrderSummary>
              <PriceRow>
                <span>Giá gốc</span>
                <span>1.300.000 đ</span>
              </PriceRow>
              <PriceRow>
                <span>Tiết kiệm</span>
                <span>310.000 đ</span>
              </PriceRow>
              <PriceRow>
                <span>Tổng tiền hàng</span>
                <span>990.000 đ</span>
              </PriceRow>
              <PriceRow $isTotal>
                <span>Tổng tiền</span>
                <span>990.000 đ</span>
              </PriceRow>
              <VatText>(Bao gồm thuế VAT)</VatText>
              <DiscountNote>(*) Bạn có thể chọn mã giảm giá ở bước tiếp theo</DiscountNote>
            </OrderSummary>
          </StyledCard>
          <NavigationButtons>
            {current < 2 && (
              <WrapperBtnContinue
                size='large'
                onClick={handleContinue}
              >
                {current === 1 ? 'Đặt hàng' : 'Tiếp tục'}
              </WrapperBtnContinue>
            )}
            {current > 0 && (
              <WrapperBtnBack 
                icon={<LeftOutlined />}
                onClick={handleBack}
                className="back-button"
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
export default TestComponent;