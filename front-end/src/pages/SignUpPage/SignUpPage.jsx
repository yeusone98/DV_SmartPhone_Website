import React, { useState } from 'react';
import { Form, Input, Divider, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  FormContainer,
  Logo,
  SocialButtons,
  StyledButton,
  WrapperSocialButtons,
  WrapperTextSignUp,
  WrapperTextSignUpSmall,
} from './style';
import logo from '../../assets/images/logo-bluef.png';
import googlelogo from '../../assets/images/google.png';
import facebooklogo from '../../assets/images/facebook.png';
import { registerUserAPI } from '../../apis';

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Hàm xử lý đăng ký
  const handleRegister = async (values) => {
    const { email, password } = values;
    setLoading(true);

    try {
      // Gửi yêu cầu đăng ký đến API
      const user = await registerUserAPI({ email, password });
      message.success('Đăng ký thành công!');
      navigate(`/login?registeredEmail=${user.email}`); // Điều hướng đến trang đăng nhập
    } catch (error) {
      // Hiển thị lỗi nếu có
      message.error(error.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      {/* Logo */}
      <Logo>
        <img style={{ height: '40px', width: '160px' }} src={logo} alt="Logo" />
      </Logo>

      {/* Tiêu đề */}
      <WrapperTextSignUp>Đăng ký tài khoản</WrapperTextSignUp>

      {/* Form đăng ký */}
      <Form
        name="register"
        onFinish={handleRegister}
        layout="vertical"
        requiredMark={false}
      >
        {/* Nhập email */}
        <Form.Item
          label="Nhập email"
          name="email"
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            { type: 'email', message: 'Email không hợp lệ!' },
          ]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>

        {/* Nhập mật khẩu */}
        <Form.Item
          label="Nhập mật khẩu"
          name="password"
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu!' },
            { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự!' },
          ]}
        >
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>

        {/* Xác nhận mật khẩu */}
        <Form.Item
          label="Nhập lại mật khẩu"
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Mật khẩu không khớp!'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Nhập lại mật khẩu" />
        </Form.Item>

        {/* Nút đăng ký */}
        <StyledButton type="primary" htmlType="submit" loading={loading}>
          Đăng ký
        </StyledButton>
      </Form>

      {/* Phân cách */}
      <Divider>
        <span>Hoặc</span>
      </Divider>

      {/* Đăng ký bằng Google/Facebook */}
      <WrapperSocialButtons>
        <SocialButtons
          textButton={'Google'}
          icon={<img style={{ height: '35px', width: '37px' }} src={googlelogo} alt="Google" />}
        />
        <SocialButtons
          textButton={'Facebook'}
          icon={<img style={{ height: '35px', width: '37px' }} src={facebooklogo} alt="Facebook" />}
        />
      </WrapperSocialButtons>

      {/* Liên kết đến đăng nhập */}
      <WrapperTextSignUpSmall>
        Bạn đã có tài khoản? <a href="/login">Đăng nhập ngay</a>
      </WrapperTextSignUpSmall>
    </FormContainer>
  );
};

export default SignUpPage;
