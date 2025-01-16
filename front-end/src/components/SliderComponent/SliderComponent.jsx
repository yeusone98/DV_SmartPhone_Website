import { Image } from "antd";
import React from "react";
import Slider from "react-slick";
import { WrapperImgSlide, WrapperSlider } from "./style";

const SliderComponent = ({ arrImages }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <WrapperSlider>
      <Slider {...settings}>
        {arrImages.map((image) => {
          return (
            <WrapperImgSlide
              src={image}
              alt="slider"
              preview={false}
              width="100%"
              height="100%"
            />
          );
        })}
      </Slider>
    </WrapperSlider>
  );
};

export default SliderComponent;
