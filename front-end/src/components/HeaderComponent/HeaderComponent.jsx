import React, { useState } from "react";
import Icon, {
  CaretDownOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Col, Dropdown, Menu } from "antd";
import { WrapperHeader, WrapperHeaderAccount, WrapperTextHeaderSmall } from "./style";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { Link, useNavigate } from "react-router-dom";
import { Image } from "antd";
import logo from "../../assets/images/logo.png";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectCurrentUser } from "../../features/user/userSlice";
import { message } from "antd";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser); // Lấy user từ Redux

  const handleLogout = () => {
    // Xóa cookies chứa token
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");

    // Xóa user trong Redux
    dispatch(logout());

    // Hiển thị thông báo và chuyển hướng về trang login
    message.success("Đăng xuất thành công!");
    navigate("/login");
  };

  // Tạo menu khi nhấn vào displayName
  const menu = (
    <Menu>
      <Menu.Item key="logout" onClick={handleLogout} style={{color: 'red', alignItems: 'center',justifyContent: 'center'}}>
        Đăng xuất
        <LogoutOutlined style={{marginLeft:'5px'}}/>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <WrapperHeader>
        {/* Logo */}
        <Col span={6}>
          <Link to="/">
            <Image
              src={logo}
              alt="logo"
              style={{ width: "178px", height: "33px" }}
              preview={false}
            />
          </Link>
        </Col>

        {/* Thanh tìm kiếm */}
        <Col span={12}>
          <ButtonInputSearch
            size="12"
            textButton="Tìm kiếm"
            placeholder="Bạn đang cần tìm gì?"
          />
        </Col>

        {/* User Account và Giỏ hàng */}
        <Col span={6} style={{ display: "flex", gap: "20px" }}>
          <WrapperHeaderAccount>
            {currentUser ? (
              // Nếu đã đăng nhập, hiển thị displayName
              <Dropdown overlay={menu} trigger={["click"]}>
                <div style={{ cursor: "pointer", color: "#fff" }}>
                  <WrapperTextHeaderSmall >{currentUser.displayName}</WrapperTextHeaderSmall>
                  <CaretDownOutlined style={{ marginLeft: "5px" }} />
                </div>
              </Dropdown>
            ) : (
              // Nếu chưa đăng nhập, hiển thị Đăng nhập/Đăng ký
              <Link to="/login">
                <div>
                  <UserOutlined style={{ fontSize: "25px" }} />
                  <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                </div>
              </Link>
            )}
          </WrapperHeaderAccount>

          {/* Giỏ hàng */}
          <div>
            <Link to="/cart">
                <ShoppingCartOutlined
                  style={{ fontSize: "25px", color: "#fff" }}
                />
              <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
            </Link>
          </div>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
