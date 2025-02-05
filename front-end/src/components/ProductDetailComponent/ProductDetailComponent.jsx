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
} from "antd";
import React, { useState, useEffect } from "react";
import imgProductSmall from "../../assets/images/iphone-16-pro-max-small.png";
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

import iphoneImg from '../../assets/images/iphone-16-pro-max.png'
import SelectOptionProduct from "../SelectOptionProduct/SelectOptionProduct";
import { useParams } from "react-router-dom";
import { fetchProductByIdAPI } from "../../apis";

const ProductDetailComponent = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("review");
  const [showReviewForm, setShowReviewForm] = useState(false);
  
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
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

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
            <Image src={mainImage} alt="image product" preview={false} />
          </div>
          <Row style={{ paddingTop: "10px", justifyContent: "space-between" }}>
            {firstVariant?.images?.map((img, index) => (
              <WrapeerStyleImage span={4} key={index}>
                <WrapeerStyleImageSmall src={img} alt={`img small ${index}`} preview={false} />
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
              {firstVariant?.price?.toLocaleString()}đ
              <WrapperPriceDiscountTextProduct>
                {firstVariant?.price_discount?.toLocaleString()}đ
              </WrapperPriceDiscountTextProduct>
            </h1>
          </WrapperPriceTextProduct>
          <div>
            <WrapperTextOptionProduct>Phiên bản</WrapperTextOptionProduct>
            {/* <Input size="large" placeholder="iPhone 16 Pro Max 512Gb" /> */}
            <SelectOptionProduct/>
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
            <WrapperButtonAddCart size="large" textButton="Thêm vào giỏ hàng" />
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
