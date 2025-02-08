import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { 
  VariantItem, 
  VariantInfo, 
  PreviewContainer, 
  SizePreview, 
  PriceContainer, 
  CurrentPrice, 
  OriginalPrice, 
  VariantContainer, 
  DropdownTrigger 
} from './style';

const SelectOptionProduct = ({ variants, selectedVariant, onSelectVariant, productName }) => {
  const items = variants.map((variant, index) => ({
    key: index,
    label: (
      <VariantItem selected={selectedVariant?.id === variant.id}>
        <VariantInfo>
          <PreviewContainer>
            <img 
              src={variant.images[0]} 
              alt={`${variant.color} variant`}
              style={{ width: '40px', height: '40px', objectFit: 'cover' }}
            />
          </PreviewContainer>
          <span> {productName} {variant.storage} GB | {variant.color}</span>
        </VariantInfo>
        <PriceContainer>
          <CurrentPrice>{variant.price.toLocaleString()}đ</CurrentPrice>
          {variant.price_discount && (
            <OriginalPrice>{variant.price_discount.toLocaleString()}đ</OriginalPrice>
          )}
        </PriceContainer>
      </VariantItem>
    ),
    onClick: () => onSelectVariant(variant),
  }));

  return (
    <VariantContainer>
      <Dropdown
        menu={{ items }}
        trigger={['click']}
        placement="bottomLeft"
        overlayStyle={{ width: '500px' }}
      >
        <DropdownTrigger>
          {selectedVariant ? (
            <>
              <img 
                src={selectedVariant.images[0]} 
                alt="selected variant" 
                style={{ width: '20px', height: '20px', marginRight: '8px' }}
              />
              {productName} {selectedVariant.storage} GB | {selectedVariant.color}
              {selectedVariant.price_discount ? (
                <>
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    {selectedVariant.price_discount.toLocaleString()}đ
                  </span>
                  <span style={{ textDecoration: "line-through", color: "gray", marginLeft: "8px" }}>
                    {selectedVariant.price.toLocaleString()}đ
                  </span>
                </>
              ) : (
                <span>{selectedVariant.price.toLocaleString()}đ</span>
              )}
            </>
          ) : 'Chọn phiên bản'}
          <DownOutlined />
        </DropdownTrigger>
      </Dropdown>
    </VariantContainer>
  );
};

export default SelectOptionProduct;