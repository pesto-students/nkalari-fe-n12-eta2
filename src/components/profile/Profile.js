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

        <div className="flex flex-wrap justify-center" >
        <div className="w-8/12 sm:w-3/12 px-8 my-24">
            <img src="https://source.unsplash.com/x_8oJhYU31k/200x200" alt="..." className="shadow-lg rounded-full max-w-full h-auto align-middle border-none" />
            
        </div>
        {/* <div className="following-count"><span>130 Following</span></div> */}
       
    </div>
    
       



        </div>

        <div className="attended-gigs">

        <div className="box-transaction flex my-4 ml-16">
                      <div className="flex items-center h-20 justify-between w-full px-10 font-semibold">
                        <div className="flex flex-col ">
                          <p className="text-white text-3l">{"John Doe"}</p>
                          <p className="text-white text-2l">{"Next Gig"}</p>
                        </div>
                        <div className="flex justify-center">
                          <p className="text-white text-2l">{"Thursday 2:00pm"}</p>
                          {/* <img src={Diamonds} className="w-8" /> */}
                        </div>
                      </div>
                    </div>

        </div>


        </div>

        <div class="profile-vertical-line"></div>

        <div className="follow-list">
  
                    <div className="box-transaction flex my-4 ml-16">
                      <div className="flex items-center h-20 justify-between w-full px-10 font-semibold">
                        <div className="flex flex-col justify-center items-center">
                          <p className="text-white text-3l">{"John Doe"}</p>
                          <p className="text-white text-2l">{"Next Gig"}</p>
                        </div>
                        <div className="flex justify-center">
                          <p className="text-white text-2l">{"Thursday 2:00pm"}</p>
                          {/* <img src={Diamonds} className="w-8" /> */}
                        </div>
                      </div>
                    </div>

                    <div className="box-transaction flex my-4 ml-16">
                      <div className="flex items-center h-20 justify-between w-full px-10 font-semibold">
                        <div className="flex flex-col justify-center items-center">
                          <p className="text-white text-3l">{"John Doe"}</p>
                          <p className="text-white text-2l">{"Next Gig"}</p>
                        </div>
                        <div className="flex justify-center">
                          <p className="text-white text-2l">{"Thursday 2:00pm"}</p>
                          {/* <img src={Diamonds} className="w-8" /> */}
                        </div>
                      </div>
                    </div>

                    <div className="box-transaction flex my-4 ml-16">
                      <div className="flex items-center h-20 justify-between w-full px-10 font-semibold">
                        <div className="flex flex-col justify-center items-center">
                          <p className="text-white text-3l">{"John Doe"}</p>
                          <p className="text-white text-2l">{"Next Gig"}</p>
                        </div>
                        <div className="flex justify-center">
                          <p className="text-white text-2l">{"Thursday 2:00pm"}</p>
                          {/* <img src={Diamonds} className="w-8" /> */}
                        </div>
                      </div>
                    </div>
              
        </div>

        
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