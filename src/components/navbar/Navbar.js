import React, { Component } from "react";
import home from "./../../images/home.png";
import wallet from "./../../images/wallet.png";
import profile from "./../../images/profile.png";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useStore } from "react-redux";
import { DollarSign, Home } from "react-feather";
// import { useHistory } from "react-router-dom";

const Navbar = () => {
  const navigate = useHistory();
  const [isVisible, setVisible] = React.useState(false);
  const { currentUser } = useSelector((store) => {
    return store.user;
  });
  console.log(currentUser, "<<<");
  return (
    <div class="min-h-screen w-18 p-4 box-border">
      <div class="flex flex-col h-full bg-white/30 backdrop-blur-md shadow-md rounded-2xl overflow-hidden justify-between items-center px-2 py-8 box-border">
        <div className="logo">
          <span className="text-4xl text-white text-bold">K</span>
        </div>
        <div className="actions">
          <div
            onClick={() => navigate.push("/home")}
            // src={home}
            class="p-2 rounded-xl mb-4 cursor-pointer"
          >
            <Home/>
          </div>
          <div
            onClick={() => navigate.push("/wallet")}
            class="p-2 rounded-xl mb-4 cursor-pointer"
          >
            <DollarSign/>
          </div>
        </div>
        {/* <div className="rounded-full my-4 flex items-center justify-between mx-2 ">
          <img
            src={currentUser.profileImageUrl || profile}
            class="items-center w-full transform hover:-translate-y-1 hover:scale-110 transition-transform ease-in duration-200  cursor-pointer rounded-full border shadow-sm"
          ></img>
        </div> */}

        <div class=" w-16 h-16 my-4 mx-2">
          {currentUser && (
            <img
              class="rounded-full shadow-sm  transform hover:-translate-y-1 hover:scale-110  transition-transform ease-in duration-200 cursor-pointer w-full h-full rounded-full"
              src={currentUser.profileImageUrl || profile}
              alt="user image"
              onClick={() => navigate.push("/profile")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
