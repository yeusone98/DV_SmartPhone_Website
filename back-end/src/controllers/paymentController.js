import crypto from 'crypto' 
import moment from 'moment' 
import { env } from '~/config/environment' 

const createVNPayPayment = async (req, res) => {
    try {
        const { orderId, amount, bankCode } = req.body 

        // Cấu hình tham số
        const vnp_Params = {
            vnp_Version: '2.1.0',
            vnp_Command: 'pay',
            vnp_TmnCode: env.VNP_TMN_CODE,
            vnp_Locale: 'vn',
            vnp_CurrCode: 'VND',
            vnp_TxnRef: orderId,
            vnp_OrderInfo: `Thanh toán đơn hàng ${orderId}`,
            vnp_OrderType: 'billpayment',
            vnp_Amount: amount * 100, // VNPay yêu cầu đơn vị là VND x 100
            vnp_ReturnUrl: env.VNP_RETURN_URL,
            vnp_IpAddr: req.ip,
            vnp_CreateDate: moment().format('YYYYMMDDHHmmss'),
        } 

        // Nếu có chọn ngân hàng thì thêm vào params
        if (bankCode) {
            vnp_Params['vnp_BankCode'] = bankCode 
        }

        const sortedParams = sortParams(vnp_Params);

        const urlParams = new URLSearchParams();
        for (let [key, value] of Object.entries(sortedParams)) {
            urlParams.append(key, value);
        }

        const querystring = urlParams.toString();

        const hmac = crypto.createHmac('sha512', env.VNP_HASH_SECRET);
        const signed = hmac.update(querystring).digest('hex');

        urlParams.append('vnp_SecureHash', signed);

        const paymentUrl = `${env.VNP_URL}?${urlParams.toString()}`;

        
        return res.status(200).json({ paymentUrl }) 
    } catch (error) {
        console.error('Lỗi tạo thanh toán VNPay:', error) 
        res.status(500).json({ message: 'Không thể tạo thanh toán' }) 
    }
} 

const vnpayReturn = (req, res) => {
    try {
        const vnp_Params = req.query 
        const secureHash = vnp_Params['vnp_SecureHash'] 
        delete vnp_Params['vnp_SecureHash'] 
        delete vnp_Params['vnp_SecureHashType'] 

        const sortedParams = sortParams(vnp_Params);

        const urlParams = new URLSearchParams();
        for (let [key, value] of Object.entries(sortedParams)) {
            urlParams.append(key, value);
        }

        const querystring = urlParams.toString();

        const hmac = crypto.createHmac('sha512', env.VNP_HASH_SECRET);
        const signed = hmac.update(querystring).digest('hex');

        urlParams.append('vnp_SecureHash', signed);

        // Kiểm tra chữ ký hợp lệ
        if (secureHash === signed) {
            if (vnp_Params['vnp_ResponseCode'] === '00') {
                return res.status(200).json({ message: 'Thanh toán thành công', data: vnp_Params }) 
            } else {
                return res.status(400).json({ message: 'Thanh toán thất bại', data: vnp_Params }) 
            }
        } else {
            return res.status(400).json({ message: 'Chữ ký không hợp lệ' }) 
        }
    } catch (error) {
        console.error('Lỗi xử lý phản hồi VNPay:', error) 
        res.status(500).json({ message: 'Lỗi xử lý thanh toán' }) 
    }
}
function sortParams(obj) {
    const sortedObj = Object.entries(obj)
      .filter(
        ([key, value]) => value !== '' && value !== undefined && value !== null
      )
      .sort(([key1], [key2]) => key1.toString().localeCompare(key2.toString()))
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
  
    return sortedObj;
  }

export const paymentController = {
    createVNPayPayment,
    vnpayReturn,
};

