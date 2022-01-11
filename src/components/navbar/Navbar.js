import React, { Component } from "react";
import home from "./../../images/home.png"
import wallet from "./../../images/wallet.png"
import profile from "./../../images/profile.png"


function Navbar() {
    const [isVisible, setVisible] = React.useState(false);
    return (

        <div class="min-h-screen flex flex-row bg-gray-50">
          <div class="flex flex-col w-16 bg-white rounded-r-2xl overflow-hidden">
          <img src={home}class="items-center w-15 h-15 transform hover:translate-x-5 transition-transform ease-in duration-200 "></img>
          <img src={wallet} class="items-center w-15 h-15 transform hover:translate-x-5 transition-transform ease-in duration-200 "></img>
          <img src={profile} class="items-center w-15 h-15 transform hover:translate-x-5 transition-transform ease-in duration-200 "></img>
           
          </div>
        </div>
    );
  }
  
export default Navbar;
  