import React, { useState, useEffect } from 'react';
import { Button, List, message } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { fetchOrdersAPI } from "../../apis"; 
import dayjs from 'dayjs';

const SelectOrder = () => {
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    // Fetch danh sách đơn hàng của người dùng
    const fetchOrders = async () => {
      try {
        const data = await fetchOrdersAPI();
        setOrders(data); // Giả sử API trả về danh sách các đơn hàng
      } catch (error) {
        message.error("Không thể tải danh sách đơn hàng");
      }
    };
    fetchOrders();
  }, []);


  return (
    <div>
      <h3>Chọn đơn hàng để xem chi tiết:</h3>
      <List
        bordered
        dataSource={orders}
        renderItem={(order) => (
          <List.Item>
            <List.Item.Meta
              title={`Đơn hàng #${order.orderNumber}`}
              description={dayjs(order.createdAt).format('YYYY-MM-DD')}
            />
            <Link to={`/orders/order-view/${order._id}`}>
                <Button>Xem chi tiết</Button>
            </Link>
          </List.Item>
        )}
      />
    </div>
  );
};

export default SelectOrder;
