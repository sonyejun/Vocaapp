import React from "react";
import { AsideBox, Logo } from "./Aside.styles";
import LogoImg from "../../assets/images/logo.png";
import Nav from "../Nav/Nav";

const Aside = React.memo(() => {
    return (
        <AsideBox>
            <Logo>
                <img src={LogoImg} alt="Logo" />
            </Logo>
            <Nav />
        </AsideBox>
    )
});

export default Aside;