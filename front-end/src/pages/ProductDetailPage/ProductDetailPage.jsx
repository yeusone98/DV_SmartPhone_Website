import React from 'react'
import ProductDetailComponent from '../../components/ProductDetailComponent/ProductDetailComponent'
import FooterComponent from '../../components/FooterComponent/FooterComponent'
import { ProductOutlined } from '@ant-design/icons'

const ProductDetailPage = () => {
  return (
    <div style={{padding: '0 120px',backgroundColor: '#efefef', height: 'auto'}}>
      <div style={{fontWeight: '600',
  fontSize: '18px', paddingTop:'10px',paddingBottom: '10px'}}><ProductOutlined style={{fontSize:'24px',marginRight:'10px',color:'rgb(0, 69, 255)'}}/>Trang sản phẩm</div>
      <ProductDetailComponent/>
    </div>
  )
}

export default ProductDetailPage
