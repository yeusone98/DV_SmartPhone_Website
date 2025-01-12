//Current IP Address (222.253.125.140/32) added!


// Import các thư viện cần thiết từ package `mongodb`
import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

// Khai báo biến để lưu trữ instance của cơ sở dữ liệu MongoDB sau khi kết nối
let trelloDatabaseInstance = null

// Tạo một instance của MongoClient với chuỗi URI và các tùy chọn API
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
    // Cấu hình phiên bản API của MongoDB
    serverApi: {
        version: ServerApiVersion.v1, // Sử dụng phiên bản API v1 để đảm bảo tính ổn định
        strict: true, // Bật chế độ nghiêm ngặt, giúp kiểm tra chặt chẽ các tham số
        deprecationErrors: true // Bật báo lỗi cho các tính năng đã lỗi thời
    }
})

// Hàm kết nối tới cơ sở dữ liệu MongoDB
export const CONNECT_DB = async() => {
    // Thực hiện kết nối với MongoDB, dùng `await` để đảm bảo kết nối hoàn thành trước khi tiếp tục
    await mongoClientInstance.connect()

    // Khởi tạo instance của cơ sở dữ liệu MongoDB dựa trên tên cơ sở dữ liệu
    // Lưu vào `trelloDatabaseInstance` để dùng cho các thao tác trên database này
    trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

1
// Hàm lấy instance của cơ sở dữ liệu MongoDB
export const GET_DB = () => {
    // Kiểm tra xem đã kết nối đến cơ sở dữ liệu chưa
    if (!trelloDatabaseInstance) throw new Error('Must connect to Database First!')
    return trelloDatabaseInstance // Nếu đã kết nối, trả về instance của cơ sở dữ liệu để có thể sử dụng
}

//Đóng kết nối tới Database khi cần
export const CLOSE_DB = async() => {
    await mongoClientInstance.close()
}