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
      message.success('Đã gửi email đặt lại mật khẩu. Vui lòng kiểm tra hộp thư đến của bạn.');
      navigate('/login');
    } catch (err) {
      message.error(err.response?.data?.message || 'Không gửi được email đặt lại mật khẩu.');
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
          Đặt lại mật khẩu
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
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Vui lòng nhập email hợp lệ!' },
            ]}
          >
            <Input placeholder="Vui lòng nhập email" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
            >
              Gửi email đặt lại
            </Button>
          </Form.Item>
        </Form>
        <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginTop: 10 }}>
          Remember your password? <a onClick={() => navigate('/login')}>Đăng nhập</a>
        </Text>
      </Card>
    </div>
  );
}

export default ForgotPassword;
