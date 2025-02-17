import { Image } from 'antd';
import Typography from 'antd/es/typography/Typography';
import React from 'react';
import empty_state from '../../assets/images/empty_state.png'

const EmptySearchResults = ({ searchTerm }) => {
  return (
    <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <Image
          src={empty_state}
          alt="No results"
          preview={false}
          style={{ marginBottom: '16px' }}
        />
        <Typography.Text strong style={{ display: 'block' }}>
          Tiếc quá! Chúng tôi không tìm thấy kết quả với từ khóa "<span strong style={{color:'red'}}>{searchTerm}</span>"
        </Typography.Text>
        </div>
  );
};

export default EmptySearchResults;