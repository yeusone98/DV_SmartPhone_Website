import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProductsAPI } from "../../apis"; 
import CardComponent from "../../components/CardComponent/CardComponent";
import SliderComponentListProduct from "../../components/SliderComponentListProduct/SliderComponentListProduct";
import {
  WrapperContainer,
  WrapperTextTitleProduct,
  WrapperProductList,
  WrapperProductListCetegory,
  WrapperProducts,
  SpaceFooter,
  WrapperTypeProduct,
  WrapperBottonMore,
  WrapperSlideProducts
} from "./style";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import slider1 from "../../assets/images/slide1.png";
import slider2 from "../../assets/images/slide2.png";
import slider3 from "../../assets/images/slide3.png";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import { HomeOutlined } from "@ant-design/icons";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetchProductsAPI({});
      setProducts(response);
    };
    fetchProducts();
  }, []);

  const sliderProducts = products.slice(0, 7);
  const visibleProducts = products.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  return (
    <>
      <WrapperContainer>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <WrapperTypeProduct>
            <HomeOutlined style={{ color: "rgb(22, 98, 240)", fontSize: "24px" }} />
            <TypeProduct name="Trang Chủ" />
          </WrapperTypeProduct>
        </Link>

        <SliderComponent arrImages={[slider1, slider2, slider3]} />

        <WrapperTextTitleProduct>
          <WrapperProductList>
            SẢN PHẨM DÀNH CHO BẠN <WrapperProductListCetegory>Phù hợp nhất</WrapperProductListCetegory>
          </WrapperProductList>
        </WrapperTextTitleProduct>
        <WrapperSlideProducts >
        <SliderComponentListProduct
          arrImages={sliderProducts.map((product) => {
            const firstVariant = product.variants?.[0];
            const image = firstVariant?.images?.[0] || "default_image_url_here";

            return (
              <Link to={`/product-detail/${product._id}`} key={product._id} style={{ textDecoration: "none"}}>
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
        </WrapperSlideProducts>
        

        <WrapperTextTitleProduct>
          <WrapperProductList>
            DANH SÁCH SẢN PHẨM <WrapperProductListCetegory>Mới nhất</WrapperProductListCetegory>
          </WrapperProductList>
        </WrapperTextTitleProduct>

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

        {visibleCount < products.length && (
          <WrapperBottonMore textButton={"Xem thêm"} type="outline" onClick={handleLoadMore} />
        )}

        <SpaceFooter />
      </WrapperContainer>
    </>
  );
};

export default HomePage;
