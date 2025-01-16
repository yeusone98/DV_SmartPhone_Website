import React from "react";
import { Button, Image } from "antd";
import notfoundpage from "../../assets/images/404.png";
import { WrapperNotFoundPage, WrapperTextNotFound, WrapperTextNotFoundSmall } from "./style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <WrapperNotFoundPage>
      <Image src={notfoundpage} alt="404" preview={false} />
      <WrapperTextNotFound>TRANG KHÔNG ĐƯỢC TÌM THẤY</WrapperTextNotFound>
      <WrapperTextNotFoundSmall>
        <p>Thật tiếc! Trang của bạn yêu cầu không tồn tại.</p>
        <p>Vui lòng thử với một trang khác hoặc liên hệ để được hỗ trợ nhé!</p>
      </WrapperTextNotFoundSmall>
      <Link to="/">
        <ButtonComponent size="large" textButton={"Về trang chủ"} />
      </Link>
    </WrapperNotFoundPage>
  );
};

export default NotFoundPage;
