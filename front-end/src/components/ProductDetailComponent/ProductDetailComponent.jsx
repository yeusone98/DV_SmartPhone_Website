import Icon, {
  BorderlessTableOutlined,
  CheckCircleFilled,
  ClockCircleFilled,
  EditFilled,
  EditOutlined,
  LikeFilled,
  LikeOutlined,
  MinusOutlined,
  PlusOutlined,
  SafetyCertificateFilled,
  StarFilled,
  DeleteOutlined,
  ProductOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Divider,
  Image,
  Input,
  InputNumber,
  Rate,
  Row,
  message,
} from "antd";
import React, { useState, useEffect,useRef } from "react";
import imgProduct from "../../assets/images/iphone-16-pro-max.png";
import {
  AverageRating,
  HelpfulButton,
  QuantityButton,
  QuantityContainer,
  QuantityControl,
  ReviewAuthor,
  ReviewBody,
  ReviewCard,
  ReviewContent,
  ReviewDate,
  ReviewerName,
  ReviewHeader,
  ReviewItem,
  SpaceReview,
  TabButton,
  TabContainer,
  TextSameProducts,
  TextTitleReview,
  TotalReviews,
  VerifiedBadge,
  ViewMoreButton,
  ViewTextRate,
  WrapeerStyleImage,
  WrapeerStyleImageSmall,
  WrapperAddCartBuyNow,
  WrapperAdReply,
  WrapperBtnBuyNow,
  WrapperBtnInfoProduct,
  WrapperBtnQualityProduct,
  WrapperBtnWriteReview,
  WrapperButtonAddCart,
  WrapperCustomerReview,
  WrapperDescription,
  WrapperDetailInfoProduct,
  WrapperIconContainer,
  WrapperInputNumber,
  WrapperNameStyleNameProduct,
  WrapperPriceDiscountTextProduct,
  WrapperPriceTextProduct,
  WrapperProductDetailPage,
  WrapperQualityProduct,
  WrapperRateStar,
  WrapperReviews,
  WrapperSpecifications,
  WrapperSpecs,
  WrapperTabBtn,
  WrapperTextOptionProduct,
  WrapperTextPolicy,
  WrapperTextPolicySmall,
  WrapperTextSell,
} from "./style";


import SelectOptionProduct from "../SelectOptionProduct/SelectOptionProduct";
import { useParams } from "react-router-dom";
import { fetchProductByIdAPI, addToCartAPI, fetchCartAPI, updateCartItemAPI, fetchReviewsAPI, createReviewAPI, deleteReviewAPI, addReplyAPI, deleteReplyAPI  } from "../../apis";
import { useSelector } from "react-redux";
import { selectCurrentUser } from '../../features/user/userSlice';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, increaseQuantity } from "../../features/cart/cartSlice"; 

import imgNull from "../../assets/images/facebook.png";
import ProductComparisonComponent from "../ProductComparisonComponent/ProductComparisonComponent";

