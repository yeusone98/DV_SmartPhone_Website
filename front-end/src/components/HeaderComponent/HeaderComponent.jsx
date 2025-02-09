import React, { useState } from "react";
import { MenuOutlined, UserOutlined, ShoppingCartOutlined, LogoutOutlined, ProfileOutlined } from "@ant-design/icons";
import { Badge, Dropdown, Menu, Drawer } from "antd";
import { WrapperHeader, WrapperHeaderAccount, WrapperTextHeaderSmall, MobileMenuIcon, WrapperLogo, WrapperSearch, WrapperAccountCart } from "./style";
import { Link, useNavigate } from "react-router-dom";
import { Image } from "antd";
import logo from "../../assets/images/logo.png";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectCurrentUser } from "../../features/user/userSlice";
import { message } from "antd";
import SearchComponent from "../SearchComponent/SearchComponent";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    dispatch(logout());
    message.success("Đăng xuất thành công!");
    navigate("/login");
  };

  const menu = (
    <Menu>
      <Menu.Item key="orders" onClick={() => navigate('/order-view')}>
        <ProfileOutlined style={{ marginRight: "5px" }} /> Đơn hàng của tôi
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        <LogoutOutlined style={{ marginRight: "5px" }} /> Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <div style={{ width: "100%", backgroundColor: "rgb(22, 98, 240)" }}>
    <WrapperHeader>
      {/* Menu Mobile */}
      <MobileMenuIcon>
        <MenuOutlined onClick={() => setMenuOpen(true)} />
      </MobileMenuIcon>

      {/* Logo */}
      <WrapperLogo>
        <Link to="/">
          <Image src={logo} alt="logo" style={{ width: "150px" }} preview={false} />
        </Link>
      </WrapperLogo>

      {/* Thanh tìm kiếm */}
      <WrapperSearch>
        <SearchComponent />
      </WrapperSearch>

      {/* User Account & Giỏ hàng */}
      <WrapperAccountCart>
        <WrapperHeaderAccount>
          {currentUser ? (
            <Dropdown overlay={menu} trigger={["click"]}>
              <div style={{ cursor: "pointer", color: "#fff" }}>
                <WrapperTextHeaderSmall>{currentUser.displayName}</WrapperTextHeaderSmall>
              </div>
            </Dropdown>
          ) : (
            <Link to="/login">
              <UserOutlined style={{ fontSize: "25px", color: "#fff" }} />
              <WrapperTextHeaderSmall>Đăng nhập</WrapperTextHeaderSmall>
            </Link>
          )}
        </WrapperHeaderAccount>

        {/* Giỏ hàng */}
        <div>
          <Link to="/cart">
            <Badge count={totalQuantity} showZero size="small">
              <ShoppingCartOutlined style={{ fontSize: "25px", color: "#fff" }} />
            </Badge>
            <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
          </Link>
        </div>
      </WrapperAccountCart>

      {/* Drawer menu cho mobile */}
      <Drawer title="Menu" placement="left" onClose={() => setMenuOpen(false)} open={menuOpen}>
        <Menu mode="vertical">
          <Menu.Item key="home">
            <Link to="/">Trang chủ</Link>
          </Menu.Item>
          <Menu.Item key="cart">
            <Link to="/cart">Giỏ hàng ({totalQuantity})</Link>
          </Menu.Item>
          {currentUser ? (
            <>
              <Menu.Item key="orders">
                <Link to="/order-view">Đơn hàng của tôi</Link>
              </Menu.Item>
              <Menu.Item key="logout" onClick={handleLogout}>
                Đăng xuất
              </Menu.Item>
            </>
          ) : (
            <Menu.Item key="login">
              <Link to="/login">Đăng nhập</Link>
            </Menu.Item>
          )}
        </Menu>
      </Drawer>
    </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
