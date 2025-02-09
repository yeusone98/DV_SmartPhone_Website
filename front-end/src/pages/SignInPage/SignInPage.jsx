import React, { useState } from 'react';
import { Button, Divider, Form, Input, Alert, Typography } from 'antd';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { loginUserAPI } from '../../features/user/userSlice';
import Cookies from 'js-cookie';
import {
  FormContainer,
  Logo,
  StyledButton,
  WrapperForgotPassword,
  WrapperPageLogin,
  WrapperSocialButtons,
  WrapperTextSignIn,
  WrapperTextSignInSmall,
} from './style';
import logo from '../../assets/images/logo-bluef.png';
import googlelogo from '../../assets/images/google.png';
import fbLogo from '../../assets/images/facebook.png';

const { Text } = Typography;

const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  let [searchParams] = useSearchParams();
  const registeredEmail = searchParams.get('registeredEmail');
  const verifiedEmail = searchParams.get('verifiedEmail');

  // Xử lý khi người dùng nhấn nút Đăng nhập
  const handleLogin = async (values) => {
    try {
      const { email, password } = values;

      // Thực hiện đăng nhập qua Redux
      const result = await dispatch(loginUserAPI({ email, password })).unwrap();

      // Lưu accessToken và refreshToken vào Cookies
      Cookies.set('accessToken', result.accessToken, { secure: true });
      Cookies.set('refreshToken', result.refreshToken, { secure: true });

      // Điều hướng dựa trên vai trò người dùng
      if (result.role === 'admin') {
        navigate('/dashboard'); // Admin thì điều hướng đến Dashboard
      } else if (result.role === 'client') {
        navigate('/'); // Khách hàng thì điều hướng đến Home
      } else {
        throw new Error('Unknown role!'); // Nếu role không xác định
      }

      // Hiển thị thông báo thành công
      toast.success('Đăng nhập thành công!');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Đăng nhập thất bại! Vui lòng thử lại.');
      toast.error('Đăng nhập thất bại! Vui lòng kiểm tra email và mật khẩu.');
    }
  };

  return (
    <WrapperPageLogin>
      {/* Hiển thị thông báo nếu có verifiedEmail */}
      {verifiedEmail && (
        <Alert
          message={
            <>
              Your email&nbsp;
              <Text strong style={{ cursor: 'pointer', color: '#000' }}>
                {verifiedEmail}
              </Text>
              &nbsp;has been verified.
              <br />
              Now you can login to enjoy our services! Have a good day!
            </>
          }
          type="success"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      {/* Hiển thị thông báo nếu có registeredEmail */}
      {registeredEmail && (
        <Alert
          message={
            <>
              An email has been sent to&nbsp;
              <Text strong style={{ cursor: 'pointer', color: '#000' }}>
                {registeredEmail}
              </Text>
              .<br />
              Please check and verify your account before logging in!
            </>
          }
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      <FormContainer>
        <Link to={'/'}><Logo>
          <img style={{ height: '40px', width: '160px' }} src={logo} alt="Logo" />
        </Logo></Link>
        <WrapperTextSignIn>Đăng nhập tài khoản</WrapperTextSignIn>

        <Form
          name="login"
          onFinish={handleLogin}
          layout="vertical"
          requiredMark={false}
        >
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

          <Form.Item
            label="Nhập mật khẩu"
            name="password"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu!' },
              { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
            ]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>

          {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}
            <Link to="/forgot-password" ><WrapperForgotPassword > Quên mật khẩu?</WrapperForgotPassword></Link>
          <StyledButton type="primary" htmlType="submit">
            Đăng nhập
          </StyledButton>
        </Form>

        <Divider>
          <span>Hoặc</span>
        </Divider>

        <WrapperSocialButtons>
          <Button
            icon={
              <img
                style={{ height: '35px', width: '37px' }}
                src={googlelogo}
                alt="Google"
              />
            }
            style={{
              width: '48%',
              height: '40px',
              fontWeight: 'bold',
              backgroundColor: '#fff',
              border: '1px solid #ddd',
            }}
          >
            Google
          </Button>
          <Button
            icon={
              <img
                style={{ height: '35px', width: '37px' }}
                src={fbLogo}
                alt="Facebook"
              />
            }
            style={{
              width: '48%',
              height: '40px',
              fontWeight: 'bold',
              backgroundColor: '#fff',
              border: '1px solid #ddd',
            }}
          >
            Facebook
          </Button>
        </WrapperSocialButtons>

        <WrapperTextSignInSmall>
          Bạn chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
        </WrapperTextSignInSmall>
      </FormContainer>
    </WrapperPageLogin>
  );
};

export default SignInPage;
