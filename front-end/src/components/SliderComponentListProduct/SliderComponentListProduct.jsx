import React from "react";
import Slider from "react-slick";
import { WrapperSlider } from "./style";
import { WrapperStyleSlider } from "./style";



const SliderComponentListProduct = ({ arrImages }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <WrapperSlider>
      <WrapperStyleSlider {...settings}>
        {arrImages.map((item, index) => (
          <div key={index} style={{ padding: "0 10px" }}>
            {item}
          </div>
        ))}
      </WrapperStyleSlider>
    </WrapperSlider>
  );
};

export default SliderComponentListProduct;
