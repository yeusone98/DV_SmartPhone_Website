import React from 'react'
import TestComponent from '../../components/TestComponent/TestComponent'
import AdminDashboard from '../../components/TestComponent/TestComponent'
import CheckoutPage from '../../components/PaymentComponent/PaymentComponent'
import SearchComponent from '../../components/SearchComponent/SearchComponent'
import FloatingButtonComponent from '../../components/ContactButtonComponent/ContactButtonComponent'
import SocialMedia from '../../components/ContactButtonComponent/ContactButtonComponent'

function TestPage() {
  return (
    <div style={{padding: '0 120px',backgroundColor: '#efefef', height: '120px'}}>
      <FloatingButtonComponent/>
    </div>
  )
}

export default TestPage
