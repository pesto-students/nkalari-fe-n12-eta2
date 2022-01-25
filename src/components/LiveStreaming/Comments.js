import React, { useEffect, useState, useRef } from "react";
import AgoraRTM from "agora-rtm-sdk";
import { useBeforeunload } from "react-beforeunload";
import { useSelector } from "react-redux";
import sendButton from "../../assets/sendIcon.png";
import diamond from "../../images/Diamonds.png";
import "./style.css";

let client;
let channel;
const Comments = ({ token, channelName }) => {
  const { currentUser } = useSelector((store) => store.user);
  const [comment, setComment] = useState("");
  const [memberCount, setMemberCount] = useState(0);
  const [newMember, setNewMember] = useState("");
  const [memberLeft, setMemberLeft] = useState("");
  const [commentsArray, setCommentsArray] = useState([]);
  const updatedCommentsArray = useRef();
  const lastCommentDiv = useRef();
  const updatedChannel = useRef();

  // Params for login
  let options = {
    uid: currentUser.uid,
    token: token,
  };

  // subscribe client events
  const subscribeClientEvents = (client, channel) => {
    client.on("ConnectionStateChanged", async function (newState, reason) {
      console.log(newState, reason, "connection state");
    });
    client.on("MessageFromPeer", function (message) {
      console.log(message, "message from peer");
    });
  };

  const subscribeChannelEvents = (channel) => {
    channel.on("ChannelMessage", function (message, memberId) {
      console.log(message, " channel message", memberId);
      setCommentsArray([
        ...updatedCommentsArray.current,
        JSON.parse(message.text),
      ]);
    });
    channel.on("MemberJoined", async function (memberJoined) {
      const newMember = await client.getUserAttributes(memberJoined);
      setNewMember(newMember.name);
      console.log(memberJoined, "member joined");
      client
        .getUserAttributes(memberJoined)
        .then((res) => console.log(res, "new user joined"));
    });
    channel.on("MemberLeft", async function (memberId) {
      console.log(memberId, "member left");
      const memberLeft = await client.getUserAttributes(memberId);
      setMemberLeft(memberLeft.name);
    });
    channel.on("MemberCountUpdated", function (count) {
      console.log(count, "member count");
      // channel.getMembers().then((count) => {
      //   console.log(count, "hey");
      // });
      setMemberCount(count);
    });
  };
  useEffect(() => {
    if (token && channelName) {
      console.log(token, channelName, "token", currentUser.uid);
      client = AgoraRTM.createInstance(process.env.REACT_APP_AGORA_APP_ID);
      client.login(options).then(async (response) => {
        channel = client.createChannel("puneet619");
        await channel.join("puneet619");
        updatedChannel.current = channel;
        await client.setLocalUserAttributes({
          name: currentUser.firstName + " " + currentUser.lastName,
        });
        window.client = client;
        console.log(client, "i am client");
        subscribeChannelEvents(channel);
        subscribeClientEvents(client, channel);
      });
    }
    return () => channel.leave();
  }, []);

  useEffect(() => {
    updatedCommentsArray.current = commentsArray;
    lastCommentDiv.current.scrollTop = lastCommentDiv.current.scrollHeight;
  }, [commentsArray]);

  useBeforeunload((event) => {
    updatedChannel.current && updatedChannel.current.leave();
  });

  const sendChannelMessage = () => {
    console.log(comment, "commment");
    channel
      .sendMessage({
        text: JSON.stringify({
          comment,
          type: "comment",
          sender: currentUser.firstName + currentUser.lastName,
        }),
      })
      .then((res) => {
        // Your code for handling the event when the channel message is successfully sent.
        setCommentsArray([
          ...commentsArray,
          {
            comment,
            type: "comment",
          },
        ]);

        setComment("");

        console.log("sending channel message", res);
      })
      .catch((error) => {
        // Your code for handling the event when the channel message fails to be sent.
        console.log("error sending channel message", error);
      });
  };

  const leaveChannel = (channel) => {
    channel
      .leave()
      .then((res) => {
        // Your code for handling the event when the channel message is successfully sent.
        console.log("channel left", res);
      })
      .catch((error) => {
        // Your code for handling the event when the channel message fails to be sent.
        console.log("error from leaving channel", error);
      });
  };

  const messageSentBox = (comment, id) => {
    return (
      <div className="place-self-end text-left mr-8">
        <div className="bg-white bg-opacity-10 shadow rounded-2xl p-5 max-w-md text-white">
          <div className="text-slate-800 font-semibold relative hover-trigger cursor-pointer">
            You
            {currentUser.host ? (
              <div class="absolute bg-white border border-grey-100 px-4 hover-target text-sm">
                <div>Kickout</div>
                <div>Mute</div>
              </div>
            ) : (
              ""
            )}
          </div>
          {comment}
        </div>
      </div>
    );
  };

  const messageRecievedBox = (comment, sender, id) => {
    return (
      <div className="place-self-start text-left ml-8">
        <div className="bg-white bg-opacity-10 shadow rounded-2xl p-5 text-white max-w-md">
          <div className="text-slate-800 font-semibold">{sender}</div>
          {comment}
        </div>
      </div>
    );
  };

  console.log("commentsArray");

  return (
    <div>
      <div className="p-8">
        <div
          className="max-h-96 w-96 mx-auto space-y-12 grid grid-cols-1 overflow-y-scroll px-8"
          ref={lastCommentDiv}
        >
          <div>{memberCount} online</div>
          <div>{newMember} joined </div>
          <div>{memberLeft} left</div>
          {commentsArray.map(({ comment, sender, type }, id) => {
            if (type === "comment") {
              return sender
                ? messageRecievedBox(comment, sender, id)
                : messageSentBox(comment, id);
            }
          })}
        </div>
        <div className="shadow rounded-2xl text-white w-full flex items-center justify-between mt-2">
          <div className="bg-white rounded-full h-12 w-14 p-2 flex items-center justify-center">
            <img className="cursor-pointer h-full w-full" src={diamond} />
          </div>
          <div className="flex items-center w-full mx-2">
            <input
              type="text"
              name="comment"
              className="bg-white shadow rounded-2xl p-2 text-black w-full mt-auto"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div
            className="w-16 h-16 flex items-center cursor-pointer"
            onClick={sendChannelMessage}
          >
            <img src={sendButton} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;


