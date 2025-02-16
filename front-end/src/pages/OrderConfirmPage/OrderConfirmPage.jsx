import { useSearchParams } from 'react-router-dom';

const OrderConfirmationPage = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');
  const orderId = searchParams.get('orderId');

  return (
    <div className="confirmation-container">
      {status === 'success' ? (
        <div className="success-message">
          <h2>🎉 Thanh toán thành công!</h2>
          <p>Mã đơn hàng: <strong>{orderId}</strong></p>
        </div>
      ) : (
        <div className="error-message">
          <h2>❌ Thanh toán thất bại</h2>
          <p>Vui lòng thử lại hoặc liên hệ hỗ trợ</p>
          <button onClick={() => window.location.href = '/cart'}>
            Quay lại giỏ hàng
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmationPage;