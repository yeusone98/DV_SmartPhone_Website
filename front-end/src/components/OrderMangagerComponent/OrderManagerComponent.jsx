import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Table,
  Card,
  Space,
  Button,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  message,
  Drawer,
  Descriptions,
  Statistic,
  Row,
  Col,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import { fetchOrdersAPI, updateOrderAPI, deleteOrderAPI } from '../../apis'; // Import các API gọi từ backend

const { Option } = Select;

const StyledCard = styled(Card)`
  margin-bottom: 24px;
`;

const FilterContainer = styled.div`
  padding: 24px;
  background: #ffffff;
  border-radius: 2px;
  margin-bottom: 24px;
`;

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [viewOrder, setViewOrder] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [form] = Form.useForm();


  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await fetchOrdersAPI();
      const mappedData = data.map(order => ({
        ...order,
        id: order._id,
        createdAt: new Date(order.createdAt), // Đảm bảo xử lý Date
      }));
      setOrders(mappedData);
    } catch (error) {
      message.error(`Lỗi khi tải đơn hàng: ${error.message}`);
    }
  };

  const orderStatuses = [
    { label: 'Pending', value: 'Pending', color: 'gold' },
    { label: 'Paid', value: 'Paid', color: 'green' },
    { label: 'Failed', value: 'Failed', color: 'red' },
    { label: 'Confirmed', value: 'Confirmed', color: 'blue' },
    { label: 'Completed', value: 'Completed', color: 'lime' },
    { label: 'Cancel', value: 'Cancel', color: 'gray' }
  ];
  

  const columns = [
    {
      title: 'Order Number',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      sorter: (a, b) => {
        const orderA = String(a.orderNumber);
        const orderB = String(b.orderNumber);
        return orderA.localeCompare(orderB);   
      },
    },
    {
      title: 'Customer',
      dataIndex: 'full_name',
      key: 'full_name',
      sorter: (a, b) => a.full_name.localeCompare(b.full_name),
    },
    {
      title: 'Total Amount',
      dataIndex: 'total_price',
      key: 'total_price',
      render: (amount) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount),
      sorter: (a, b) => a.total_price - b.total_price,
    },
    {
      title: 'Trạng thái',
      dataIndex: ['payment', 'status'],
      key: 'status',
      render: (status) => {
        const statusObj = orderStatuses.find(s => s.value === status);
        return <Tag color={statusObj?.color}>{statusObj?.label || 'Unknown'}</Tag>;
      },
      filters: orderStatuses.map(status => ({
        text: status.label,
        value: status.value,
      })),
      onFilter: (value, record) => record.payment?.status === value,
    },
    {
      title: 'Order Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      render: (date) => dayjs(date).format('YYYY-MM-DD HH:mm:ss'), // Hiển thị định dạng ngày tháng
    },
    {
      title: 'Payment Method',
      dataIndex: 'payment',
      key: 'paymentMethod',
      render: (payment) => payment?.method || 'Không có thông tin',  // Kiểm tra có payment.method không, nếu không thì hiển thị 'Không có thông tin'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewOrder(record)}
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditOrder(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDeleteOrder(record)}
          />
        </Space>
      ),
    },
  ];

  // Xem chi tiết đơn hàng
  const handleViewOrder = (order) => {
    setViewOrder(order);
    setIsDrawerVisible(true);
  };

  // Chỉnh sửa đơn hàng
  const handleEditOrder = (order) => {
    setEditingOrder(order);
    form.setFieldsValue({
      ...order,
      orderDate: dayjs(order.createdAt),
    });
    setIsModalVisible(true);
  };

  // Xóa đơn hàng
  // Trong component OrderManagement
  const handleDeleteOrder = async (order) => {
    try {
      console.log('Sending delete request for:', order.id);  // Log kiểm tra xem id đã được lấy đúng chưa
  
      // Gọi API xóa đơn hàng
      const response = await deleteOrderAPI(order.id);
  
      // Kiểm tra phản hồi từ API
      if (response && response.message) {
        // Cập nhật lại danh sách đơn hàng trong UI
        setOrders(prev => prev.filter(o => o.id !== order.id));
        message.success('Order deleted successfully');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Delete error:', error);
      message.error(error.message || 'Failed to delete order');
    }
  };
  
  
  

  // Lưu thay đổi đơn hàng
  const handleSaveOrder = async (values) => {
    try {
      if (editingOrder) {
        const formattedData = {
          full_name: values.customerName,
          phone_number: values.phone,
          address_detail: values.shippingAddress,
          payment: {
            ...editingOrder.payment, // Giữ lại các thông tin khác của payment
            status: values.status,    // Cập nhật status mới
          },
        };
  
        // Gọi API cập nhật đơn hàng
        await updateOrderAPI(editingOrder.id, formattedData);
          
        // Cập nhật lại danh sách đơn hàng trong UI
        const updatedOrders = orders.map(o =>
          o.id === editingOrder.id ? { ...o, ...formattedData } : o
        );
        setOrders(updatedOrders);
          
        message.success('Cập nhật đơn hàng thành công!');
      }
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Lỗi khi cập nhật đơn hàng: ' + error.message);
    }
  };
  

  return (
    <>
      <StyledCard title="Order Statistics">
        <Row gutter={24}>
          <Col span={6}>
            <Statistic title="Total Orders" value={orders.length} />
          </Col>
          <Col span={6}>
            <Statistic 
              title="Total Revenue" 
              value={orders.reduce((sum, order) => sum + order.total_price, 0)}
              suffix="đ"
            />
          </Col>
          <Col span={6}>
            <Statistic 
              title="Pending Orders" 
              value={orders.filter(o => o.payment?.status === 'Pending').length}
            />
          </Col>

          <Col span={6}>
            <Statistic 
              title="Paid Orders" 
              value={orders.filter(o => o.payment?.status === 'Paid').length}
            />
          </Col>
        </Row>
      </StyledCard>

      <FilterContainer>
        <Form layout="inline">
          <Form.Item name="search">
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search orders..."
            />
          </Form.Item>
          <Form.Item name="dateRange">
            <DatePicker.RangePicker />
          </Form.Item>
          <Form.Item name="status">
            <Select 
              placeholder="Filter by status"
              style={{ width: 200 }}
              allowClear
            >
              {orderStatuses.map(status => (
                <Option key={status.value} value={status.value}>
                  {status.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Button type="primary" icon={<FilterOutlined />}>
            Filter
          </Button>
        </Form>
      </FilterContainer>

      <Card>
        <Table
          columns={columns}
          dataSource={orders}
          rowKey="id"
          pagination={{
            total: orders.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />
      </Card>

      {/* Modal chỉnh sửa đơn hàng */}
      <Modal
        title={editingOrder ? 'Edit Order' : 'Create Order'}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingOrder(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
        form={form}
        layout="vertical"
        onFinish={handleSaveOrder}
        initialValues={{
        customerName: editingOrder?.full_name,
        phone: editingOrder?.phone_number,
        shippingAddress: editingOrder?.address_detail,
        status: editingOrder?.payment?.status,
        }}
      >
          <Form.Item
            name="customerName"
            label="Customer Name"
            rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="shippingAddress"
            label="Shipping Address"
            rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true }]}>
            <Select>
              {orderStatuses.map(status => (
                <Option key={status.value} value={status.value}>
                  {status.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              <Button onClick={() => {
                setIsModalVisible(false);
                setEditingOrder(null);
                form.resetFields();
              }}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Drawer xem chi tiết đơn hàng */}
      <Drawer
        title="Order Details"
        width={600}
        visible={isDrawerVisible}
        onClose={() => {
          setIsDrawerVisible(false);
          setViewOrder(null);
        }}
      >
      {viewOrder && (
        <>
          <Descriptions column={1}>
            <Descriptions.Item label="Order Number">
              {viewOrder.orderNumber} {/* Số đơn hàng */}
            </Descriptions.Item>
            <Descriptions.Item label="Customer">
              {viewOrder.full_name} {/* Tên khách hàng */}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              {viewOrder.phone_number} {/* Số điện thoại */}
            </Descriptions.Item>
            <Descriptions.Item label="Shipping Address">
              {viewOrder.address_detail} {/* Địa chỉ giao hàng */}
            </Descriptions.Item>
            <Descriptions.Item label="Order Date">
              {dayjs(viewOrder.createdAt).format('YYYY-MM-DD HH:mm:ss')} {/* Ngày tạo đơn hàng */}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={orderStatuses.find(status => status.value === viewOrder.payment?.status)?.color}>
                {viewOrder.payment?.status}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Payment Method">
              {viewOrder.payment?.method || 'Not Available'} {/* Phương thức thanh toán */}
            </Descriptions.Item>
          </Descriptions>

          <Table
            title={() => 'Order Items'}  // Tiêu đề cho bảng sản phẩm
            dataSource={viewOrder.products}  // Dữ liệu sản phẩm
            columns={[
              {
                title: 'Product',
                dataIndex: 'product_name',  // Hiển thị tên sản phẩm
              },
              {
                title: 'Quantity',
                dataIndex: 'quantity',  // Hiển thị số lượng
              },
              {
                title: 'Price',
                dataIndex: 'unit_price',  // Hiển thị giá đơn vị
                render: (price) => `${price.toLocaleString()} VND`,  // Định dạng giá
              },
              {
                title: 'Subtotal',
                render: (_, record) => `${(record.unit_price * record.quantity).toLocaleString()} VND`,  // Tính tổng tiền cho mỗi sản phẩm
              },
            ]}
            pagination={false}
            summary={(pageData) => {
              const total = pageData.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);
              return (
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={3}>
                    <strong>Total</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1}>
                    <strong>{total.toLocaleString()} VND</strong>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              );
            }}
          />
        </>
      )}
    </Drawer>
    </>
  );
};

export default OrderManagement;
