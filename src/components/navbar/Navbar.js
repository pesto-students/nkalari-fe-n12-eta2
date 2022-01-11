import React, { Component } from "react";
import home from "./../../images/home.png";
import wallet from "./../../images/wallet.png";
import profile from "./../../images/profile.png";
import { useHistory } from "react-router-dom";

function Navbar() {
  const history = useHistory();
  const [isVisible, setVisible] = React.useState(false);
  return (
    <div class="min-h-screen flex flex-row bg-gray-50 bg-white/30">
      <div class="flex flex-col w-20 rounded-r-2xl overflow-hidden justify-between">
        <div className="my-10">
          <img
            onClick={() => history.push("/wallet")}
            src={home}
            class="items-center w-15 h-15 transform hover:-translate-y-1 hover:scale-110 transition-transform ease-in duration-200 cursor-pointer my-10 p-2"
          ></img>
          <img
            src={wallet}
            onClick={() => history.push("/wallet")}
            class="items-center w-15 h-15 transform hover:-translate-y-1 hover:scale-110  transition-transform ease-in duration-200 cursor-pointer my-10 p-2"
          ></img>
        </div>
        <div>
          <img
            src={profile}
            class="items-center w-15 h-15 transform hover:-translate-y-1 hover:scale-110 transition-transform ease-in duration-200 my-4 cursor-pointer p-2"
          ></img>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
