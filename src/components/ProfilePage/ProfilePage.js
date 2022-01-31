import React from "react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { currentUser } = useSelector((store) => {
    return store.user;
  });
  return (
    <div className="profile-page-wrap pl-32">
      <div className="profile-box w-2/6 text-left bg-white/40 rounded-2xl p-6">
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
  );
};

export default ProfilePage;
