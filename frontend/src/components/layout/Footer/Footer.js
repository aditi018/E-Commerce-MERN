import React from "react";
import "./footer.css" 

const Footer = ()=>{
    return(
        <footer id="footer">
            <div className="leftFooter">
                <h4>ECOMMERCE</h4>
                <p>Best Webiste for you to buy products.</p>
                
            </div>
            <div className="midFooter">
                <h1>Quick Links</h1>
                <p>Copyrights 2023 &copy; MeAditiDas</p>
            </div>
            <div className="rightFooter">
                <h4>Head Office</h4>
                <p>Office No 616-617, 6th Floor Golden Trade Center, New Rajendra Nagar</p>
                <p>Raipur-492001, Chattisgarh</p>
                <p>Mobile +919039939374</p>
                <p>Mon to Sat : 11:00 AM - 8:00PM</p>
                <p>Email: ecommerce@gmail.com</p>
            </div>
        </footer>
    );
};

export default Footer;