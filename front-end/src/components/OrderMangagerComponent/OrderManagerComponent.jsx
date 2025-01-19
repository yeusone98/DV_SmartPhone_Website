import dayjs from 'dayjs';
import React, { useState } from 'react';
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

// Giả lập dữ liệu
const mockOrders = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    customerName: 'John Doe',
    phone: '0123456789',
    products: [
      { name: 'iPhone 13', quantity: 1, price: 999 },
      { name: 'AirPods Pro', quantity: 1, price: 249 }
    ],
    totalAmount: 1248,
    status: 'pending',
    paymentStatus: 'paid',
    orderDate: '2024-01-19',
    shippingAddress: '123 Main St, City, Country',
  },
  // Thêm các đơn hàng mẫu khác...
];

const OrderManagement = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [viewOrder, setViewOrder] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [form] = Form.useForm();

  // Các tùy chọn trạng thái
  const orderStatuses = [
    { label: 'Pending', value: 'pending', color: 'gold' },
    { label: 'Processing', value: 'processing', color: 'blue' },
    { label: 'Shipped', value: 'shipped', color: 'cyan' },
    { label: 'Delivered', value: 'delivered', color: 'green' },
    { label: 'Cancelled', value: 'cancelled', color: 'red' },
  ];

  const columns = [
    {
      title: 'Order Number',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      sorter: (a, b) => a.orderNumber.localeCompare(b.orderNumber),
    },
    {
      title: 'Customer',
      dataIndex: 'customerName',
      key: 'customerName',
      sorter: (a, b) => a.customerName.localeCompare(b.customerName),
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount) => `$${amount.toFixed(2)}`,
      sorter: (a, b) => a.totalAmount - b.totalAmount,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusObj = orderStatuses.find(s => s.value === status);
        return <Tag color={statusObj?.color}>{statusObj?.label}</Tag>;
      },
      filters: orderStatuses.map(status => ({
        text: status.label,
        value: status.value,
      })),
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Order Date',
      dataIndex: 'orderDate',
      key: 'orderDate',
      sorter: (a, b) => new Date(a.orderDate) - new Date(b.orderDate),
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
      orderDate: dayjs(order.orderDate),
    });
    setIsModalVisible(true);
  };

  // Xóa đơn hàng
  const handleDeleteOrder = (order) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this order?',
      content: `Order number: ${order.orderNumber}`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        setOrders(orders.filter(o => o.id !== order.id));
        message.success('Order deleted successfully');
      },
    });
  };

  // Lưu thay đổi đơn hàng
  const handleSaveOrder = async (values) => {
    try {
      if (editingOrder) {
        setOrders(orders.map(o => 
          o.id === editingOrder.id ? { ...o, ...values } : o
        ));
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
              value={orders.reduce((sum, order) => sum + order.totalAmount, 0)}
              prefix="$"
            />
          </Col>
          <Col span={6}>
            <Statistic 
              title="Pending Orders" 
              value={orders.filter(o => o.status === 'pending').length}
            />
          </Col>
          <Col span={6}>
            <Statistic 
              title="Delivered Orders" 
              value={orders.filter(o => o.status === 'delivered').length}
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
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="shippingAddress"
            label="Shipping Address"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true }]}
          >
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
                {viewOrder.orderNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Customer">
                {viewOrder.customerName}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {viewOrder.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Shipping Address">
                {viewOrder.shippingAddress}
              </Descriptions.Item>
              <Descriptions.Item label="Order Date">
                {viewOrder.orderDate}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color={orderStatuses.find(s => s.value === viewOrder.status)?.color}>
                  {orderStatuses.find(s => s.value === viewOrder.status)?.label}
                </Tag>
              </Descriptions.Item>
            </Descriptions>

            <Table
              title={() => 'Order Items'}
              dataSource={viewOrder.products}
              columns={[
                {
                  title: 'Product',
                  dataIndex: 'name',
                },
                {
                  title: 'Quantity',
                  dataIndex: 'quantity',
                },
                {
                  title: 'Price',
                  dataIndex: 'price',
                  render: (price) => `$${price}`,
                },
                {
                  title: 'Subtotal',
                  render: (_, record) => `$${record.price * record.quantity}`,
                },
              ]}
              pagination={false}
              summary={(pageData) => {
                const total = pageData.reduce(
                  (sum, item) => sum + item.price * item.quantity,
                  0
                );
                return (
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={3}>
                      <strong>Total</strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>
                      <strong>${total}</strong>
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