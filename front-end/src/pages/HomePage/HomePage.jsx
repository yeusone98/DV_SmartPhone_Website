import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProductsAPI } from "../../apis"; // Đảm bảo bạn đã import hàm API
import CardComponent from "../../components/CardComponent/CardComponent";
import SliderComponentListProduct from "../../components/SliderComponentListProduct/SliderComponentListProduct";
import {
  WrapperTextTitleProduct,
  WrapperProductList,
  WrapperProductListCetegory,
  WrapperSlideProduct,
  WrapperProducts,
  SpaceFooter,
  WrapperTypeProduct,
  WrapperBottonMore
} from "./style";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import slider1 from "../../assets/images/slide1.png";
import slider2 from "../../assets/images/slide2.png";
import slider3 from "../../assets/images/slide3.png";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import { HomeOutlined } from "@ant-design/icons";

const HomePage = () => {
  const [products, setProducts] = useState([]); // Danh sách sản phẩm
  const [visibleCount, setVisibleCount] = useState(12); // Số sản phẩm hiển thị ban đầu

  // Lấy dữ liệu sản phẩm từ API
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetchProductsAPI({});
      setProducts(response); // Giả sử response trả về là một mảng các sản phẩm
    };
    fetchProducts();
  }, []);

  // 7 sản phẩm đầu tiên cho slider
  const sliderProducts = products.slice(0, 7);

  // Danh sách sản phẩm hiển thị dựa trên visibleCount
  const visibleProducts = products.slice(0, visibleCount);

  // Hàm xử lý khi nhấn "Xem thêm"
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 12);
  };

  return (
    <>
      <div style={{ padding: "0 120px", backgroundColor: "#efefef" }}>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <WrapperTypeProduct>
            <HomeOutlined style={{ color: "rgb(22, 98, 240)", fontSize: "24px" }} />
            <TypeProduct name="Trang Chủ" />
          </WrapperTypeProduct>
        </Link>
      </div>

      <div id="container" style={{ backgroundColor: "#efefef", padding: "0 120px", height: "auto" }}>
        <SliderComponent arrImages={[slider1, slider2, slider3]} />

        <WrapperTextTitleProduct>
          <WrapperProductList>
            SẢN PHẨM DÀNH CHO BẠN <WrapperProductListCetegory>Phù hợp nhất</WrapperProductListCetegory>
          </WrapperProductList>
        </WrapperTextTitleProduct>

        <SliderComponentListProduct
          arrImages={sliderProducts.map((product) => {
            const firstVariant = product.variants?.[0];
            const image = firstVariant?.images?.[0] || "default_image_url_here";

            return (
              <Link to={`/product-detail/${product._id}`} key={product._id} style={{ textDecoration: "none" }}>
                <CardComponent
                  name={product.name}
                  price={firstVariant?.price?.toLocaleString("vi-VN")}
                  price_discount={firstVariant?.price?.toLocaleString("vi-VN")}
                  image={image}
                />
              </Link>
            );
          })}
        />

        <WrapperTextTitleProduct>
          <WrapperProductList>
            DANH SÁCH SẢN PHẨM <WrapperProductListCetegory>Mới nhất</WrapperProductListCetegory>
          </WrapperProductList>
        </WrapperTextTitleProduct>

        {/* Danh sách sản phẩm */}
        <WrapperProducts>
          {visibleProducts.map((product) => {
            const firstVariant = product.variants?.[0];
            const image = firstVariant?.images?.[0] || "default_image_url_here";

            return (
              <Link to={`/product-detail/${product._id}`} key={product._id} style={{ textDecoration: "none" }}>
                <CardComponent
                  name={product.name}
                  price={firstVariant?.price?.toLocaleString("vi-VN")}
                  price_discount={firstVariant?.price?.toLocaleString("vi-VN")}
                  image={image}
                />
              </Link>
            );
          })}
        </WrapperProducts>

        {/* Nút "Xem thêm" */}
        {visibleCount < products.length && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
            <WrapperBottonMore
              textButton={"Xem thêm"}
              type="outline"
              onClick={handleLoadMore} 
              styleButton={{
                border: "1px solid rgb(0, 69, 255)",
                color: "rgb(0, 69, 255)",
                width: "240px",
                height: "38px",
                cursor: "pointer"
              }}
            />
          </div>
        )}

        <SpaceFooter />
      </div>
    </>
  );
};

export default HomePage;
