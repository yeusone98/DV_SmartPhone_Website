import React from 'react';
import { Avatar, Button } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const CommentContainer = styled.div`
  padding: 16px;
  background: #f0f2f5;
  border-radius: 8px;
  margin: 16px 0;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 14px;
`;

const TimeAgo = styled.span`
  color: #65676b;
  font-size: 13px;
  &:before {
    content: '•';
    margin: 0 6px;
  }
`;

const AdminBadge = styled.span`
  background: #e4e6eb;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  margin: 0 8px;
`;

const CommentText = styled.div`
  font-size: 15px;
  margin: 8px 0;
`;

const ActionBar = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #65676b;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    text-decoration: underline;
  }
`;

const Comment = () => {
  return (
    <>
      {/* Original post */}
      <CommentContainer>
        <UserInfo>
          <Avatar>D</Avatar>
          <Username>Do Van Phon</Username>
          <TimeAgo>3 ngày trước</TimeAgo>
        </UserInfo>
        <CommentText>Tôi muốn mua iPhone 15 128gb</CommentText>
        <ActionBar>
          <ActionButton>
            <LikeOutlined />
            <span>0</span>
          </ActionButton>
          <ActionButton>Trả lời</ActionButton>
        </ActionBar>
      </CommentContainer>

      {/* Reply */}
      <CommentContainer style={{ marginLeft: 48 }}>
        <UserInfo>
          <Avatar src="path-to-shopee-logo.png" />
          <Username>Ngô Hải Long</Username>
          <AdminBadge>Quản trị viên</AdminBadge>
          <TimeAgo>3 ngày trước</TimeAgo>
        </UserInfo>
        <CommentText>
          Chào anh Phon,
          <br /><br />
          Dạ, iPhone 15 128GB giá chỉ từ 18.890.000 đ giá này đã Giảm ngay 4,100,000đ áp dụng đến 06/02 và hỗ trợ Trả góp 0%, anh đang ở khu vực nào em hỗ trợ anh mua hàng luôn nha
          <br /><br />
          Bên em xin phép liên hệ để tư vấn chi tiết hơn. Nếu cần thêm thông tin khác anh (chị) gọi tổng đài miễn phí 18006601 hoặc có thể chat qua Zalo tại đây
          <br /><br />
          Thân mến!
        </CommentText>
        <ActionBar>
          <ActionButton>
            <LikeOutlined />
            <span>0</span>
          </ActionButton>
        </ActionBar>
      </CommentContainer>
    </>
  );
};

export default Comment;