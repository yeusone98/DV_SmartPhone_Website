// SelectOrder.js
import React, { useState, useEffect } from "react";
import { Button, List, message } from "antd";
import { useNavigate } from "react-router-dom";
import { fetchOrdersByUserAPI } from "../../apis"; // Sử dụng API mới
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/user/userSlice"; // Lấy thông tin người dùng từ Redux
import dayjs from "dayjs";
import Title from "antd/es/typography/Title";
import { SelectOutlined } from "@ant-design/icons";

const SelectOrder = () => {
  const [orders, setOrders] = useState([]);
  const currentUser = useSelector(selectCurrentUser); // Lấy thông tin người dùng từ Redux
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) {
        message.error("Vui lòng đăng nhập để xem đơn hàng.");
        navigate("/login"); // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
        return;
      }

      try {
        // Gọi API mới để lấy danh sách đơn hàng của người dùng hiện tại
        const data = await fetchOrdersByUserAPI(); // API mới chỉ trả về đơn hàng của người dùng
        setOrders(data); // Set đơn hàng của người dùng
      } catch (error) {
        message.error("Không thể tải danh sách đơn hàng.");
      }
    };

    fetchOrders();
  }, [currentUser, navigate]);

  if (!currentUser) {
    return <div>Vui lòng đăng nhập để xem đơn hàng.</div>;
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <Title level={4} style={{paddingBottom:'20px'}}><SelectOutlined style={{marginRight:'10px'}} />Chọn đơn hàng để xem chi tiết:
      </Title>
      
      <List
        bordered
        dataSource={orders}
        renderItem={(order) => (
          <List.Item>
            <List.Item.Meta
              title={`Đơn hàng #${order.orderNumber}`}
              description={dayjs(order.createdAt).format('YYYY-MM-DD')}
            />
            <Button onClick={() => navigate(`/orders/order-view/${order._id}`)}>
              Xem chi tiết
            </Button>
          </List.Item>
        )}
      />
    </div>
  );
};

export default SelectOrder;
