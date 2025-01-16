import { Button } from "antd";
import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";


export const WrapperPageLogin = styled.div`
  padding-bottom: 110px;

`

export const FormContainer = styled.div`
  width: 400px;
  margin: 25px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`

export const Logo = styled.div`
  margin-bottom: 20px;
  img {
    width: 50px;
  }
`

export const StyledButton = styled(Button)`
  width: 100%;
  height: 40px;
  background-color: #e74c3c;
  color: white;
  font-weight: bold;
  &:hover {
    background-color: #c0392b !important;
  }
`;

export const Divider = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #ddd;
  }
  span {
    margin: 0 10px;
    color: #aaa;
  }
`;

export const WrapperSocialButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  
`;

export const SocialButtons = styled(ButtonComponent)`
  width: 48%;  
  height: 40px; 
`

export const WrapperTextSignIn = styled.div`
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
`

export const WrapperTextSignInSmall = styled.div`
    font-size: 14px;
    margin-top: 10px;
    a{
        color: red;
    }
         a:hover {
        color: #e74c3c; 
    }
`