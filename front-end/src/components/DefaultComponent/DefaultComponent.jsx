import React from 'react'
import FooterComponent from '../FooterComponent/FooterComponent'
import HeaderComponent from '../HeaderComponent/HeaderComponent'
import { MainContent, WrapperDefault } from './style'
import ContactButtonComponent from '../ContactButtonComponent/ContactButtonComponent'
import ScrollToTopComponent from '../ScrollToTopComponent/ScrollToTopComponent'

const DefaultComponent = ({children}) => {

  
  return (
    <WrapperDefault>
      <HeaderComponent/>
        <MainContent>
        {children}
        </MainContent>
        <ContactButtonComponent/>
        <ScrollToTopComponent/>
      <FooterComponent/>
    </WrapperDefault>
  )
}

export default DefaultComponent
