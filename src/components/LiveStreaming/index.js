import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getRtmToken } from "../../actions/user.action";
import Navbar from "../navbar/Navbar";
import Comments from "./Comments";

const LiveStream = () => {
  const [token, setToken] = useState("");
  const [channelName, setChannelName] = useState("");
  const { currentUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRtmToken({ channelName: "punnet" }))
      .then((token) => {
        console.log(token, "token");
        setToken(token);
        setChannelName("punnet");
      })
      .catch((err) => {
        console.log(err, "error from token");
      });
  }, []);

  return (
    <div className="main">
      <Navbar className="nav-bar"></Navbar>
      Hello LiveStream {currentUser.firstName} {currentUser.lastName}
      {token && channelName && (
        <Comments token={token} channelName={channelName} />
      )}
    </div>
  );
};

export default LiveStream;
