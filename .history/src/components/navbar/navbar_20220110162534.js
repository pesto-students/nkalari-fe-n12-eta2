import React, { Component } from "react";
import home from "./../../images/home.png"

function Navbar() {
    const [isVisible, setVisible] = React.useState(false);
    return (
      <div className={`App ${isVisible ? "show" : ""}`}>
        <nav className="side-nav">
          <img src={home}></img>
        </nav>
  
    
      </div>
    );
  }
  
export default Navbar;
  