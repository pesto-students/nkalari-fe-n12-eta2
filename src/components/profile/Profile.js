import React, { useEffect, useState } from "react"
import styles from './index.css';  
import Navbar from "../navbar/Navbar";
import { userActions } from "./../../actions/user.action";
import { connect, useSelector } from "react-redux";



function Profile(props) {
    const [profile, setProfile] = useState();
    useEffect(() => setProfile(props.getProfile()), [profile])
    return(
      <>
        <DisplayProfileScreen/>
      </>
    )
  }

  function DisplayProfileScreen(props) {
   const profile = useSelector(state => state.getProfile)
    console.log("image", profile?.image);

    return(
        <div className="main">
        <Navbar className="nav-bar"></Navbar>

        <div className="card">

        <div className="featuring">

        <div className="flex flex-wrap justify-center">
        <div className="w-8/12 sm:w-3/12 px-8 my-20">
            <img src={profile?.image} alt="..." className="shadow-lg rounded-full max-w-full h-auto align-middle border-none" />
        </div>
    </div>
       



        </div>

        <div className="attended-gigs">

        </div>


        </div>

        <div class="profile-vertical-line"></div>

        
    </div>
    );

  }

  function mapState(state) {
    console.log("state", state);
    const { profile } = state.getProfile;
    return { profile };
  }
  
  const actionCreators = {
    getProfile: userActions.getProfile,
  };
  
  const ProfilePage = connect(mapState, actionCreators)(Profile);

  export default ProfilePage;