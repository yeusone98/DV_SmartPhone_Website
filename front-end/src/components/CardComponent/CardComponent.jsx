import React from "react";
import { StyleNameProduct, WrapperCard, WrapperCardStyle, WrapperDiscoutHeader, WrapperPriceDiscountText, WrapperPriceText, WrapperReportText } from "./style";
import { StarFilled } from "@ant-design/icons";

// Nhận các giá trị từ props
const CardComponent = ({ name, price, price_discount, image }) => {
  return (
    <WrapperCardStyle
      hoverable
      style={{maxWidth:'100%', width: 'auto', padding: "5px" }}
      cover={<img alt={name} src={image || "default_image_url_here"} />}
    >
      <WrapperDiscoutHeader>Trả góp 0%</WrapperDiscoutHeader>
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperReportText>
        <span>
          <span>4.9</span> {/* Giữ giá trị đánh giá cố định */}
          <StarFilled style={{ fontSize: "12px", color: "yellow" }} />
        </span>
        <span>&nbsp;| Đã bán 1000+</span> {/* Giữ số lượng đã bán cố định */}
      </WrapperReportText>
      <WrapperPriceText>
        {price}đ
        {price_discount && (
          <WrapperPriceDiscountText>{price_discount}đ</WrapperPriceDiscountText>
        )}
      </WrapperPriceText>
    </WrapperCardStyle>
  );
};

export default CardComponent;
