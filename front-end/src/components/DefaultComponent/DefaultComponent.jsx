import React from 'react'
import HeaderComponent from '../HeaderComponent/HeaderComponent'
import FooterComponent from '../FooterComponent/FooterComponent'
import { WrapperDefault, WrapperDefaultMain } from './style'

const DefaultComponent = ({children}) => {
  return (
    <WrapperDefault>
      <WrapperDefaultMain>
      <HeaderComponent/>
        {children}
      <FooterComponent/>
      </WrapperDefaultMain>
    </WrapperDefault>
  )
}

export default DefaultComponent
