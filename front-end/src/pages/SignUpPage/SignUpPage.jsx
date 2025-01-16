import { Button, Divider, Form, Input, Select } from 'antd';
import React from 'react'
import { FormContainer, Logo, SocialButtons, StyledButton, WrapperSocialButtons, WrapperTextSignUp, WrapperTextSignUpSmall } from './style';
import { Option } from 'antd/es/mentions';
import logo from  '../../assets/images/logo-bluef.png'
import googlelogo from '../../assets/images/google.png'
import facebooklogo from '../../assets/images/facebook.png'


const SignUpPage = () => {
  const onFinish = (values) => {
    console.log('Received values: ', values);
  };
  return (
    <FormContainer>
      <Logo>
        <img style={{height:'40px', width:'160px'}} src={logo} alt="Logo" />
      </Logo>
      <WrapperTextSignUp>Đăng ký tài khoản</WrapperTextSignUp>
      <Form
        name="register"
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          label="Nhập họ và tên"
          name="fullname"
          rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
        >
          <Input placeholder="Nhập họ và tên" />
        </Form.Item>

        <Form.Item
          label="Nhập số điện thoại"
          name="phone"
          rules={[
            { required: true, message: 'Vui lòng nhập số điện thoại!' },
            { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ!' }
          ]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Form.Item
          label="Nhập email"
          name="email"
          rules={[{ type: 'email', message: 'Email không hợp lệ!' }]}
        >
          <Input placeholder="Nhập email (không bắt buộc)" />
        </Form.Item>

        <Form.Item
          label="Tỉnh/ thành phố"
          name="city"
          rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố!' }]}
        >
          <Select placeholder="Chọn tỉnh/thành phố">
            <Option value="hanoi">Hà Nội</Option>
            <Option value="hcm">TP. Hồ Chí Minh</Option>
            <Option value="danang">Đà Nẵng</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Nhập mật khẩu"
          name="password"
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu!' },
            { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
          ]}
        >
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>

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

        <StyledButton type="primary" htmlType="submit">
          Đăng ký
        </StyledButton>
      </Form>

      <Divider>
        <span>Hoặc</span>
      </Divider>

      <WrapperSocialButtons>
        <SocialButtons  textButton={'Google'} icon={<img style={{height:'35px', width:'37px'}} src={googlelogo} alt="Google" />} />
         
        <SocialButtons  textButton={'Facebook'} icon={<img style={{height:'35px', width:'37px'}} src={facebooklogo} alt="facebook" />} />
          
      </WrapperSocialButtons>

      <WrapperTextSignUpSmall>
        Bạn đã có tài khoản? <a href="/login" >Đăng nhập ngay</a>
      </WrapperTextSignUpSmall>
    </FormContainer>
  )
}

export default SignUpPage
