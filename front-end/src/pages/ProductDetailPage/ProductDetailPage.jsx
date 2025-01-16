import React from 'react'
import ProductDetailComponent from '../../components/ProductDetailComponent/ProductDetailComponent'
import FooterComponent from '../../components/FooterComponent/FooterComponent'

const ProductDetailPage = () => {
  return (
    <div style={{padding: '0 120px',backgroundColor: '#efefef', height: '100vh'}}>
      <h1>Trang sản phẩm</h1>
      <ProductDetailComponent/>
    </div>
  )
}

export default ProductDetailPage
