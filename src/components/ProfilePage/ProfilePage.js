import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useStream } from "../../helpers/rxjsFirestore";
import { getGigsByHost } from "../../services/gigs.service";
import GigCardLarge from "../../UILibrary/GigCardLarge/GigCardLarge";

const ProfilePage = () => {
  const { currentUser } = useSelector((store) => {
    return store.user;
  });

  // get gigs by host
  const myGigs = useStream(getGigsByHost(currentUser.uid), []);

  useEffect(() => {
    console.log(myGigs, "myGigs");
  }, [myGigs]);

  return (
    <div className="relative profile-page-wrap flex pl-32 pt-12">
      <div className="my-events w-9/12 text-left">
        <h1 className="text-6xl">My events</h1>
        <br />
        <br />
        <div className="my-gigs flex flex-wrap">
          {myGigs.map((gig) => (
            <GigCardLarge data={gig} />
          ))}
        </div>
      </div>
      <div className="profile-box fixed right-12 w-3/12 text-left p-6">
        <div className="bg-white bg-white/40 rounded-2xl p-6">
          <div className="profile-image w-24 h-24 rounded-full overflow-hidden">
            <img src={currentUser.profileImageUrl} alt="profile" />
          </div>
          <div className="profile-info">
            <div className="profile-name my-6">
              <p className="text-4xl text-left text-black my-4">
                {currentUser.firstName}&nbsp;{currentUser.lastName}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {/* display follower count */}
                <p className="text-2xl rounded-xl p-4 bg-black/20 text-left text-white my-4">
                  <div className="text-4xl font-bold">{"26"}</div> Followers
                </p>
                {/* display following count */}
                <p className="text-2xl rounded-xl p-4 bg-black/20 text-left text-white my-4">
                  <div className="text-4xl font-bold">{"26"}</div> Following
                </p>
              </div>
            </div>
            <hr />
            <div className="contacts">
              <h2 className="text-xl my-4 font-bold opacity-40">
                Contact details
              </h2>
              {/* display user email */}
              <p className="text-lg text-white my-4">
                <span>Email:</span>
                <br />
                <div className="text-2xl">{currentUser.email}</div>
              </p>
              {/* display user phoen number */}
              <p className="text-lg text-white my-4">
                <span>Phone:</span>
                <br />
                <div className="text-2xl">{currentUser.phoneNumber}</div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
