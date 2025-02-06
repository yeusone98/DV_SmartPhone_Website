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
import React, { useState, useEffect } from "react";
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
  TextTitleReview,
  TotalReviews,
  VerifiedBadge,
  ViewTextRate,
  WrapeerStyleImage,
  WrapeerStyleImageSmall,
  WrapperAddCartBuyNow,
  WrapperBtnBuyNow,
  WrapperBtnInfoProduct,
  WrapperBtnQualityProduct,
  WrapperBtnWriteReview,
  WrapperButtonAddCart,
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
  WrapperSpecs,
  WrapperTabBtn,
  WrapperTextOptionProduct,
  WrapperTextPolicy,
  WrapperTextPolicySmall,
  WrapperTextSell,
} from "./style";


import SelectOptionProduct from "../SelectOptionProduct/SelectOptionProduct";
import { useParams } from "react-router-dom";
import { fetchProductByIdAPI, addToCartAPI, fetchCartAPI, updateCartItemAPI  } from "../../apis";
import { useSelector } from "react-redux";
import { selectCurrentUser } from '../../features/user/userSlice';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

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


  const reviews = [
    {
      id: 1,
      author: "a",
      rating: 5,
      content: "a",
      date: "15 tháng 01 2025",
      likes: 9,
      verified: true,
    },
    {
      id: 2,
      author: "aa",
      rating: 5,
      content: "Ngon",
      date: "10 tháng 01 2025",
      likes: 8,
      verified: true,
    },
  ];

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
  
          fetchCart(); // Load lại giỏ hàng sau khi cập nhật
      } catch (error) {
          message.error("Thao tác thất bại, vui lòng thử lại!");
          console.error("❌ Error in handleAddToCart:", error);
      }
  };
  
    
    

  if (!product || !selectedVariant) return <div>Loading...</div>;

  const firstVariant = product.variants[0];
  const mainImage = firstVariant?.images?.[0] || imgProduct;

  const ReviewForm = ({ onCancel }) => (
    <ReviewCard>
      <h3 style={{ fontSize: "16px", marginBottom: "16px", fontWeight: "700" }}>
        Thêm bình luận
      </h3>
      <div style={{ marginBottom: "16px" }}>
        <p
          style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.57143" }}
        >
          Nhận xét của bạn về sản phẩm này :
        </p>
        <WrapperRateStar />
      </div>
      <Input.TextArea
        placeholder="Hãy để lại bình luận tại đây *"
        style={{ marginBottom: "16px" }}
        rows={4}
      />
      <Input placeholder="Tên *" style={{ marginBottom: "16px" }} />
      <Input
        placeholder="Email *"
        type="email"
        style={{ marginBottom: "16px" }}
      />
      <div style={{ textAlign: "right" }}>
        <Button onClick={onCancel} style={{ marginRight: "8px" }}>
          Huỷ
        </Button>
        <Button type="primary">Thêm bình luận</Button>
      </div>
    </ReviewCard>
  );

  return (
    <WrapperProductDetailPage>
      <Row style={{ padding: "16px", backgroundColor: "#fff", borderRadius: "8px" }}>
        {/* Phần hình ảnh */}
        <Col span={10} style={{ border: "1px solid #919eab52", borderRadius: "8px", paddingRight: "30px" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Image src={selectedVariant.images[0]} alt="image product" preview={false} />
          </div>
          <Row style={{ paddingTop: "10px", justifyContent: "space-between" }}>
            {selectedVariant.images?.map((img, index) => (
              <WrapeerStyleImage span={4} key={index}>
                <WrapeerStyleImageSmall src={img} alt={`small ${index}`} preview={false} />
              </WrapeerStyleImage>
            ))}
          </Row>
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
            <WrapperBtnBuyNow size="large" textButton="Mua ngay" />
          </WrapperAddCartBuyNow>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <WrapperIconContainer>
            <CheckCircleFilled style={{ color: "#1877F2", fontSize: "36px" }} />
            <WrapperTextPolicy>100% Chính hãng</WrapperTextPolicy>
            <WrapperTextPolicySmall>
              Tất cả sản phẩm tại VD STORE đều là hàng chính hãng tại Việt Nam
            </WrapperTextPolicySmall>
          </WrapperIconContainer>
        </Col>
        <Col span={8}>
          <WrapperIconContainer>
            <ClockCircleFilled style={{ color: "#1877F2", fontSize: "36px" }} />
            <WrapperTextPolicy>30 ngày đổi trả</WrapperTextPolicy>
            <WrapperTextPolicySmall>
              Cam kết đổi trả trong vòng 30 ngày nếu xảy ra lỗi
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
              Sản phẩm được bảo hành chính hãng theo nhà sản xuất
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
                  {!showReviewForm && (
                    <ReviewCard>
                      <Row>
                        <Col span={8} style={{ textAlign: "center" }}>
                          <TextTitleReview>Đánh giá trung bình</TextTitleReview>
                          <AverageRating>4.4/5</AverageRating>
                          <Rate
                            allowHalf
                            disabled
                            defaultValue={4.5}
                            style={{
                              color: "rgb(241, 165, 0)",
                              fontSize: "20px",
                            }}
                          />
                          <ViewTextRate>(196 lượt xem)</ViewTextRate>
                        </Col>
                        <Col span={8}>
                          <SpaceReview />
                        </Col>
                        <Col
                          span={8}
                          style={{
                            textAlign: "center",
                            alignItems: "center",
                            alignContent: "center",
                          }}
                        >
                          <WrapperBtnWriteReview
                            size="large"
                            icon={<EditFilled />}
                            onClick={() => setShowReviewForm(true)}
                          >
                            Viết bình luận của bạn
                          </WrapperBtnWriteReview>
                        </Col>
                      </Row>
                    </ReviewCard>
                  )}

                  {showReviewForm && (
                    <ReviewForm onCancel={() => setShowReviewForm(false)} />
                  )}

                  <ReviewCard>
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        style={{
                          borderBottom: "1px solid #f0f0f0",
                          padding: "16px 0",
                          last: { borderBottom: "none" },
                        }}
                      >
                        <div>
                          <Avatar>{review.author[0].toUpperCase()}</Avatar>
                          <ReviewerName>{review.author}</ReviewerName>
                          {review.verified && (
                            <VerifiedBadge style={{ color: "rgb(0, 69, 255)" }}>
                              Đã mua hàng
                            </VerifiedBadge>
                          )}
                          <ReviewDate>{review.date}</ReviewDate>
                        </div>
                        <Rate
                          disabled
                          defaultValue={review.rating}
                          style={{
                            color: "rgb(250, 175, 0)",
                            fontSize: "18px",
                          }}
                        />
                        <p
                          style={{
                            margin: "8px 0",
                            fontSize: "14px",
                            fontWeight: "400",
                          }}
                        >
                          {review.content}
                        </p>
                        <Button type="text" icon={<LikeOutlined />}>
                          Thích ({review.likes})
                        </Button>
                      </div>
                    ))}
                  </ReviewCard>
                </>
              )}
              {activeTab === "specs" && (
                <div dangerouslySetInnerHTML={{ __html: product.technical_specifications }} />
            )}

            {activeTab === "desc" && (
              <div dangerouslySetInnerHTML={{ __html: product.description_detail }} />
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
    </WrapperProductDetailPage>
  );
};

export default ProductDetailComponent;
