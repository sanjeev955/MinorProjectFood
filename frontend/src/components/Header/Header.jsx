import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
        "Welcome to Tomato, where flavors come to life! Explore our carefully curated menu, reserve your table, or learn more about our passion for great food and hospitality. Navigate through our site easily to find what you need—whether it's a quick bite, a family dinner, or a special occasion."
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
