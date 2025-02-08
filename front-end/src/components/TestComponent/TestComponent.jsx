import React, { useState } from "react";
import { Table, Tag, Typography, Card, Button, message, Row, Col } from "antd";
import styled from "styled-components";

const { Title, Text } = Typography;

// Styled Components
const Wrapper = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
`;

const StyledCard = styled(Card)`
  margin-bottom: 20px;
`;

const columns = [
  {
    title: "Sản phẩm",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Số lượng",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Giá",
    dataIndex: "price",
    key: "price",
    render: (price) => `${price.toLocaleString()} VNĐ`,
  },
];

const TestComponent = () => {
  const [orderData, setOrderData] = useState({
    orderId: "VD123456",
    status: "Pending",
    orderDate: "05/02/2025 - 14:30",
    total: 2500000,
    shippingAddress: "19 Nguyễn Hữu Thọ, Quận 7, HCM",
    items: [
      { key: "1", name: "iPhone 15", quantity: 1, price: 2000000 },
      { key: "2", name: "Tai nghe AirPods", quantity: 1, price: 500000 },
    ],
  });

  const handleCancelOrder = () => {
    setOrderData((prev) => ({ ...prev, status: "Đã hủy" }));
    message.success("Đơn hàng đã được hủy!");
  };

  return (
    <Wrapper>
      <Title level={3}>Chi tiết đơn hàng</Title>

      <Row style={{ height: "130px" }}>
        <Col span={12} style={{ height: "100%" }}>
          <StyledCard
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Text strong>Mã đơn hàng: </Text>
            <Text>{orderData.orderId}</Text>
            <br />
            <Text strong>Thời gian đặt hàng: </Text>
            <Text>{orderData.orderDate}</Text>
            <br />
            <Text strong>Trạng thái: </Text>
            <Tag color={orderData.status === "Đã hủy" ? "red" : "blue"}>
              {orderData.status}
            </Tag>
          </StyledCard>
        </Col>

        <Col span={12} style={{ height: "100%" }}>
          <StyledCard
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              
            }}
          >
            <Title level={4} style={{lineHeight:'0', marginTop:0}}>Địa chỉ giao hàng</Title>
            <Text style={{paddingTop: '15px'}}>{orderData.shippingAddress}</Text>
          </StyledCard>
        </Col>
      </Row>

      <StyledCard>
        <Title level={4}>Sản phẩm trong đơn hàng: #{orderData.orderId}</Title>
        <Table
          columns={columns}
          dataSource={orderData.items}
          pagination={false}
        />
      </StyledCard>

      <StyledCard>
        <Text  strong>Tổng tiền: </Text>
        <Text style={{color:'blue',  fontSize: "18px", fontWeight: "bold" }}> 
          {orderData.total.toLocaleString()} VNĐ
        </Text>
      </StyledCard>

      {orderData.status === "Pending" && (
        <Button type="primary" danger onClick={handleCancelOrder}>
          Hủy đơn hàng
        </Button>
      )}
    </Wrapper>
  );
};

export default TestComponent;
