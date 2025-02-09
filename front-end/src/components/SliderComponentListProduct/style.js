import Slider from "react-slick";
import styled from "styled-components";

export const WrapperSlider = styled.div`
  border-radius: 8px;
`;
export const WrapperStyleSlider = styled(Slider)`

  .slick-prev,
  .slick-next {
    z-index: 1;
    width: 30px;
    height: 30px;
    color: rgba(164, 160, 160, 0.5) !important;
    border-radius: 50%;
    margin-left: 14px;
    display: flex !important;
    align-items: center;
    justify-content: center;
  }

  .slick-prev::before,
  .slick-next::before {
    display: none;
  }

  .slick-prev::after,
  .slick-next::after {
    content: "〈"; 
    font-size: 24px;
    font-weight: bold;
    color: rgba(90, 84, 84, 0.5) !important;
    line-height: normal;
    display: flex;
  align-items: center;
  justify-content: center;
  }
.slick-prev {
  left: -30px; /* Điều chỉnh vị trí sang trái */
}

.slick-next {
  right: -10px; /* Điều chỉnh vị trí sang phải */
}

  .slick-next::after {
    content: "〉";
  }

  .slick-prev:hover,
  .slick-next:hover {
    background-color: rgba(218, 210, 210, 0.8) !important;
  }
`;
