import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getRtcToken, getRtmToken } from "../../actions/user.action";
import Navbar from "../navbar/Navbar";
import Comments from "./Comments";
import { getGigById } from "../../services/gigs.service";

const LiveStream = ({ match }) => {
  const [rtmToken, setRtmToken] = useState("");
  const [rtcToken, setRtcToken] = useState("");
  const channelId = match.params.id;
  const [channelName, setChannelName] = useState(channelId);
  const { currentUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [hostUser, sethostUser] = useState(null);

  useEffect(() => {
    // get gigdata by id
    getGigById(channelId).then((data) => {
      sethostUser(data.host_user);
      return;
    });
  }, []);

  useEffect(() => {
    // console.log("match", match);

    if (hostUser) {
      console.log(
        currentUser.uid == hostUser.uid,
        "check",
        currentUser.uid,
        hostUser.uid
      );
      dispatch(getRtmToken({ channelName: channelId }))
        .then((rtmToken) => {
          console.log(rtmToken, "rtmToken");
          setRtmToken(rtmToken);
        })
        .catch((err) => {
          console.log(err, "error from rtmToken");
        });
      dispatch(
        getRtcToken({
          channelName: channelId,
          role: currentUser.uid == hostUser.uid ? "publisher" : "",
        })
      )
        .then((token) => {
          console.log(token, "rtctoken");
          setRtcToken(token);
          setChannelName(channelId);
        })
        .catch((err) => {
          console.log(err, "error from token");
        });
    }
  }, [hostUser]);

  return (
    <div className="main w-full">
      {/* <Navbar className="nav-bar"></Navbar> */}
      {rtmToken && rtcToken && channelName && (
        <Comments
          rtmToken={rtmToken}
          rtcToken={rtcToken}
          channelName={channelName}
          isHost={currentUser.uid == hostUser.uid}
        />
      )}
    </div>
  );
};

export default LiveStream;
