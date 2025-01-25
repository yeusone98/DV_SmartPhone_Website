import React from "react";
import slider1 from "../../assets/images/slide1.png";
import slider2 from "../../assets/images/slide2.png";
import slider3 from "../../assets/images/slide3.png";
import CardComponent from "../../components/CardComponent/CardComponent";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { SpaceFooter, WrapperBottonMore, WrapperProductList, WrapperProductListCetegory, WrapperProducts, WrapperSlideProduct, WrapperTextTitleProduct, WrapperTypeProduct } from "./style";
import SliderComponentListProduct from "../../components/SliderComponentListProduct/SliderComponentListProduct";
import { Link } from "react-router-dom";


const HomePage = () => {

  const arr = [
    "Điện thoại",
    "Máy tính bảng",
    "Đồng hồ",
    "Laptop",
    "Âm thanh",
    "Phụ kiện",
  ];


  return (
    <>
      <div style={{ padding: "0 120px" ,backgroundColor:'#efefef'}}>
        <WrapperTypeProduct>
          {arr.map((item) => {
            return <TypeProduct name={item} key={item} />;
          })}
        </WrapperTypeProduct>
      </div>
        <div id="container" style={{ backgroundColor: "#efefef", padding: "0 120px", height:'auto'}}>
          <SliderComponent arrImages={[slider1, slider2, slider3]} />
          <WrapperTextTitleProduct>
            <WrapperProductList>SẢN PHẨM DÀNH CHO BẠN <WrapperProductListCetegory>Phù hợp nhất</WrapperProductListCetegory></WrapperProductList>
          </WrapperTextTitleProduct>
          <WrapperSlideProduct>
            <SliderComponentListProduct arrImages={[
              <Link to={'/product-detail'} style={{textDecoration:'none'}}><CardComponent key={1} /> </Link>,
              <Link to={'/product-detail'} style={{textDecoration:'none'}}><CardComponent key={2} /> </Link>,
              <Link to={'/product-detail'} style={{textDecoration:'none'}}><CardComponent key={3} /> </Link>,
              <Link to={'/product-detail'} style={{textDecoration:'none'}}><CardComponent key={4} /> </Link>,
              <Link to={'/product-detail'} style={{textDecoration:'none'}}><CardComponent key={5} /> </Link>,
              <Link to={'/product-detail'} style={{textDecoration:'none'}}><CardComponent key={6} /> </Link>,
              <Link to={'/product-detail'} style={{textDecoration:'none'}}><CardComponent key={7} /> </Link>,
              <Link to={'/product-detail'} style={{textDecoration:'none'}}><CardComponent key={8} /> </Link>,
            ]}/>
          </WrapperSlideProduct>

          <WrapperTextTitleProduct>
            <WrapperProductList>DANH SÁCH SẢN PHẨM <WrapperProductListCetegory>Mới nhất</WrapperProductListCetegory></WrapperProductList>
          </WrapperTextTitleProduct>
            <WrapperProducts >
              <CardComponent/>
              <CardComponent/>
              <CardComponent/>
              <CardComponent/>
              <CardComponent/>
              <CardComponent/>
              <CardComponent/>
              <CardComponent/>
              <CardComponent/>
              <CardComponent/>
              <CardComponent/>
              <CardComponent/>
            </WrapperProducts>
          <div style={{display:'flex',justifyContent:'center',marginTop:'10px' }}>
          <WrapperBottonMore textButton={'Xem thêm'} type='outline' styleButton={{border:'1px solid rgb(0, 69, 255)',color:'rgb(0, 69, 255)', width:'240px',height:'38px'}}/>
          </div>
          <SpaceFooter/>

        </div>

    </>
  );
};

export default HomePage;
