import React, { useState } from 'react'
import { WrapperCartComponent,SummaryContainer, StyledButton, WrapperTextCartSmall, Container, Row, TotalContainer, ContinueButton, TotalAmount, Note, CheckoutButton, WrapperNote, WrapperTextCartMidde, WrapperTextPrice, WrapperInfoProduct, WrapperInfoProductCart, WrapperStyleTable } from './style'
import { Button, Divider, InputNumber, Table } from 'antd'

const CartComponent = () => {
    const [cartItems, setCartItems] = useState([
        {
          key: '1',
          product: 'iPhone 11',
          image: 'https://via.placeholder.com/50', // Thay bằng link ảnh thật
          storage: '128GB',
          color: 'Đỏ',
          originalPrice: 21000000,
          discountedPrice: 19490000,
          quantity: 1,
        },
      ]);
    
      const columns = [
        {
          title: 'Sản phẩm',
          dataIndex: 'product',
          key: 'product',
          render: (text, record) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={record.image}
                alt={record.product}
                style={{ width: 50, marginRight: 10 }}
              />
              <div>
                <div>{text}</div>
                <div>{`${record.storage} | ${record.color}`}</div>
              </div>
            </div>
          ),
        },
        {
          title: 'Đơn giá',
          dataIndex: 'discountedPrice',
          key: 'discountedPrice',
          render: (price) => `${price.toLocaleString()} đ`,
        },
        {
          title: 'Số lượng',
          dataIndex: 'quantity',
          key: 'quantity',
          render: (quantity, record) => (
            <InputNumber
              min={1}
              max={10}
              value={quantity}
              onChange={(value) =>
                updateQuantity(record.key, value)
              }
            />
          ),
        },
        {
          title: 'Số tiền',
          dataIndex: 'total',
          key: 'total',
          render: (_, record) =>
            `${(record.discountedPrice * record.quantity).toLocaleString()} đ`,
        },
        {
          title: '',
          key: 'action',
          render: (_, record) => (
            <Button danger onClick={() => removeItem(record.key)}>
              Xóa
            </Button>
          ),
        },
      ];
    
      const updateQuantity = (key, quantity) => {
        const updatedItems = cartItems.map((item) =>
          item.key === key ? { ...item, quantity } : item
        );
        setCartItems(updatedItems);
      };
    
      const removeItem = (key) => {
        const updatedItems = cartItems.filter((item) => item.key !== key);
        setCartItems(updatedItems);
      };
    
      const totalPrice = cartItems.reduce(
        (total, item) => total + item.discountedPrice * item.quantity,
        0
      );

  return (
    <div style={{backgroundColor:'rgb(239, 239, 239)'}}>
        <WrapperCartComponent>
        <div style={{fontSize: '18px', fontWeight: '700', padding:'10px 0'}}>Chi tiết giỏ hàng</div>
        
        <WrapperStyleTable
            dataSource={cartItems}
            columns={columns}
            pagination={false}
            rowSelection={{
            type: 'checkbox',
            }}
        />
        
        <SummaryContainer>
            <WrapperTextCartSmall>
                <WrapperTextCartMidde>Tiết kiệm:</WrapperTextCartMidde><WrapperTextPrice>{`${(cartItems[0]?.originalPrice - cartItems[0]?.discountedPrice).toLocaleString()} đ`}</WrapperTextPrice> 
            </WrapperTextCartSmall>
            <WrapperTextCartSmall>
            <WrapperTextCartMidde>Tổng đơn hàng:</WrapperTextCartMidde> <WrapperTextPrice>{`${totalPrice.toLocaleString()} đ`}</WrapperTextPrice>
            </WrapperTextCartSmall>
            <Divider />
            <TotalContainer>
                <ContinueButton type="text">← Tiếp tục mua hàng</ContinueButton>
                    <div>
                        <span>Tổng tiền: </span>
                        <TotalAmount>{`${totalPrice.toLocaleString()} đ`}</TotalAmount>
                        <WrapperNote>(Bao gồm thuế VAT)</WrapperNote>
                    </div>
                <CheckoutButton size='large' type="primary">Thanh toán</CheckoutButton>
            </TotalContainer>
            
        </SummaryContainer>

       
        </WrapperCartComponent>
    </div>
    
  )
}

export default CartComponent
