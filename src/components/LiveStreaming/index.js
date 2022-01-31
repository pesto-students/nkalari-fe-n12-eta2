import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getRtcToken, getRtmToken } from "../../actions/user.action";
import Navbar from "../navbar/Navbar";
import Comments from "./Comments";

const LiveStream = () => {
  const [rtmToken, setRtmToken] = useState("");
  const [rtcToken, setRtcToken] = useState("");
  const [channelName, setChannelName] = useState("");
  const { currentUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRtmToken({ channelName: "punnet" }))
      .then((rtmToken) => {
        console.log(rtmToken, "rtmToken");
        setRtmToken(rtmToken);
      })
      .catch((err) => {
        console.log(err, "error from rtmToken");
      });
    dispatch(
      getRtcToken({
        channelName: "punnet",
        role: currentUser.phoneNumber === "++919999999999" ? "publisher" : "",
      })
    )
      .then((token) => {
        console.log(token, "rtctoken");
        setRtcToken(token);
        setChannelName("punnet");
      })
      .catch((err) => {
        console.log(err, "error from token");
      });
  }, []);

  return (
    <div className="main w-full">
      {/* <Navbar className="nav-bar"></Navbar> */}
      {rtmToken && rtcToken && channelName && (
        <Comments
          rtmToken={rtmToken}
          rtcToken={rtcToken}
          channelName={channelName}
        />
      )}
    </div>
  );
};

export default LiveStream;
