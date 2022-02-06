import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import stringToHTML from "../../helpers/stringToHTML";
import { getGigById } from "../../services/gigs.service";
// import { joinStream } from "../../services/livestream.service";
import UserWidget from "../../UILibrary/UserWidget/UserWidget";

import "./GigDetailPage.css";

const GigDetailPage = ({ match }) => {
  const {
    params: { id },
  } = match;

  //state variable fo gigData
  const [gigData, setGigData] = useState({});

  useEffect(() => {
    getGigById(id).then((data) => {
      setGigData(data);
      return;
    });

    console.log(gigData);
  }, []);

  // get current user from store
  // const currentUser = useSelector((store) => {
  //   return store.user;
  // });

  // const ishost = currentUser.uid === gigData.host_user.uid;

  return (
    <div className="relative gig-detail-wrap">
      <div className="z-0 top-0 fixed w-full h-screen gig-thumbnail">
        {/* gradient overlay */}
        <div className="absolute z-0 top-0 w-full h-full bg-gradient-to-t from-black to-transparent"></div>
        <img
          className="w-full h-full object-cover"
          src={gigData.thumbnail}
          alt={gigData.title}
        />
      </div>
      <div className="z-10 relative px-32 flex justify-between items-end gig-detail-content mt-96 text-white">
        <div className="deets text-left w-2/5">
          <h1 className="text-8xl font-black headline-font inline-block">
            {gigData.title}
          </h1>
          <div className="my-2 inline-block">
            {gigData.host_user ? <UserWidget data={gigData.host_user} /> : ""}
          </div>
          <div className="gig-desc-wrap">
            <div
              className="text-xl my-6 opacity-80"
              dangerouslySetInnerHTML={{ __html: gigData.desc }}
            ></div>
          </div>
        </div>
        <div className="join-stream">
          <Link to={`/livestream/${id}`} className="primary-btn">
            Join Stream
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GigDetailPage;
