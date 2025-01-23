import React, { useState } from 'react';
import { Form, Input, Button, Typography, Card, message } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { resetPasswordAPI } from '../../apis';

const { Title, Text } = Typography;

function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const handleSubmit = async (values) => {
    const { password, confirmPassword } = values;

    if (password !== confirmPassword) {
      message.error('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      await resetPasswordAPI({ email, token, newPassword: password });
      message.success('Password reset successfully! You can now login with your new password.');
      navigate('/login');
    } catch (err) {
      message.error(err.response?.data?.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!email || !token) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Card
          style={{
            padding: '20px',
            width: 400,
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            borderRadius: 8,
          }}
        >
          <Title level={5}>Invalid or missing reset token.</Title>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card
        style={{
          padding: '20px',
          width: 400,
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
          initialValues={{ password: '', confirmPassword: '' }}
        >
          <Form.Item
            label="New Password"
            name="password"
            rules={[
              { required: true, message: 'Please enter your new password!' },
              { min: 6, message: 'Password must be at least 6 characters.' },
            ]}
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item>
          <Form.Item
            label="Confirm New Password"
            name="confirmPassword"
            rules={[
              { required: true, message: 'Please confirm your new password!' },
              { min: 6, message: 'Password must be at least 6 characters.' },
            ]}
          >
            <Input.Password placeholder="Confirm new password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default ResetPassword;
