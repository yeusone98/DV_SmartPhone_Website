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
import { fetchOrdersAPI, fetchOrderByIdAPI, updateOrderAPI, deleteOrderAPI } from '../../apis'; // Import các API gọi từ backend

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
    // Gọi API để lấy danh sách đơn hàng khi component được render lần đầu
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await fetchOrdersAPI();  // Lấy tất cả đơn hàng
      setOrders(data);
    } catch (error) {
      message.error('Lỗi khi tải danh sách đơn hàng.');
    }
  };

  const orderStatuses = [
    { label: 'Pending', value: 'pending', color: 'gold' },
    { label: 'Paid', value: 'delivered', color: 'green' },
  ];

  const columns = [
    {
      title: 'Order Number',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      sorter: (a, b) => a.orderNumber.localeCompare(b.orderNumber),
      render: (text, record, index) => `ORD-${String(index + 1).padStart(3, '0')}`, // Thêm số thứ tự cho đơn hàng
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
      render: (amount) => `$${amount.toFixed(2)}`,
      sorter: (a, b) => a.total_price - b.total_price,
    },
    {
      title: 'Status',
      dataIndex: 'payment',  // Thay vì chỉ sử dụng 'status', sẽ lấy từ 'payment'
      key: 'status',
      render: (payment) => {
        const statusObj = orderStatuses.find(s => s.value === payment?.status); // Truy xuất status từ payment
        return <Tag color={statusObj?.color}>{statusObj?.label}</Tag>;
      },
      filters: orderStatuses.map(status => ({
        text: status.label,
        value: status.value,
      })),
      onFilter: (value, record) => record.payment?.status === value,  // Cập nhật cho đúng với dữ liệu mới
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
  const handleDeleteOrder = async (order) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this order?',
      content: `Order number: ${order.orderNumber}`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await deleteOrderAPI(order.id);
          setOrders(orders.filter(o => o.id !== order.id));
          message.success('Order deleted successfully');
        } catch (error) {
          message.error('Error deleting order');
        }
      },
    });
  };

  // Lưu thay đổi đơn hàng
  const handleSaveOrder = async (values) => {
    try {
      if (editingOrder) {
        await updateOrderAPI(editingOrder.id, values);  // Gọi API cập nhật đơn hàng
        setOrders(orders.map(o => o.id === editingOrder.id ? { ...o, ...values } : o));
        message.success('Order updated successfully');
      } else {
        // Thêm đơn hàng mới
        const newOrder = {
          id: String(orders.length + 1),
          ...values,
          orderNumber: `ORD-2024-${String(orders.length + 1).padStart(3, '0')}`,
        };
        setOrders([...orders, newOrder]);
        message.success('Order created successfully');
      }
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Error saving order');
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
              prefix="$"
            />
          </Col>
          <Col span={6}>
            <Statistic 
              title="Pending Orders" 
              value={orders.filter(o => o.payment?.status === 'pending').length}
            />
          </Col>

          <Col span={6}>
            <Statistic 
              title="Paid Orders" 
              value={orders.filter(o => o.payment?.status === 'paid').length}
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
              <Tag color={viewOrder.payment?.status === 'pending' ? 'gold' : 'green'}>
                {viewOrder.payment?.status === 'pending' ? 'Pending' : 'Completed'} {/* Hiển thị trạng thái */}
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
                render: (price) => `$${price.toFixed(2)}`,  // Định dạng giá
              },
              {
                title: 'Subtotal',
                render: (_, record) => `$${(record.unit_price * record.quantity).toFixed(2)}`,  // Tính tổng tiền cho mỗi sản phẩm
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
                    <strong>${total.toFixed(2)}</strong>
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
