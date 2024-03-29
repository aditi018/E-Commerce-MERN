import './App.css';
import Header  from "./components/layout/header/Header.js";
import Footer from "./components/layout/Footer/Footer.js";
import {BrowserRouter,Route, Routes} from "react-router-dom";
import webfont from "webfontloader"
import React from "react";
import Home from "./components/Home/Home.js"
import ProductDetails from './components/Products/ProductDetails.js';



function App() {

  React.useEffect(()=>{
    webfont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    })
  });

 return(
  <BrowserRouter>
    <Header/>
    <Routes>
    <Route exact path="/" element={<Home/>} />
    <Route exact path="/product/:id" element={<ProductDetails/>}/>
    
    </Routes>
    
    <Footer/>
  </BrowserRouter>
 );
}

export default App;
