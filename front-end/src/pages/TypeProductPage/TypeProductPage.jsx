import { Col, Pagination, Row } from 'antd'
import React from 'react'
import CardComponent from '../../components/CardComponent/CardComponent'
import NavBarComponent from '../../components/NavBarComponent/NavBarComponent'
import { WrapperNavBar,WrapperProducts } from './style'

const TypeProductPage = () => {
  return (
    <div style={{padding:'0 120px', backgroundColor: '#efefef'}}>
    <Row style={{paddingTop: '20px',flexWrap: 'nowrap'}}>
        <WrapperNavBar span={4}>
          <NavBarComponent/>
        </WrapperNavBar>
        <Col span={20}>
          <WrapperProducts >
            <CardComponent/>
            <CardComponent/>
            <CardComponent/>
            <CardComponent/>
            <CardComponent/>
            <CardComponent/>
            <CardComponent/>
            <CardComponent/>
            <CardComponent/>
            <CardComponent/>
          </WrapperProducts>
          <Pagination  style={{marginTop: '10px', textAlign:'center', justifyContent:'center'}} defaultCurrent={2} total={50}  />
        </Col>
    </Row>
    </div>
    
    
  )
}

export default TypeProductPage
