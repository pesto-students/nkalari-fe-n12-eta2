import React, { Component } from "react";
import home from "./../../images/home.png"
import wallet from "./../../images/wallet.png"
import profile from "./../../images/profile.png"


function Navbar() {
    const [isVisible, setVisible] = React.useState(false);
    return (
      <div className="App">
          <div>
            <nav className="side-nav">
            <img src={home}></img>
            <img src={wallet}></img>
            <img src={profile}></img>
            </nav>
          </div>


        
  
    
      </div>
    );
  }
  
export default Navbar;
  