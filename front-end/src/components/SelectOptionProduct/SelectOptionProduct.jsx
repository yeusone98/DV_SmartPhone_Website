import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import {VariantItem,VariantInfo,PreviewContainer,ColorPreview,SizePreview,PriceContainer,CurrentPrice,OriginalPrice,VariantContainer,DropdownTrigger } from './style'


const SelectOptionProduct = () => {
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
        overlayStyle={{ width: '500px'}}
      >
        <DropdownTrigger>
          <span>{selectedVariant}</span>
          <DownOutlined />
        </DropdownTrigger>
      </Dropdown>
    </VariantContainer>
  );
};

export default SelectOptionProduct;