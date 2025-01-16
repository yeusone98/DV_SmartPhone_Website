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
    background-color: rgba(151, 149, 149, 0.5) !important; /* Màu xám với 50% trong suốt */
    border-radius: 10px;
    margin-left: 14px;
  }

  .slick-prev:hover,
  .slick-next:hover {
    background-color: rgba(187, 181, 181, 0.8) !important; /* Giảm trong suốt khi hover */
  }
 
`;
