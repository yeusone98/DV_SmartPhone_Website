import React from "react";
import {
  WrapperContent,
  WrapperLabelText,
  WrapperTextPrice,
  WrapperTextProduct,
  WrapperTextValue,
} from "./style";
import { Checkbox, Rate } from "antd";

const NavBarComponent = () => {
  const onChange = (checkedValues) => {};
  const renderContent = (type, options) => {
    switch (type) {
      case "text":
        return options.map((option) => {
          return <WrapperTextValue>{option}</WrapperTextValue>;
        });
      case "checkbox":
        return (
          <div>
            <Checkbox.Group
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
              onChange={onChange}
            >
              {options.map((option) => {
                return <Checkbox value={option.value}>{option.label}</Checkbox>;
              })}
            </Checkbox.Group>
          </div>
        );
      case "star":
        return ( options.map((option) => {
            return(
                <div style={{display:'flex',gap:'8px'}}>
                <Rate style={{fontSize:'12px'}} disabled defaultValue={option} />
                <span>Từ {option} sao</span>
                </div>
            )
            })
        )   
        case "price":
            return (options.map((option) => {
                return(
                    <WrapperTextPrice >{option}</WrapperTextPrice>
            )})
            )        
      default:
        return {};
    }
  };

  return (
    <div>
      <WrapperLabelText>Label Navbar</WrapperLabelText>
      <WrapperContent>
        {renderContent("text", [
          "Iphone",
          "Samsung",
          "Xiaomi",
          "Oppo",
          "Vsmart",
        ])}
      </WrapperContent>
      <WrapperContent>
        {renderContent("checkbox", [
          { value: "A", label: "A" },
          { value: "B", label: "B" },
          { value: "C", label: "C" },
          { value: "D", label: "D" },
        ])}
      </WrapperContent>
      <WrapperContent>{renderContent("star", [3,4,5])}</WrapperContent>
    <WrapperContent>{renderContent("price",['Dưới 40', 'Trên 50'])}</WrapperContent>
    </div>
  );
};

export default NavBarComponent;
