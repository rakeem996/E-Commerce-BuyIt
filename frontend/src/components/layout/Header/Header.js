import React from "react";
import { ReactNavbar } from "overlay-navbar";
import { MdAccountCircle } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";
import logo from "../../../images/buyit-logo.png";

const Header = () => {
  return (
    <ReactNavbar
      burgerColor="rgb(246, 53, 53)"
      burgerColorHover="pink"
      logo={logo}
      logoWidth="15vw"
       navColor1="rgb(0,0,0,0.4)"
      logoHoverSize="10px"
      logoHoverColor="white"
      link1Text="Home"
      link2Text="Product"
      link3Text="Contact"
      link4Text="About"
      link1Url="/"
      link2Url="/product"
      link3Url="/contact"
      link4Url="/about"
      link1Color="white"
      link1Size="1.5vmax"
      nav1justifyContent="flex-end"
      nav2justifyContent="flex-end"
      nav3justifyContent="flex-start"
      link1ColorHover="rgb(246, 53, 53)"
      link1Margin="2vmax"
      link2Margin="1vmax"
      link3Margin="1vmax"
      link4Margin="2vmax"
      profileIcon="true"
      profileIconColorHover="rgb(246, 53, 53)"
      ProfileIconElement={MdAccountCircle}
      searchIcon="true"
      searchIconColorHover="rgb(246, 53, 53)"
      SearchIconElement={MdSearch}
      cartIcon="true"
      cartIconColorHover="rgb(246, 53, 53)"
      CartIconElement={MdAddShoppingCart}
      cartIconMargin="2vmax"
    />
  );
};

export default Header;
