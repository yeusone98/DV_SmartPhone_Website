import { CheckCircleFilled, ClockCircleFilled, MinusOutlined, PlusOutlined, SafetyCertificateFilled, StarFilled } from '@ant-design/icons'
import { Col, Divider, Image, Input, InputNumber, Row } from 'antd'
import React from 'react'
import imgProductSmall from '../../assets/images/iphone-16-pro-max-small.png'
import imgProduct from '../../assets/images/iphone-16-pro-max.png'
import { WrapeerStyleImage, WrapeerStyleImageSmall, WrapperAddCartBuyNow, WrapperBtnBuyNow, WrapperBtnInfoProduct, WrapperBtnQualityProduct, WrapperButtonAddCart, WrapperDetailInfoProduct, WrapperIconContainer, WrapperInputNumber, WrapperNameStyleNameProduct, WrapperPriceDiscountTextProduct, WrapperPriceTextProduct, WrapperQualityProduct, WrapperTextOptionProduct, WrapperTextPolicy, WrapperTextPolicySmall, WrapperTextSell } from './style'
import ButtonComponent from '../ButtonComponent/ButtonComponent'


const ProductDetailComponent = () => {
  return (
    <>
    <Row style={{padding: '16px', backgroundColor: '#fff', borderRadius: '8px'}}>
        <Col span={10} style={{border: '1px solid #919eab52', borderRadius: '8px',paddingRight:'30px'}} >
        <div style={{display: 'flex',justifyContent:'center'}}>
            <Image  src={imgProduct} alt='image product' preview={false}/>
        </div>
        <Row style={{paddingTop: '10px', justifyContent: 'space-between'}}>
            <WrapeerStyleImage span={4}>
            <WrapeerStyleImageSmall  src={imgProductSmall} alt='img small' preview={false}/>    
            </WrapeerStyleImage>
            <WrapeerStyleImage span={4}>
            <WrapeerStyleImageSmall src={imgProductSmall} alt='img small' preview={false}/>    
            </WrapeerStyleImage>  
            <WrapeerStyleImage span={4}>
            <WrapeerStyleImageSmall src={imgProductSmall} alt='img small' preview={false}/>    
            </WrapeerStyleImage>  
            <WrapeerStyleImage span={4}>
            <WrapeerStyleImageSmall src={imgProductSmall} alt='img small' preview={false}/>    
            </WrapeerStyleImage> 
            <WrapeerStyleImage span={4}>
            <WrapeerStyleImageSmall src={imgProductSmall} alt='img small' preview={false}/>    
            </WrapeerStyleImage>
            <WrapeerStyleImage span={4}>
            <WrapeerStyleImageSmall src={imgProductSmall} alt='img small' preview={false}/>    
            </WrapeerStyleImage> 
        </Row> 
        </Col>
        <Col span={14} style={{paddingLeft:'30px'}} >
            <WrapperNameStyleNameProduct>iPhone 16 Pro Max 256GB | Chính hãng VN/A</WrapperNameStyleNameProduct>
            <div>
            <StarFilled style={{ fontSize: "12px", color: "rgb(253,216,54" }} />
            <StarFilled style={{ fontSize: "12px", color: "rgb(253,216,54" }} />
            <StarFilled style={{ fontSize: "12px", color: "rgb(253,216,54" }} />
            <StarFilled style={{ fontSize: "12px", color: "rgb(253,216,54" }} />
            <StarFilled style={{ fontSize: "12px", color: "rgb(253,216,54" }} />
                <WrapperTextSell> Đã bán | 1000+</WrapperTextSell>
            </div>
            <WrapperPriceTextProduct>
                <h1>
                    31.000.000đ
                    <WrapperPriceDiscountTextProduct>40.000.000đ</WrapperPriceDiscountTextProduct>                  
                </h1>
            </WrapperPriceTextProduct>
            <div>
                <WrapperTextOptionProduct>Phiên bản</WrapperTextOptionProduct>
                <Input size='large' placeholder="iPhone 16 Pro Max 512Gb" />
            </div>
            <div style={{display: 'flex', gap: '10px', marginTop: '20px'}}>
                <WrapperTextOptionProduct>Số lượng</WrapperTextOptionProduct>
                <WrapperQualityProduct>
                    <button style={{border:'none',backgroundColor:'transparent'}}>
                        <MinusOutlined style={{color:'rgb(33, 43, 54)',fontSize:'16px'}} />
                    </button>
                        <WrapperInputNumber  min={1} style={{border:'none'}}  defaultValue={1} />
                    <button style={{border:'none',backgroundColor:'transparent'}}>
                        <PlusOutlined style={{color:'rgb(33, 43, 54)',fontSize:'16px'}} />   
                    </button>
                </WrapperQualityProduct>
            </div>
            <WrapperAddCartBuyNow >
                <WrapperButtonAddCart size='large' textButton='Thêm vào giỏ hàng'/>
                <WrapperBtnBuyNow size='large' textButton='Mua ngay'/>
            </WrapperAddCartBuyNow>

        </Col>

    </Row>
    <Row gutter={[16, 16]}>
        <Col span={8}>
            <WrapperIconContainer >
                     <CheckCircleFilled style={{ color: '#1877F2', fontSize:'36px'}} />
            <WrapperTextPolicy>
                100% Chính hãng
            </WrapperTextPolicy>
            <WrapperTextPolicySmall>
                Tất cả sản phẩm tại VD STORE đều là hàng chính hãng tại Việt Nam
            </WrapperTextPolicySmall>
            </WrapperIconContainer>
        </Col>
        <Col span={8}>
            <WrapperIconContainer>
                <ClockCircleFilled style={{ color: '#1877F2', fontSize:'36px'}}/>
                <WrapperTextPolicy>
                30 ngày đổi trả
                </WrapperTextPolicy>
                <WrapperTextPolicySmall>
                Cam kết đổi trả trong vòng 30 ngày nếu xảy ra lỗi
                </WrapperTextPolicySmall>
            </WrapperIconContainer>
        </Col>
        <Col span={8}>
            <WrapperIconContainer>
                <SafetyCertificateFilled style={{ color: '#1877F2', fontSize:'36px'}}/>
                <WrapperTextPolicy>
                Bảo hành chính hãng
                </WrapperTextPolicy>
                <WrapperTextPolicySmall>
                Sản phẩm được bảo hành chính hãng theo nhà sản xuất
                </WrapperTextPolicySmall>
            </WrapperIconContainer>
        </Col>  
    </Row>
    <WrapperDetailInfoProduct>
        <WrapperBtnInfoProduct type='text' textButton={'Thông số kĩ thuật'}/>
        <WrapperBtnInfoProduct type='text'textButton={'Mô tả sản phẩm'}/>
        <WrapperBtnInfoProduct type='text' textButton={'Video'}/>
        <WrapperBtnInfoProduct type='text' textButton={'Đánh giá'}/>
        <Divider />
    </WrapperDetailInfoProduct>
    </>
  )
}

export default ProductDetailComponent
