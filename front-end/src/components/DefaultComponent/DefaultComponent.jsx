import React from 'react'
import FooterComponent from '../FooterComponent/FooterComponent'
import HeaderComponent from '../HeaderComponent/HeaderComponent'
import { MainContent, WrapperDefault } from './style'

const DefaultComponent = ({children}) => {
  return (
    <WrapperDefault>
      <HeaderComponent/>
        <MainContent>
        {children}
        </MainContent>
      {/* <FooterComponent/> */}
    </WrapperDefault>
  )
}

export default DefaultComponent
