import { StatusCodes } from 'http-status-codes'
import { GET_DB } from '~/config/mongodb'

const getDashboardData = async (req, res, next) => {
    try {
    // Tổng doanh thu
        const revenueResult = await GET_DB().collection('orders').aggregate([
            { $group: { _id: null, totalRevenue: { $sum: '$total_price' } } }
        ]).toArray()
        const totalRevenue = revenueResult[0]?.totalRevenue || 0

        // Tổng số đơn hàng
        const totalOrders = await GET_DB().collection('orders').countDocuments()

        // Tổng số khách hàng
        const totalCustomers = await GET_DB().collection('users').countDocuments({ role: 'client' })

        // Tổng số sản phẩm
        const totalProducts = await GET_DB().collection('products').countDocuments()

        // Trả về các giá trị này
        res.status(StatusCodes.OK).json({
            totalRevenue,
            totalOrders,
            totalCustomers,
            totalProducts
        })
    } catch (error) {
        console.error('Error fetching dashboard data:', error)
        next(error)
    }
}

export const dashboardController = {
    getDashboardData
}
