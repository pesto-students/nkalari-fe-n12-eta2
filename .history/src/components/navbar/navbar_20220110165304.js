import React, { Component } from "react";
import home from "./../../images/home.png"
import wallet from "./../../images/wallet.png"
import profile from "./../../images/profile.png"


function Navbar() {
    return (

        <div class="min-h-screen flex flex-row bg-gray-100">
          <div class="flex flex-col w-26 bg-white rounded-r-30xl overflow-hidden">
          <img src={home}></img>
          <img src={wallet}></img>
          <img src={profile}></img>            
          </div>
        </div>
    );
  }
  
export default Navbar;
  