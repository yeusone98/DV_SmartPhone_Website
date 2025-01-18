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
import React, { useState } from "react";
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


const ProductDetailComponent = () => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("review");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const productSpecifications = {
    "Kích thước màn hình": "6.8 inches",
    "CPU": "Snapdragon 8 Gen 3 (4 nm)",
    "Hệ điều hành": "Android 14, One UI 6.1",
    "Bộ nhớ trong": "256GB",
    "RAM": "12GB",
    "Camera chính": "200MP - 50MP - 10MP - 12MP",
    "Camera phụ": "12MP",
    "Dung lượng pin": "5000mAh",
    "Màu sắc": "Black, Purple, Gray, Yellow",
    "Độ phân giải màn hình": "1440 x 3088 pixels",
    "Sạc nhanh": "45W",
    "Hãng sản xuất": "Samsung",
    "Tình trạng SP": "New"
  };
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
      <Row
        style={{
          padding: "16px",
          backgroundColor: "#fff",
          borderRadius: "8px",
        }}
      >
        <Col
          span={10}
          style={{
            border: "1px solid #919eab52",
            borderRadius: "8px",
            paddingRight: "30px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Image src={imgProduct} alt="image product" preview={false} />
          </div>
          <Row style={{ paddingTop: "10px", justifyContent: "space-between" }}>
            <WrapeerStyleImage span={4}>
              <WrapeerStyleImageSmall
                src={imgProductSmall}
                alt="img small"
                preview={false}
              />
            </WrapeerStyleImage>
            <WrapeerStyleImage span={4}>
              <WrapeerStyleImageSmall
                src={imgProductSmall}
                alt="img small"
                preview={false}
              />
            </WrapeerStyleImage>
            <WrapeerStyleImage span={4}>
              <WrapeerStyleImageSmall
                src={imgProductSmall}
                alt="img small"
                preview={false}
              />
            </WrapeerStyleImage>
            <WrapeerStyleImage span={4}>
              <WrapeerStyleImageSmall
                src={imgProductSmall}
                alt="img small"
                preview={false}
              />
            </WrapeerStyleImage>
            <WrapeerStyleImage span={4}>
              <WrapeerStyleImageSmall
                src={imgProductSmall}
                alt="img small"
                preview={false}
              />
            </WrapeerStyleImage>
            <WrapeerStyleImage span={4}>
              <WrapeerStyleImageSmall
                src={imgProductSmall}
                alt="img small"
                preview={false}
              />
            </WrapeerStyleImage>
          </Row>
        </Col>
        <Col span={14} style={{ paddingLeft: "30px" }}>
          <WrapperNameStyleNameProduct>
            iPhone 16 Pro Max 256GB | Chính hãng VN/A
          </WrapperNameStyleNameProduct>
          <div>
            <StarFilled style={{ fontSize: "12px", color: "rgb(253,216,54" }} />
            <StarFilled style={{ fontSize: "12px", color: "rgb(253,216,54" }} />
            <StarFilled style={{ fontSize: "12px", color: "rgb(253,216,54" }} />
            <StarFilled style={{ fontSize: "12px", color: "rgb(253,216,54" }} />
            <StarFilled style={{ fontSize: "12px", color: "rgb(253,216,54" }} />
            <WrapperTextSell> Đã bán | 1000+</WrapperTextSell>
          </div>
          <WrapperPriceTextProduct>
            <h1>
              31.000.000đ
              <WrapperPriceDiscountTextProduct>
                40.000.000đ
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
                <WrapperSpecs >
                  <table style={{ width: "100%", margin: "auto", paddingLeft:'130px' }}>
                    <tbody>
                      {Object.entries(productSpecifications).map(([key, value]) => (
                        <tr
                          key={key}
                          style={{ borderBottom: "1px solid #ccc" }}
                        >
                          <td
                            style={{
                              padding: "8px",
                              fontWeight: "600",
                              width: "30%",
                              fontSize: "16px"
                            }}
                          >
                            {key}
                          </td>
                          <td style={{fontSize:'14px', padding: "8px" }}>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </WrapperSpecs>
                
              )}
              {activeTab === "desc" && (
                <div><h1>Đây là mô tả sản phẩm</h1>
                    <Image src={iphoneImg} alt="find not found image"></Image>                       
                 </div>)}
              {activeTab === "video" && (
                <div>
                  <iframe
                    width="100%"
                    height="619"
                    src="https://www.youtube.com/embed/RfakDAwVdRw"
                    title="Đánh giá chi tiết iPhone 16 Pro Max: Nên bớt kỳ vọng vào những thế hệ iPhone mới 👌🏻"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>
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
