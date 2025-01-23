import React, { useState } from 'react';
import { Form, Input, Button, Typography, Card, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { sendResetPasswordEmailAPI } from '../../apis';

const { Title, Text } = Typography;

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await sendResetPasswordEmailAPI({ email: values.email });
      message.success('Reset password email sent. Please check your inbox.');
      navigate('/login');
    } catch (err) {
      message.error(err.response?.data?.message || 'Failed to send reset password email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card
        style={{
          width: 400,
          padding: '20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          borderRadius: 8,
        }}
      >
        <Title level={4} style={{ textAlign: 'center', marginBottom: 20 }}>
          Reset Password
        </Title>
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ email: '' }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
            >
              Send Reset Email
            </Button>
          </Form.Item>
        </Form>
        <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginTop: 10 }}>
          Remember your password? <a onClick={() => navigate('/login')}>Login</a>
        </Text>
      </Card>
    </div>
  );
}

export default ForgotPassword;
