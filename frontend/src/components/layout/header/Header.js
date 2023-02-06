import React from "react"; 
import {ReactNavbar} from "overlay-navbar"
import logo from "../../../../src/images/logo.png";
import {FaSistrix,FaUserAlt,FaCartPlus} from "react-icons/fa";


const Header = ()=>{
    return (
        <ReactNavbar 
        burgerColorHover="#eb4034"
        logo = {logo}
        logoWidth= "20vmax"
        navColor1= "white"
        logoHoverSize= "10px"
        logoHoverColor= "#eb4034"
        link1Text= "Home"
        link2Text= "Products"
        link3Text= "Contact"
        link4Text= "About"
        link1Url= "/"
        link2Url= "/products"
        link3Url= "/contacts"
        link4Url= "/about"
        link1Size= "1.3vmax"
        link1Color= "rgba(35, 35, 35,0.8)"
        nav1justifyContent= "flex-end"
        nav2justifyContent= "flex-end"
        nav3justifyContent= "flex-start"
        nav4justifyContent= "flex-start"
        link1ColorHover= "#eb4034"
        link1Margin= "1vmax"
        profileIcon = {true}
        ProfileIconElement = {FaUserAlt}
        profileIconUrl= "/login"
        searchIcon= {true}
        SearchIconElement = {FaSistrix}
        cartIcon = {true}
        CartIconElement = {FaCartPlus}
        profileIconColor= "rgba(35, 35, 35,0.8)"
        searchIconColor= "rgba(35, 35, 35,0.8)"
        cartIconColor= "rgba(35, 35, 35,0.8)"
        profileIconColorHover= "rgb(0,124,195)"
        searchIconColorHover= "rgb(0,124,195)"
        cartIconColorHover= "#eb4034"
        cartIconMargin= "1vmax"
        />
    )
}

export default Header;