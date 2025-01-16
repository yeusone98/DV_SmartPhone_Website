import styled from "styled-components";

export const WrapperFooterComponent = styled.div`
    background-color: #efefef;
    padding: 40px 0;
    border-top: 1px solid #ddd;
`

export const FooterLink = styled.a`
    display: block;
    color: #000;
    margin: 5px 0;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`

export const FooterCopyRight = styled.div`
    font-size: 12px;
    text-align: left;
    padding: 10px 120px;
    color: #666;
    margin-top: 20px
`
export const WrapperFooterIcon = styled.div`
    display: flex;
    gap: 30px;
    margin-top: 10px;
    font-size: 20px;
    color: rgb(0, 89, 255);
`