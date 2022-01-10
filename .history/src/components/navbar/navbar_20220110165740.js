import React, { Component } from "react";
import home from "./../../images/home.png"
import wallet from "./../../images/wallet.png"
import profile from "./../../images/profile.png"


function Navbar() {
    const [isVisible, setVisible] = React.useState(false);
    return (

        <div class="min-h-screen flex flex-row bg-gray-100">
          <div class="flex flex-col w-16 bg-white rounded-r-3xl overflow-hidden">
          <img src={home}class="flex flex-row items-center w-12 h-12 transform hover:translate-x-2 "></img>
          <img src={wallet}></img>
          <img src={profile}></img>
            {/* <ul class="flex flex-col py-4">
              <li>
                <a href="#" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                  <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-home"></i></span>
                  <img src={home}></img>
                </a>
              </li>
              <li>
                <a href="#" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                  <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-music"></i></span>
                  <img src={wallet}></img>

                </a>
              </li>
              <li>
                <a href="#" class="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                  <span class="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"><i class="bx bx-drink"></i></span>
                  <img src={profile}></img>

                </a>
              </li>
             
            </ul> */}
          </div>
        </div>
    );
  }
  
export default Navbar;
  