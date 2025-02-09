import React from 'react'
import FooterComponent from '../FooterComponent/FooterComponent'
import HeaderComponent from '../HeaderComponent/HeaderComponent'
import { MainContent, WrapperDefault } from './style'
import ContactButtonComponent from '../ContactButtonComponent/ContactButtonComponent'

const DefaultComponent = ({children}) => {
  return (
    <WrapperDefault>
      <HeaderComponent/>
        <MainContent>
        {children}
        </MainContent>
        <ContactButtonComponent/>
      <FooterComponent/>
    </WrapperDefault>
  )
}

export default DefaultComponent
