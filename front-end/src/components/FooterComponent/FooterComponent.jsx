import React from 'react';
import { Col } from 'antd';
import { FacebookFilled, GoldFilled, LinkedinFilled, TwitterCircleFilled } from '@ant-design/icons';
import {
  WrapperFooterComponent,
  WrapperFooterContent,
  FooterSection,
  FooterLink,
  FooterCopyRight,
  WrapperFooterIcon,
} from './style';

const FooterComponent = () => {
  return (
    <WrapperFooterComponent>
      <WrapperFooterContent>
        <FooterSection span={6}>
          <h3>Thông tin liên hệ</h3>
          <p>Địa chỉ: 19 Nguyễn Hữu Thọ, Tân Hưng, Quận 7, HCM</p>
          <p>Hotline: 0909 090 909</p>
          <p>Email: vdstore8386@gmail.com</p>
        </FooterSection>
        
        <FooterSection span={6}>
          <h3>Chính sách mua hàng</h3>
          <FooterLink href="/return-policy">Chính sách đổi trả</FooterLink>
          <FooterLink href="/return-policy">Chính sách bảo hành</FooterLink>
          <FooterLink href="/return-policy">Chính sách vận chuyển</FooterLink>
        </FooterSection>
        
        <FooterSection span={6}>
          <h3>Tổng đài hỗ trợ miễn phí</h3>
          <p>Gọi mua hàng: 0909 090 909</p>
          <p>Gọi khiếu nại: 0909 090 909</p>
          <p>Gọi bảo hành: 0909 090 909</p>
        </FooterSection>
        
        <FooterSection span={6}>
          <h3>Về VD STORE</h3>
          <p style={{ lineHeight: '1.5' }}>
            "Thành công hay thất bại trong kinh doanh phụ thuộc nhiều vào thái độ suy nghĩ hơn là khả năng suy nghĩ"
          </p>
          <WrapperFooterIcon>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FacebookFilled />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <GoldFilled />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <LinkedinFilled />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <TwitterCircleFilled />
            </a>
          </WrapperFooterIcon>
        </FooterSection>
      </WrapperFooterContent>
      <FooterCopyRight>©2024 VD STORE. All rights reserved</FooterCopyRight>
    </WrapperFooterComponent>
  );
};

export default FooterComponent;