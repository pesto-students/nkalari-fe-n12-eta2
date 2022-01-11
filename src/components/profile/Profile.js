import React, { Component } from "react"
import styles from './index.css';  
import Navbar from "../navbar/Navbar";
import { userActions } from "./../../actions/user.action";
import { connect } from "react-redux";



function Profile(props) {

    
    return(
      <>
        <DisplayProfileScreen/>
      </>
    )
  }

  function DisplayProfileScreen(props) {
  
    userActions.getProfile()

    return(
        <div className="main">
        <Navbar className="nav-bar"></Navbar>

        <div className="card">

        <div className="featuring">

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