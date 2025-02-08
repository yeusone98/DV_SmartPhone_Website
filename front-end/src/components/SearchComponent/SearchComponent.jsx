import React, { useState } from "react";
import { AutoComplete, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { SearchWrapper } from "./style";
import { fetchProductsAPI } from "../../apis";
import { Link } from "react-router-dom";

const SearchComponent = () => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (value) => {
    if (!value) {
      setOptions([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetchProductsAPI({ search: value });

      if (response.length === 0) {
        setOptions([
          {
            value: value,
            label: (
              <div
                style={{
                  boxShadow: "0 2px 5px rgba(53, 51, 51, 0.1)",
                  background: "#fff",
                  fontSize: "14px",
                  padding: "10px",
                  color: "rgb(125, 125, 125)",
                  textAlign: "center",
                }}
              >
                Không tìm thấy sản phẩm nào!
              </div>
            ),
          },
        ]);
      } else {
        setOptions(
          response.map((product) => {
            const firstVariant = product.variants?.[0];
            const image = firstVariant?.images?.[0] || "default_image_url_here";
            const price = firstVariant?.price?.toLocaleString("vi-VN");
            const price_discounted = firstVariant?.price_discount?.toLocaleString("vi-VN");

            return {
              value: product.name,
              label: (
                <Link
                  to={`/product-detail/${product._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div
                    style={{
                      boxShadow: "0 2px 5px rgba(53, 51, 51, 0.1)",
                      background: "#fff",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    <img
                      src={image}
                      alt={product.name}
                      width="40"
                      height="40"
                      style={{ borderRadius: "5px" }}
                    />
                    <div>
                      <div>{product.name}</div>
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        {price} đ <del style={{color:'rgb(128, 128, 137)', marginLeft: '5px', fontWeight:'400'}}>{price_discounted} đ</del>
                      </span>
                    </div>
                  </div>
                </Link>
              ),
            };
          })
        );
      }
    } catch (error) {
      console.error("Lỗi khi tìm kiếm sản phẩm:", error);
      setOptions([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchWrapper>
      <AutoComplete
        options={options}
        onSearch={handleSearch}
        style={{ width: "100%" }}
        placeholder="Bạn đang cần tìm gì?"
      >
        <Input
          style={{ borderRadius: "5px" }}
          suffix={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                color: "#888",
              }}
            >
              {loading ? (
                <span>Đang tìm...</span>
              ) : (
                <>
                  <SearchOutlined />
                  <span>Tìm kiếm</span>
                </>
              )}
            </div>
          }
          allowClear
        />
      </AutoComplete>
    </SearchWrapper>
  );
};

export default SearchComponent;
