import React, { useState } from "react";
import home from "./../../images/home.png";
import wallet from "./../../images/wallet.png";
import profile from "./../../images/profile.png";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector, useStore } from "react-redux";
import { DollarSign, Home, Plus } from "react-feather";
import { userActions } from "../../actions/user.action";
// import { useHistory } from "react-router-dom";

const Navbar = () => {
  const navigate = useHistory();
  const { currentUser } = useSelector((store) => {
    return store.user;
  });
  const [profileDrop, setProfileDrop] = useState(false);
  // toggles the dropdown menu
  const handleProfileDrop = () => {
    setProfileDrop(!profileDrop);
  };
  const dispatch = useDispatch();
  // handles the logout
  const handleLogout = () => {
    dispatch(userActions.logout());
    navigate.push("/");
    window.location.reload();
  };

  // console.log(currentUser, "<<<");
  return (
    <div class="fixed z-50 min-h-screen w-24 box-border flex flex-col bg-white/30 backdrop-blur-md shadow-md overflow-hidden justify-between items-center px-2 py-8">
      <div className="logo bg-white w-16 h-16 rounded-xl shadow-xl grid items-center">
        <span className="text-5xl text-transparent bg-clip-text bg-gradient-to-tl from-violet-500 via-rose-500 to-amber-500 headline-font text-white font-black">k</span>
      </div>
      <div className="actions">
        <div
          onClick={() => navigate.push("/home")}
          // src={home}
          class="p-2 rounded-xl mb-4 cursor-pointer"
        >
          <Home />
        </div>
        <div
          onClick={() => navigate.push("/wallet")}
          class="p-2 rounded-xl mb-4 cursor-pointer"
        >
          <DollarSign />
        </div>
        <div
          onClick={() => navigate.push("/newgig")}
          class="p-2 rounded-xl mb-4 cursor-pointer"
        >
          <Plus />
        </div>
      </div>

      <div class="relative w-16 h-16 my-4 mx-2">
        {currentUser && (
          <img
            class="rounded-full shadow-sm cursor-pointer w-full h-full rounded-full"
            src={currentUser.profileImageUrl || profile}
            alt="user image"
            onClick={handleProfileDrop}
          />
        )}
        <div className="absolute w-24 h-16 bg-white"></div>
      </div>
    </div>
  );
};

export default Navbar;
