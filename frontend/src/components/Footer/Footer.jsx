import React from "react";
import "./Footer.css";
import { assets } from "../../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
          "At [Restaurant Name], we bring you a delightful culinary experience with fresh ingredients, authentic flavors, and a warm ambiance. Whether you're here for a casual meal, a special occasion, or a cozy coffee break, we ensure every bite is memorable. Visit us and indulge in a fusion of tradition and taste, served with love."
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get in touch</h2>
          <ul>
            <li>+91-990-2499132</li>
            <li>📍 Address: Vidhyanagar Main Road, Hubli, Karnataka, 587002</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Opening Hours</h2>
          <ul>
            <li>Monday - Friday: 11:00 AM - 10:00 PM</li>
            <li>Saturday - Sunday: 9:00 AM - 11:00 PM</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 @ Tomato.com - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
