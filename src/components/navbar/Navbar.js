import React, { Component } from "react";
import home from "./../../images/home.png";
import wallet from "./../../images/wallet.png";
import profile from "./../../images/profile.png";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {logout} from "../../actions/user.action"
import { useDispatch } from "react-redux";

function Navbar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isVisible, setVisible] = React.useState(false);
  const { currentUser } = useSelector((store) => store.user);
  return (
    <div class="min-h-screen flex flex-row bg-gray-50 bg-white/30">
      <div class="flex flex-col w-20 rounded-r-2xl overflow-hidden justify-between">
        <div className="my-10">
          <img
            onClick={() => history.push("/profile")}
            src={home}
            class="items-center w-15 h-15 transform hover:-translate-y-1 hover:scale-110 transition-transform ease-in duration-200 cursor-pointer my-10 p-2"
          ></img>
          <img
            src={wallet}
            onClick={() => history.push("/wallet")}
            class="items-center w-15 h-15 transform hover:-translate-y-1 hover:scale-110  transition-transform ease-in duration-200 cursor-pointer my-10 p-2"
          ></img>
        </div>
        {/* <div className="rounded-full my-4 flex items-center justify-between mx-2 ">
          <img
            src={currentUser.profileImageUrl || profile}
            class="items-center w-full transform hover:-translate-y-1 hover:scale-110 transition-transform ease-in duration-200  cursor-pointer rounded-full border shadow-sm"
          ></img>
        </div> */}

        <div class=" w-16 h-16 my-4 mx-2">
          <img
            class="rounded-full shadow-sm  transform hover:-translate-y-1 hover:scale-110  transition-transform ease-in duration-200 cursor-pointer w-full h-full rounded-full"
            src={currentUser.profileImageUrl || profile}
            alt="user image"
            onClick={() => history.push("/profile")}
          />
        </div>
        <div class=" w-16 h-16 my-4 mx-2">
          <img
            class="rounded-full shadow-sm  transform hover:-translate-y-1 hover:scale-110  transition-transform ease-in duration-200 cursor-pointer w-full h-full rounded-full"
            src={ profile}
            alt="user image"
            onClick={() => dispatch(logout())}
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
