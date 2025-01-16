import React from "react";
import { StyleNameProduct, WrapperCard, WrapperCardStyle, WrapperDiscoutHeader, WrapperPriceDiscountText, WrapperPriceText, WrapperReportText } from "./style";
import { StarFilled } from "@ant-design/icons";

const CardComponent = () => {
  return (
    <WrapperCardStyle
      hoverable
      style={{ width: 240, padding: "5px" }}
      cover={
        <img
          alt="example"
          src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png"
        />
      }
    >   <WrapperDiscoutHeader>Trả góp 0%</WrapperDiscoutHeader>
      <StyleNameProduct>Iphone 16 Pro Max 256GB</StyleNameProduct>
      <WrapperReportText>
        <span >
          <span>4.9</span>
          <StarFilled style={{ fontSize: "12px", color: "yellow" }} />
        </span>
        <span>&nbsp;| Đã bán 1000+</span>
      </WrapperReportText>
      <WrapperPriceText>
            31.000.000đ
            <WrapperPriceDiscountText>40.000.000đ</WrapperPriceDiscountText>
        </WrapperPriceText>
    </WrapperCardStyle>
  );
};

export default CardComponent;
