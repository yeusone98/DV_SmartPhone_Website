import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import styled from 'styled-components';

const VariantContainer = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 16px;
`;

const DropdownTrigger = styled.div`
  width: 100%;
  padding: 12px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background: white;

  &:hover {
    border-color: #4096ff;
  }
`;

const VariantItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }

  ${props => props.selected && `
    background-color: #e6f4ff;
  `}
`;

const ColorPreview = styled.div`
  width: 32px;
  height: 48px;
  border-radius: 4px;
  border: 1px solid ${props => props.color === '#FFFFFF' ? '#E5E7EB' : props.color};
  background-color: ${props => props.color};
`;

const SizePreview = styled.div`
  width: 32px;
  height: 48px;
  margin-left: 4px;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

const PreviewContainer = styled.div`
  display: flex;
  align-items: center;
`;

const VariantInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const PriceContainer = styled.div`
  text-align: right;
`;

const CurrentPrice = styled.div`
  color: #ff4d4f;
  font-weight: 500;
`;

const OriginalPrice = styled.div`
  color: #bfbfbf;
  text-decoration: line-through;
  font-size: 12px;
`;

const TestComponent = () => {
  const [selectedVariant, setSelectedVariant] = useState('128GB | Đỏ');

  const variants = [
    { id: 1, name: '128GB | Đỏ', price: 19490000, originalPrice: 21000000, color: '#FF0000' },
    { id: 2, name: '128GB | Xanh lá', price: 19490000, originalPrice: 23000000, color: '#90EE90' },
    { id: 3, name: '128GB | Tím', price: 19490000, originalPrice: 25000000, color: '#800080' },
    { id: 4, name: '128GB | Đen', price: 19490000, originalPrice: 23000000, color: '#000000' },
    { id: 5, name: '128GB | Trắng', price: 19490000, originalPrice: 24000000, color: '#FFFFFF' },
    { id: 6, name: '128GB | Vàng', price: 19490000, originalPrice: 24000000, color: '#FFD700' },
  ];

  const items = variants.map(variant => ({
    key: variant.id,
    label: (
      <VariantItem selected={selectedVariant === variant.name}>
        <VariantInfo>
          <PreviewContainer>
            <ColorPreview color={variant.color} />
            <SizePreview />
          </PreviewContainer>
          <span>{variant.name}</span>
        </VariantInfo>
        <PriceContainer>
          <CurrentPrice>{variant.price.toLocaleString()}đ</CurrentPrice>
          <OriginalPrice>{variant.originalPrice.toLocaleString()}đ</OriginalPrice>
        </PriceContainer>
      </VariantItem>
    ),
    onClick: () => setSelectedVariant(variant.name),
  }));

  return (
    <VariantContainer>
      <Dropdown
        menu={{ items }}
        trigger={['click']}
        placement="bottomLeft"
        overlayStyle={{ width: '100%' }}
      >
        <DropdownTrigger>
          <span>{selectedVariant}</span>
          <DownOutlined />
        </DropdownTrigger>
      </Dropdown>
    </VariantContainer>
  );
};

export default TestComponent;