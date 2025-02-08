import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchOrderByIdAPI } from '../../apis'
import OrderViewComponent from '../../components/OrderViewComponent/OrderViewComponent'
import { Spin, message } from 'antd'

const OrderViewPage = () => {
  const { orderId } = useParams()
  const [orderData, setOrderData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadOrderDetails = async () => {
      try {
        setLoading(true)
        const response = await fetchOrderByIdAPI(orderId)
        setOrderData(response)
      } catch (error) {
        message.error('Không thể tải chi tiết đơn hàng')
        console.error('Error fetching order:', error)
      } finally {
        setLoading(false)
      }
    }

    if (orderId) {
      loadOrderDetails()
    }
  }, [orderId])

  if (loading) {
    return <Spin size="large" className="flex justify-center mt-8" />
  }

  if (!orderData) {
    return <div className="text-center mt-8">Không tìm thấy đơn hàng</div>
  }

  // Format data cho component
  const formattedData = {
    orderId: orderData.orderNumber,
    orderDate: new Date(orderData.createdAt).toLocaleDateString(),
    status: orderData.status,
    customer: {
        name: orderData.full_name,
        phone: orderData.phone_number,
        address: `${orderData.address_detail}, ${orderData.ward}, ${orderData.district}, ${orderData.province}`
    },
    payment: {
        method: orderData.payment.method,
        status: orderData.payment.status,
        total: orderData.total_price.toLocaleString() + ' VNĐ'
    },
    items: orderData.products.map(product => ({
        product: product.product_name,
        price: product.unit_price.toLocaleString() + ' VNĐ',
        quantity: product.quantity,
        total: (product.unit_price * product.quantity).toLocaleString() + ' VNĐ',
        color: product.color,
        storage: product.storage,
        image: product.image_url
    })),
}

  return <OrderViewComponent orderData={formattedData} />
}

export default OrderViewPage