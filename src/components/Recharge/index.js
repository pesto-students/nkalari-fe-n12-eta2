import React, { Component } from "react";
import { userActions } from "./../../actions/user.action";
import Diamonds from "./../../images/Diamonds.png";
import Navbar from "../navbar/Navbar";
import "./index.css";
import RechargePack from "./RechargePack";

const RechargePage = () => {
  return (
    <div className="main">
      {/* <Navbar className="nav-bar"></Navbar> */}

      <div className="container pl-32 py-2">
        <div className="left-side">
          <h2 className="heading m-5 ">Recharge</h2>

          <p className="m-5 text-2xl text-white">Select Your Pack</p>

          <div className="flex flex-wrap justify-between">
            <RechargePack numberOfDiamonds={"2000"} amount={"510"} />
            <RechargePack numberOfDiamonds={"4000"} amount={"1020"} />
            <RechargePack numberOfDiamonds={"6000"} amount={"1530"} />
            <RechargePack numberOfDiamonds={"10000"} amount={"3060"} />
          </div>
        </div>
        <div class="vertical-line"></div>
        <div className="right">
          <div className="flex justify-center">
            <div className="balance">
              <h2 className="balance-heading">Balance </h2>
              <div className="flex">
                <h2 className="balance-value">5000</h2>
                <img src={Diamonds} className="px-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RechargePage;
