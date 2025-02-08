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
  message,
  Row,
  Col,
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { fetchCustomersAPI, updateCustomerAPI, deleteCustomerAPI } from '../../apis';

const { Option } = Select; // API liên quan đến Customer

const StyledCard = styled(Card)`
  margin-bottom: 24px;
`;

const FilterContainer = styled.div`
  padding: 24px;
  background: #ffffff;
  border-radius: 2px;
  margin-bottom: 24px;
`;

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await fetchCustomersAPI();
      // Transform data to include 'id' field
      const transformedData = data.map(customer => ({
        ...customer,
        id: customer.id || customer._id // Ensure id is correctly set
      }));
      setCustomers(transformedData);
    } catch (error) {
      message.error(`Error fetching customers: ${error.message}`);
    }
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    form.setFieldsValue({
      displayName: customer.displayName,
    });
    setIsModalVisible(true);
  };

  // const handleSaveCustomer = async (values) => {
  //   try {
  //     if (editingCustomer) {
  //       const updatedData = {
  //         displayName: values.displayName,
  //       };
  //       // Only include password if it's provided
  //       if (values.password) {
  //         updatedData.password = values.password;
  //       }
  //       await updateCustomerAPI(editingCustomer.id, updatedData);
  //       // Update local state
  //       const updatedCustomers = customers.map(customer => 
  //         customer.id === editingCustomer.id ? { ...customer, ...updatedData } : customer
  //       );
  //       setCustomers(updatedCustomers);
  //       message.success('Customer updated successfully!');
  //     }
  //     setIsModalVisible(false);
  //     form.resetFields();
  //   } catch (error) {
  //     message.error(`Error updating customer: ${error.message}`);
  //   }
  // };

  const handleDeleteCustomer = async (customer) => {
    try {
      await deleteCustomerAPI(customer.id);
      setCustomers(customers.filter((c) => c.id !== customer.id));
      message.success('Xóa khách hàng thành công!');
    } catch (error) {
      message.error('Lỗi khi xóa khách hàng: ' + error.message);
    }
  };

  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Display Name',
      dataIndex: 'displayName',
      key: 'displayName',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDeleteCustomer(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <StyledCard title="Customer Management">
        <Table
          columns={columns}
          dataSource={customers}
          rowKey="id"
          pagination={{
            total: customers.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />
      </StyledCard>
    </>
  );
};

export default CustomerManagement;
