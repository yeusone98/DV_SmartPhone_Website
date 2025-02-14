import {
  CheckOutlined,
  CreditCardOutlined,
  HomeOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Descriptions,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Steps,
  message,
} from "antd";
import { Navigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import bank_transfer from "../../assets/images/bank.png";
import cod_icon from "../../assets/images/cod_icon.png";
import qr_code from "../../assets/images/qr_code.png";
import vnpay_icon from "../../assets/images/vnpay.png";
import {
  CheckoutContainer,
  DiscountNote,
  NavigationButtons,
  OrderSummary,
  PriceRow,
  PriceRowTotal,
  StyledCard,
  VatText,
  WrapperBtnBack,
  WrapperBtnContinue,
  WrapperCheckOutPage,
} from "./style";
import { placeOrderAPI, fetchCartAPI } from "../../apis";
import AddressSelector from "../AddressSelectorComponent/AddressSelectorComponent";
import { useNavigate } from "react-router-dom";

const PaymentComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  //const { cartItems, totalPrice } = location.state;

  //!thay đổi
  const { cartItems, productItems, totalPrice } = location.state;
  const items = productItems && productItems.length > 0 ? productItems : cartItems || [];
  console.log("Received Location State:", location.state);
  

  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [orderNumber, setOrderNumber] = useState(null);
  const [orderId, setOrderId] = useState(null);
  
  const steps = [
    { title: "Shipping", icon: <HomeOutlined /> },
    { title: "Payment", icon: <CreditCardOutlined /> },
    { title: "Confirmation", icon: <CheckOutlined /> },
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
        console.error("Validation Failed:", error);
      }
    } else if (current === 1) {
      // Chuyển sang xử lý thanh toán
      handleSubmitOrder();
    }
  };
  // Xử lý đặt hàng
  const handleSubmitOrder = async () => {
    if (!paymentMethod) {
      message.error("Vui lòng chọn phương thức thanh toán");
      return;
    }

    try {
      const orderData = {
          province: shippingInfo.province,
          district: shippingInfo.district,
          ward: shippingInfo.ward,
          address_detail: shippingInfo.address,
          full_name: shippingInfo.fullName,
          phone_number: shippingInfo.phone,
          paymentMethod,
          products: items.map(item => ({
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
      console.log("Items to be ordered:", items);
       // Gọi API đặt hàng
       const response = await placeOrderAPI(orderData);
      
       if (response && response.message === "Đặt hàng thành công!") {
         const orderNumber = response.order.orderNumber;
         setOrderNumber(orderNumber);
         const orderId = response.order._id.toString();
         setOrderId(orderId);
         
         // Chỉ cập nhật giỏ hàng nếu mua từ cartItems
         if (cartItems) {
           await fetchCartAPI();
         }
         
         message.success("Đặt hàng thành công!");
         setCurrent(2);
       } else {
         message.error(response?.message || "Có lỗi xảy ra khi đặt hàng");
       }
     } catch (error) {
       console.error("Order Error:", error);
       message.error("Đặt hàng thất bại, vui lòng thử lại!");
     }
  };

  const renderShippingForm = () => (
    <div>
      <Descriptions title="Điền thông tin & địa chỉ nhận hàng" bordered></Descriptions>
      <Form form={form} layout="vertical">
      <Form.Item
        label="Họ và tên"
        name="fullName"
        rules={[{ required: true, message: "Vui lòng nhập tên của bạn" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Số điện thoại"
        name="phone"
        rules={[
          { required: true, message: "Vui lòng nhập số điện thoại của bạn" },
        ]}
      >
        <Input />
      </Form.Item>
      <AddressSelector form={form} /> {/* Component chọn địa chỉ */}
      <Form.Item
        label="Địa chỉ cụ thể"
        name="address"
        rules={[{ required: true, message: "Vui lòng nhập địa chỉ cụ thể" }]}
      >
        <Input />
      </Form.Item>
    </Form>
    </div>
  );

  const renderPaymentForm = () => (
    <Form form={form} layout="vertical">
      <Form.Item
        style={{ fontSize: "20px" }}
        label="Phương thức thanh toán"
        required
      >
        <Radio.Group
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <div>
          <Radio.Button
            value="COD"
            style={{
              width: "100%",
              height: "50px",
              display: "flex",
              alignItems: "center",
              padding: "0 16px",
              borderRadius: 'none',
            }}
          >
            <img
              src={cod_icon}
              alt="COD"
              style={{ height: "30px", marginRight: "8px" }}
            />
            Thanh toán khi nhận hàng (COD)
          </Radio.Button>
          </div>
          <div style={{marginTop: '10px'}}>
          <Radio.Button
            value="Banking"
            style={{
              width: "100%",
              height: "50px",
              display: "flex",
              alignItems: "center",
              padding: "0 16px",
              borderRadius: 'none',
            }}
          >
            {" "}
            <img
              src={bank_transfer}
              alt="Bank Transfer"
              style={{ height: "30px", marginRight: "8px" }}
            />
            Thanh toán qua ngân hàng
          </Radio.Button>
          </div>
        </Radio.Group>
      </Form.Item>
      {paymentMethod === "Banking" && (
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
                  <Col span={12}>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding:'20px'}}>
                  <img src={qr_code} alt="QR Code" style={{ height:'100%', width: '100%' , marginLeft: '40px', borderRadius:'10px'}} />
                  </div>
                  </Col >
        </Row>
      )}

      {paymentMethod === "Vnpay" && (
          <div></div>
      )}
    </Form>
  );

  const renderConfirmation = () => (
    <div style={{ textAlign: "center", padding: "40px 0" }}>
      <CheckOutlined style={{ fontSize: 64, color: "#52c41a" }} />
      <h2>Đặt hàng thành công!</h2>
      {orderNumber && <p>Mã đơn hàng của bạn: #{orderNumber}</p>}
      <Button onClick={()=> navigate(`/orders/order-view/${orderId}`)} type="text" style={{ marginTop: '20px', textDecoration: 'underline', fontSize:'14px' }}>Xem chi tiết đơn hàng</Button>
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
    <WrapperCheckOutPage>
      <CheckoutContainer>
        <Steps current={current} items={steps} style={{ marginBottom: 24 }} />
        <Row gutter={35}>
          <Col span={12}>
            <StyledCard>{renderStepContent()}</StyledCard>
          </Col>
          <Col span={12}>
            <StyledCard title="Thông tin đơn hàng">
              <OrderSummary>
                {items.map((item, index) => (
                  <div key={index} style={{ marginBottom: "10px" }}>
                    <PriceRow>
                      <img
                        src={item.image_url}    
                        alt={item.product_name}
                        style={{ width: "50px", marginRight: "10px" }}
                      />
                      <span>
                        {item.product_name} {item.storage} GB {item.color} | Số
                        lượng: {item.quantity}
                      </span>
                      <span>
                        {item.total_price_per_product.toLocaleString()} đ
                      </span>
                    </PriceRow>
                  </div>
                ))}
              </OrderSummary>
              <PriceRowTotal>
                <span>Tổng tiền</span>
                <span>{totalPrice.toLocaleString()} đ</span>
              </PriceRowTotal>
              <VatText>(Bao gồm thuế VAT)</VatText>
            </StyledCard>

            <NavigationButtons>
              {current < 2 && (
                <WrapperBtnContinue size="large" onClick={handleNextStep}>
                  {current === 1 ? "Đặt hàng" : "Tiếp tục"}
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
    </WrapperCheckOutPage>
  );
};

export default PaymentComponent;
