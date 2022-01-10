import React, { Component } from "react";

function Navbar() {
    const [isVisible, setVisible] = React.useState(false);
    return (
      <div className={`App ${isVisible ? "show" : ""}`}>
        <nav className="side-nav">
          
        </nav>
  
    
      </div>
    );
  }
  
export default Navbar;
  