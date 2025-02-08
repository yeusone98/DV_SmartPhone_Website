import React, { useState, useEffect } from "react";
import {
  WrapperCartComponent,
  SummaryContainer,
  WrapperTextCartSmall,
  WrapperTextCartMidde,
  WrapperTextPrice,
  WrapperStyleTable,
  TotalContainer,
  ContinueButton,
  TotalAmount,
  WrapperNote,
  CheckoutButton,
} from "./style";
import { Button, Divider, InputNumber, Table, message } from "antd";
import { fetchCartAPI, updateCartItemAPI, removeCartItemAPI } from "../../apis";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { setCart, updateCartQuantity } from "../../features/cart/cartSlice";


const CartComponent = () => {
  const [cartItems, setCartItems] = useState([]);
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // Load giỏ hàng khi component mount
  useEffect(() => {
    if (currentUser) {
      loadCart();
    }
  }, [currentUser]);

  const loadCart = async () => {
    try {
      const cart = await fetchCartAPI();
      if (!cart || !cart.products) {
        console.error("API trả về giỏ hàng rỗng:", cart);
        return;
      }
      const formattedCart = cart.products.map((item) => ({
        key: `${item.product_id}_${item.storage}_${item.color}`,
        product_id: item.product_id,
        product: item.product_name || "Sản phẩm không xác định",
        image: item.image_url || "https://via.placeholder.com/50",
        storage: item.storage || "Không xác định",
        color: item.color || "Không xác định",
        unit_price: Number(item.unit_price) || 0,
        quantity: Number(item.quantity) || 1,
        total_price_per_product:
          (Number(item.unit_price) || 0) * (Number(item.quantity) || 1),
      }));
  
      setCartItems(formattedCart);
  
      // Cập nhật Redux Store
      dispatch(setCart(formattedCart));
    } catch (error) { 
      console.error(" Lỗi khi tải giỏ hàng:", error);
      message.error("Không thể tải giỏ hàng, vui lòng thử lại sau.");
    }
  };

    const updateQuantity = async (key, newQuantity) => {
      if (newQuantity < 1) return;

      setCartItems((items) =>
          items.map((item) =>
              item.key === key
                  ? {
                      ...item,
                      quantity: newQuantity,
                      total_price_per_product: item.unit_price * newQuantity
                  }
                  : item
          )
      );

      const product = cartItems.find((item) => item.key === key);
      if (!product) return;

      try {
          await updateCartItemAPI({
              product_id: product.product_id,
              color: product.color,
              storage: product.storage,
              quantity: newQuantity
          });

          loadCart(); // Load lại giỏ hàng sau khi cập nhật thành công
          message.success("Cập nhật số lượng thành công!");
      } catch (error) {
          console.error("Lỗi cập nhật số lượng:", error);
          message.error("Không thể cập nhật số lượng sản phẩm!");
      }
  };


  const removeItem = async (key, productId, color, storage) => {
    console.log(" removeItem sending:", { productId, color, storage });

    try {
        await removeCartItemAPI({ product_id: productId, color, storage });

        // Gọi API để lấy lại giỏ hàng sau khi xóa
        loadCart();

        message.success(" Sản phẩm đã được xóa khỏi giỏ hàng!");
    } catch (error) {
        console.error(" Error removing item:", error);
        message.error(" Không thể xóa sản phẩm!");
    }
};

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.total_price_per_product,
    0
  );

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "product",
      key: "product",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={record.image}
            alt={record.product}
            style={{ width: 50, marginRight: 10 }}
          />
          <div>
            <div style={{ fontWeight: "normal" }}>
              {text} {`${record.storage} GB ${record.color}`}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "unit_price",
      key: "unit_price",
      render: (price) => `${price.toLocaleString()} đ`,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) => (
          <InputNumber
              min={1}
              max={10}
              value={quantity}
              onChange={(value) => updateQuantity(record.key, value)}
          />
      ),
    },
    {
      title: "Số tiền",
      key: "total_price_per_product",
      render: (_, record) =>
        `${(record.unit_price * record.quantity).toLocaleString()} đ`,
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Button
          danger
          onClick={() =>
            removeItem(record.key, record.product_id, record.color, record.storage)
          }
        >
          Xóa
        </Button>
      ),
    },
  ];

  const handleCheckout = () => {
    const cartData = { cartItems, totalPrice };  // Dữ liệu giỏ hàng
    navigate('/checkout', { state: cartData });  // Gửi dữ liệu vào state
  };

  return (
    <div style={{ backgroundColor: "rgb(239, 239, 239)" }}>
      <WrapperCartComponent>
        <div style={{ fontSize: "18px", fontWeight: "700", padding: "10px 0" }}>
          Chi tiết giỏ hàng
        </div>

        <WrapperStyleTable
          dataSource={cartItems}
          columns={columns}
          pagination={false}
        />

        <SummaryContainer>
          <TotalContainer>
            <ContinueButton type="text" onClick={() => navigate("/")}>
              ← Tiếp tục mua hàng
            </ContinueButton>
            <div>
              <span>Tổng tiền: </span>
              <TotalAmount>{`${totalPrice.toLocaleString()} đ`}</TotalAmount>
              <WrapperNote>(Bao gồm thuế VAT)</WrapperNote>
            </div>
            <CheckoutButton size="large" type="primary" onClick={handleCheckout}>
              Thanh toán
            </CheckoutButton>
          </TotalContainer>
        </SummaryContainer>
      </WrapperCartComponent>
    </div>
  );
};

export default CartComponent;
