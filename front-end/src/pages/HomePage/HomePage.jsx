import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProductsAPI } from "../../apis"; // Đảm bảo bạn đã import hàm API
import CardComponent from "../../components/CardComponent/CardComponent";
import SliderComponentListProduct from "../../components/SliderComponentListProduct/SliderComponentListProduct";
import { WrapperTextTitleProduct, WrapperProductList, WrapperProductListCetegory, WrapperSlideProduct, WrapperProducts, SpaceFooter, WrapperTypeProduct, WrapperBottonMore } from "./style";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import slider1 from "../../assets/images/slide1.png";
import slider2 from "../../assets/images/slide2.png";
import slider3 from "../../assets/images/slide3.png";
import SliderComponent from "../../components/SliderComponent/SliderComponent";

const HomePage = () => {
  const [products, setProducts] = useState([]);

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

  // Tạo các thẻ CardComponent cho danh sách sản phẩm
  const productCards = products.map((product) => {
    const firstVariant = product.variants?.[0];
    const image = firstVariant?.images?.[0] || "default_image_url_here";
  
    return (
      <Link to={`/product-detail/${product._id}`} key={product._id} style={{ textDecoration: "none" }}>
        <CardComponent
          name={product.name}
          price={firstVariant?.price}
          price_discount={firstVariant?.price_discount}
          image={image}
        />
      </Link>
    );
  });
  
  return (
    <>
      <div style={{ padding: "0 120px", backgroundColor: "#efefef" }}>
        <WrapperTypeProduct>
          {["Điện thoại", "Máy tính bảng", "Đồng hồ", "Laptop", "Âm thanh", "Phụ kiện"].map((item) => (
            <TypeProduct name={item} key={item} />
          ))}
        </WrapperTypeProduct>
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
        // Kiểm tra variant và images
        const firstVariant = product.variants?.[0];
        const image = firstVariant?.images?.[0] || "default_image_url_here";

          return (
            <Link to={`/product-detail/${product._id}`} key={product._id} style={{ textDecoration: "none" }}>
              <CardComponent
                key={product._id}
                name={product.name}
                price={firstVariant?.price}
                price_discount={firstVariant?.price_discount}
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
        <WrapperProducts>{productCards}</WrapperProducts>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
          <WrapperBottonMore
            textButton={"Xem thêm"}
            type="outline"
            styleButton={{
              border: "1px solid rgb(0, 69, 255)",
              color: "rgb(0, 69, 255)",
              width: "240px",
              height: "38px",
            }}
          />
        </div>
        <SpaceFooter />
      </div>
    </>
  );
};

export default HomePage;