const ProductDetailComponent = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("review");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const currentUser = useSelector(selectCurrentUser) // Lấy thông tin người dùng từ Redux
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState(""); // Nội dung đánh giá mới
  const [reviewRating, setReviewRating] = useState(5); // Số sao mặc định
  const [replyText, setReplyText] = useState({}); // Nội dung phản hồi
  const [showReplyForm, setShowReplyForm] = useState({}); // Hiển thị form phản hồi

  const reviewInputRef = useRef(null);

  useEffect(() => {
      if (reviewInputRef.current) {
          reviewInputRef.current.focus({ cursor: "end" }); // Giữ vị trí con trỏ cuối
      }
  }, [reviewText]);
 
  // 🎯 **Gọi API để lấy danh sách đánh giá**
  useEffect(() => {
    const fetchProductAndReviews = async () => {
      try {
        const productData = await fetchProductByIdAPI(id);
        setProduct(productData);

        const reviewData = await fetchReviewsAPI(id);
        setReviews(reviewData);
      } catch (error) {
        message.error("Không thể tải dữ liệu sản phẩm hoặc đánh giá!");
      }
    };

    fetchProductAndReviews();
  }, [id]);

  // 🎯 **Xử lý thêm đánh giá mới**
  const handleAddReview = async () => {
    if (!currentUser) {
        message.error("Bạn cần đăng nhập để thêm đánh giá!");
        navigate("/login");
        return;
    }

    if (!reviewText.trim()) {
        message.error("Vui lòng nhập nội dung đánh giá!");
        return;
    }

    try {
        await createReviewAPI({
            product_id: id,
            rating: reviewRating,
            comment: reviewText
        });

        //setReviewText(""); // Reset nội dung

        // Gọi lại API để cập nhật danh sách đánh giá
        const updatedReviews = await fetchReviewsAPI(id);
        setReviews(updatedReviews);
        setReviewText(""); // Reset nội dung
        message.success("Đánh giá đã được thêm thành công!");
    } catch (error) {
        message.error("Lỗi khi thêm đánh giá!");
    }
};


  // 🎯 **Xử lý xóa đánh giá**
  const handleDeleteReview = async (reviewId) => {
    if (!currentUser) return;

    try {
      await deleteReviewAPI(reviewId);
      setReviews(reviews.filter((r) => r._id !== reviewId)); // Cập nhật danh sách review
      message.success("Xóa đánh giá thành công!");
    } catch (error) {
      message.error("Lỗi khi xóa đánh giá!");
    }
  };

  // 🎯 **Xử lý thêm phản hồi**
  const handleReply = async (reviewId) => {
    if (!currentUser || currentUser.role !== "admin") return;

    if (!replyText[reviewId]?.trim()) {
      message.error("Vui lòng nhập nội dung phản hồi!");
      return;
    }

    try {
      const replyData = { reply: replyText[reviewId] };
      await addReplyAPI(reviewId, replyData);

      setReviews(reviews.map((r) =>
        r._id === reviewId
          ? { ...r, replies: [...r.replies, { admin_name: currentUser.displayName, reply: replyText[reviewId] }] }
          : r
      ));

      setReplyText({ ...replyText, [reviewId]: "" }); // Reset nội dung
      message.success("Phản hồi đã được gửi thành công!");
      // Gọi lại API để cập nhật danh sách đánh giá
      const updatedReviews = await fetchReviewsAPI(id);
      setReviews(updatedReviews);
    } catch (error) {
      message.error("Lỗi khi gửi phản hồi!");
    }
  };

  const handleDeleteReply = async (reviewId, replyIndex) => {
    if (!currentUser || currentUser.role !== "admin") return;

    try {
        await deleteReplyAPI(reviewId, replyIndex);

        setReviews(reviews.map(review =>
            review._id === reviewId
                ? { ...review, replies: review.replies.filter((_, index) => index !== replyIndex) }
                : review
        ));

        message.success("Xóa phản hồi thành công!");
    } catch (error) {
        message.error("Lỗi khi xóa phản hồi!");
    }
  };



  useEffect(() => {
    const fetchProduct = async () => {
      const data = await fetchProductByIdAPI(id);
      setProduct(data);
      // Set variant mặc định khi load data
      if (data?.variants?.length > 0) {
        setSelectedVariant(data.variants[0]);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSelectVariant = (variant) => {
    setSelectedVariant(variant);
  };

  //!aaaaaaaaaaaaa
  const handleIncrease = (product) => {
    dispatch(increaseQuantity({ 
      product_id: product._id, 
      color: product.selectedColor, 
      storage: product.selectedStorage 
    }));
  };
  
  // Lấy giỏ hàng nếu đã đăng nhập
  const fetchCart = async () => {
    if (!currentUser) return // Nếu chưa đăng nhập, không cần lấy giỏ hàng
    try {
      const cart = await fetchCartAPI()
      const totalItems =
        cart?.products?.reduce((sum, product) => sum + product.quantity, 0) || 0
      setCartCount(totalItems)
    } catch (error) {
      console.error('Không thể tải giỏ hàng:', error)
    }
  }
  //Hiển thị form phản hồi
  const toggleReplyForm = (reviewId) => {
    setShowReplyForm((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId], // Đảo trạng thái hiển thị form
    }));
  };

    // Thêm sản phẩm vào giỏ hàng
    const handleAddToCart = async () => {
      if (!currentUser) {
          message.error("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
          navigate("/login");
          return;
      }
  
      // Lấy giỏ hàng hiện tại để kiểm tra sản phẩm đã tồn tại hay chưa
      try {
        
          const cart = await fetchCartAPI();
          const existingProduct = cart.products.find(
              (item) =>
                  item.product_id === product._id &&
                  item.color === selectedVariant.color &&
                  item.storage === String(selectedVariant.storage)
          );
  
          if (existingProduct) {
              // Nếu sản phẩm đã tồn tại, cập nhật số lượng
              const newQuantity = existingProduct.quantity + Number(quantity);
              
              await updateCartItemAPI({
                  product_id: product._id,
                  color: selectedVariant.color,
                  storage: String(selectedVariant.storage), 
                  quantity: newQuantity,
              });
  
              message.success("Cập nhật số lượng sản phẩm thành công!");
          } else {
              // Nếu sản phẩm chưa có, thêm mới vào giỏ hàng
              const payload = {
                  id: product._id,
                  color: selectedVariant.color,
                  storage: String(selectedVariant.storage),
                  unit_price: Number(selectedVariant.price_discount || selectedVariant.price),
                  quantity: Number(quantity) || 1,
              };
              await addToCartAPI(payload);
              message.success("Thêm vào giỏ hàng thành công!");
          }
          // dispatch(increaseQuantity(Number(quantity) || 1));
          fetchCart(); // Load lại giỏ hàng sau khi cập nhật
          dispatch(addToCart({ 
            product: {
              product_id: product._id,
              color: selectedVariant.color,
              storage: String(selectedVariant.storage),
              unit_price: Number(selectedVariant.price_discount || selectedVariant.price),
            },
            quantity: quantity
          }));
      } catch (error) {
          message.error("Thao tác thất bại, vui lòng thử lại!");
          console.error("Error in handleAddToCart:", error);
      }
  };
  const handleBuyNow = () => {
    if (!currentUser) {
        message.error("Bạn cần đăng nhập để mua hàng!");
        navigate("/login");
        return;
    }

    if (!selectedVariant) {
        message.error("Vui lòng chọn phiên bản sản phẩm!");
        return;
    }

    // Kiểm tra số lượng tồn kho
    if (selectedVariant.stock < quantity) {
        message.error("Số lượng sản phẩm không đủ!");
        return;
    }

    const productItem = {
        product_id: product._id,
        product_name: product.name,
        image_url: selectedVariant.images[0],
        color: selectedVariant.color,
        storage: selectedVariant.storage,
        quantity: quantity,
        unit_price: selectedVariant.price_discount || selectedVariant.price,
        total_price_per_product: (selectedVariant.price_discount || selectedVariant.price) * quantity
    };

    navigate("/checkout", {
        state: {
            productItems: [productItem],
            totalPrice: productItem.total_price_per_product,
            isBuyNow: true
        }
    });
};



  
  // Xử lý phần re-render text khi nhập nội dung đánh giá
  const handleTextChange = (e) => {
    setReviewText(e.target.value);
  };
    

  if (!product || !selectedVariant) return <div>Loading...</div>;

  const firstVariant = product.variants[0];
  const mainImage = firstVariant?.images?.[0] || imgProduct;

  const ReviewForm = ({ onCancel }) => (
    <ReviewCard>
      <h3 style={{ fontSize: "16px", marginBottom: "16px", fontWeight: "700" }}>
        Thêm đánh giá
      </h3>
      <div style={{ marginBottom: "16px" }}>
        <Rate 
          value={reviewRating} 
          onChange={setReviewRating} 
          style={{ color: "rgb(241, 165, 0)" }}
        />
      </div>
      <Input.TextArea
        ref={reviewInputRef}
        placeholder="Nhập nội dung đánh giá *"
        style={{ marginBottom: "16px" }}
        rows={4}
        value={reviewText || ""}
        onChange={handleTextChange}
        
      />
      <div style={{ textAlign: "right" }}>
        <Button onClick={onCancel} style={{ marginRight: "8px" }}>
          Huỷ
        </Button>
        <Button type="primary" onClick={handleAddReview}>Gửi đánh giá</Button>
      </div>
    </ReviewCard>
  );

  // Hàm tính rating trung bình
  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };


  return (
    <WrapperProductDetailPage>
            <div style={{fontWeight: '600',
        fontSize: '18px', paddingTop:'10px',paddingBottom: '10px'}}><ProductOutlined style={{fontSize:'24px',marginRight:'10px',color:'rgb(0, 69, 255)'}}/>Trang sản phẩm</div>
      <Row style={{ padding: "16px", backgroundColor: "#fff", borderRadius: "8px" }}>
        {/* Phần hình ảnh */}
        <Col span={10} style={{padding:'20px', border: "1px solid #919eab52", borderRadius: "8px", paddingRight: "30px" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Image src={selectedVariant.images[0]} alt="image product" preview={false} />
          </div>
          {/* <Row style={{ paddingTop: "10px", justifyContent: "space-between" }}>
            {selectedVariant.images?.map((img, index) => (
              <WrapeerStyleImage span={4} key={index}>
                <WrapeerStyleImageSmall src={img} alt={`small ${index}`} preview={false} />
              </WrapeerStyleImage>
            ))}
          </Row> */}
        </Col>

        {/* Phần thông tin chính */}
        <Col span={14} style={{ paddingLeft: "30px" }}>
          <WrapperNameStyleNameProduct>{product.name}</WrapperNameStyleNameProduct>
          <div>
            <StarFilled style={{ fontSize: "12px", color: "rgb(253,216,54" }} />
            <WrapperTextSell> Đã bán | 1000+</WrapperTextSell>
          </div>
          <WrapperPriceTextProduct>
            <h1>
              {selectedVariant.price_discount?.toLocaleString()}đ
              {selectedVariant.price_discount && (
                <WrapperPriceDiscountTextProduct>
                  {selectedVariant.price.toLocaleString()}đ
                </WrapperPriceDiscountTextProduct>
              )}
            </h1>
          </WrapperPriceTextProduct>
          <div>
            <WrapperTextOptionProduct>Phiên bản</WrapperTextOptionProduct>
            <SelectOptionProduct
              variants={product.variants}
              selectedVariant={selectedVariant}
              onSelectVariant={handleSelectVariant}
              productName={product.name} 
            />
          </div>
          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <WrapperTextOptionProduct>Số lượng</WrapperTextOptionProduct>
            <QuantityContainer>
              <QuantityControl>
                <QuantityButton
                  icon={<MinusOutlined />}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                />
                <Input
                  style={{ width: '50px', border: 'none', textAlign: 'center' }}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
                <QuantityButton
                  icon={<PlusOutlined />}
                  onClick={() => setQuantity(quantity + 1)}
                />
              </QuantityControl>
            </QuantityContainer>
          </div>
          <WrapperAddCartBuyNow>
          <WrapperButtonAddCart size="large" textButton="Thêm vào giỏ hàng" onClick={handleAddToCart}/>
            <WrapperBtnBuyNow size="large" textButton="Mua ngay" onClick={handleBuyNow} />
          </WrapperAddCartBuyNow>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{marginTop:"7px"}}  >
        <Col span={8}>
          <WrapperIconContainer>
            <CheckCircleFilled style={{ color: "#1877F2", fontSize: "36px" }} />
            <WrapperTextPolicy>100% Chính hãng</WrapperTextPolicy>
            <WrapperTextPolicySmall>
              Tất cả sản phẩm tại VD STORE đều là hàng chính hãng tại Việt Nam
            </WrapperTextPolicySmall>
          </WrapperIconContainer>
        </Col>
        <Col span={8} >
          <WrapperIconContainer >
            <ClockCircleFilled style={{ color: "#1877F2", fontSize: "36px" }} />
            <WrapperTextPolicy>30 ngày đổi trả</WrapperTextPolicy>
            <WrapperTextPolicySmall>
              Cam kết đổi trả trong vòng 30 ngày nếu xảy ra lỗi do nhà sản xuất
            </WrapperTextPolicySmall>
          </WrapperIconContainer>
        </Col>
        <Col span={8}>
          <WrapperIconContainer>
            <SafetyCertificateFilled
              style={{ color: "#1877F2", fontSize: "36px" }}
            />
            <WrapperTextPolicy>Bảo hành chính hãng</WrapperTextPolicy>
            <WrapperTextPolicySmall>
              Sản phẩm được bảo hành chính hãng theo nhà sản xuất tại Việt Nam
            </WrapperTextPolicySmall>
          </WrapperIconContainer>
        </Col>
      </Row>
      <WrapperDetailInfoProduct>
        <WrapperReviews>
          <ReviewBody>
            <TabContainer>
              <div>
                <WrapperTabBtn
                  type="text"
                  active={activeTab === "specs"}
                  onClick={() => setActiveTab("specs")}
                >
                  Thông số kỹ thuật
                </WrapperTabBtn>
                <WrapperTabBtn
                  type="text"
                  active={activeTab === "desc"}
                  onClick={() => setActiveTab("desc")}
                >
                  Mô tả sản phẩm
                </WrapperTabBtn>
                <WrapperTabBtn
                  type="text"
                  active={activeTab === "video"}
                  onClick={() => setActiveTab("video")}
                >
                  Video
                </WrapperTabBtn>
                <WrapperTabBtn
                  type="text"
                  active={activeTab === "review"}
                  onClick={() => setActiveTab("review")}
                >
                  Đánh giá
                </WrapperTabBtn>
              </div>
              <Divider />

              {activeTab === "review" && (
        <>
          <ReviewCard>
            <Row>
              <Col span={8} style={{ textAlign: "center" }}>
                <TextTitleReview>Đánh giá trung bình</TextTitleReview>
                <AverageRating>{calculateAverageRating()}/5</AverageRating>
                <Rate
                  allowHalf
                  disabled
                  value={calculateAverageRating()}
                  style={{ color: "rgb(241, 165, 0)", fontSize: "20px" }}
                />
                <TotalReviews>({reviews.length} đánh giá)</TotalReviews>
              </Col>
              <Col span={8} style={{ borderLeft:'rgb(221, 221, 221) 1px solid', borderRight: 'rgb(221, 221, 221) 1px solid'}}></Col>
              <Col span={8} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <WrapperBtnWriteReview
                  size="large"
                  icon={<EditFilled />}
                  onClick={() => setShowReviewForm(true)}
                >
                  Viết đánh giá của bạn
                </WrapperBtnWriteReview>
              </Col>
            </Row>  
          </ReviewCard>

          {showReviewForm && <ReviewForm onCancel={() => setShowReviewForm(false)} />}

          <ReviewCard>
            {reviews.map((review) => (
              <ReviewItem key={review._id}>
                <WrapperCustomerReview>
                <ReviewHeader >
                  <ReviewContent>
                  <ReviewAuthor>
                    <Avatar >{review.username.charAt(0).toUpperCase()}</Avatar>
                    <span style={{marginLeft: '5px'}}>{review.username} </span>
                    {review.customer_id === currentUser?._id && " (Bạn)"}
                  </ReviewAuthor>

                    <Rate 
                      disabled 
                      value={review.rating} 
                      style={{ color: "rgb(250, 175, 0)", fontSize: "14px" }} 
                    />
                    <ReviewDate>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </ReviewDate>
                  </ReviewContent>
                  {currentUser?._id === review.user?._id && (
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDeleteReview(review._id)}
                    />
                  )}
                </ReviewHeader>

                <ReviewContent>{review.comment}</ReviewContent>
                </WrapperCustomerReview>

                {/* Phần phản hồi */}
                {review.replies?.map((reply, index) => (
                  <WrapperAdReply  key={index} className="admin-reply">
                    <ReviewHeader>
                      <ReviewContent>
                      <ReviewAuthor>
                        <Avatar>{reply.admin_name.charAt(0).toUpperCase()}</Avatar>
                        <span style={{marginLeft: '5px'}}>{reply.admin_name}</span>
                        <VerifiedBadge>
                          <SafetyCertificateFilled />
                          Quản trị viên
                        </VerifiedBadge>
                      </ReviewAuthor>
                      <ReviewDate>
                        {new Date(reply.createdAt).toLocaleDateString()}
                      </ReviewDate>
                      </ReviewContent>
                      
                    </ReviewHeader>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                    <ReviewContent>{reply.reply}</ReviewContent>
                    {currentUser?.role === "admin" && (
                        <Button
                          type="text"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => handleDeleteReply(review._id, index)}
                        >Xóa phản hồi</Button>
                      )}
                    </div>
                  </WrapperAdReply>
                ))}

                {/* Form phản hồi cho admin */}
                {currentUser?.role === "admin" && (
                  <>
                  <Button style={{fontSize:'14px', fontWeight:'600', marginTop: '5px'}}
                    type="link"
                    onClick={() => toggleReplyForm(review._id)}
                  >
                    {showReplyForm[review._id] ? "Ẩn phản hồi" : "Trả lời"}
                  </Button>
              
                  {showReplyForm[review._id] && (
                    <div className="reply-form" style={{ marginTop: '14px', marginLeft: '50px' }}>
                      <Input.TextArea
                        rows={2}
                        placeholder="Nhập phản hồi của quản trị viên"
                        value={replyText[review._id] || ""}
                        onChange={(e) => setReplyText({
                          ...replyText,
                          [review._id]: e.target.value
                        })}
                      />
                      <Button
                        type="primary"
                        style={{ marginTop: 8 }}
                        onClick={() => handleReply(review._id)}
                      >
                        Gửi phản hồi
                      </Button>
                    </div>
                  )}
                </>
                )}
              </ReviewItem>
            ))}
          </ReviewCard>
        </>
      )}


              {activeTab === "specs" && (
                <WrapperSpecifications dangerouslySetInnerHTML={{ __html: product.technical_specifications }} />
            )}

            {activeTab === "desc" && (
              <WrapperDescription dangerouslySetInnerHTML={{ __html: product.description_detail }} />
            )}

            {activeTab === "video" && product.youtube_link && (
              <div>
                <iframe
                  width="100%"
                  height="600"
                  src={product.youtube_link.replace("watch?v=", "embed/")}
                  title="Product Video"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            )}
          </TabContainer>
          </ReviewBody>
        </WrapperReviews>
      </WrapperDetailInfoProduct>
      <ProductComparisonComponent/>
      <Row >
      <Col span={12}><TextSameProducts>SẢN PHẨM KHÁC</TextSameProducts></Col>
      <Col span={12} style={{display:'flex',justifyContent:'flex-end',alignItems:'center'}}><ViewMoreButton type="text" onClick={() => navigate("/")}> Xem thêm →</ViewMoreButton></Col>
      </Row>
    </WrapperProductDetailPage>
  );
};

export default ProductDetailComponent;
