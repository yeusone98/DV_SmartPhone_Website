import React from 'react'
import { Button, Divider, Form, Input } from 'antd';
import {
  FormContainer,
  Logo,
  StyledButton,
  WrapperPageLogin,
  WrapperSocialButtons,
  WrapperTextSignIn,
  WrapperTextSignInSmall,
} from './style';
import logo from '../../assets/images/logo-bluef.png';
import googlelogo from '../../assets/images/google.png';
import fbLogo from '../../assets/images/facebook.png';

const SignInPage = () => {
  const onFinish = (values) => {
    console.log('Received values: ', values);
  };

  return (
    <WrapperPageLogin>
    <FormContainer>
      <Logo>
        <img style={{ height: '40px', width: '160px' }} src={logo} alt="Logo" />
      </Logo>
      <WrapperTextSignIn>Đăng nhập tài khoản</WrapperTextSignIn>
      <Form
        name="login"
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          label="Nhập số điện thoại/email"
          name="username"
          rules={[
            { required: true, message: 'Vui lòng nhập số điện thoại hoặc email!' },
          ]}
        >
          <Input placeholder="Nhập số điện thoại/email" />
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
  )
}

export default SignInPage
