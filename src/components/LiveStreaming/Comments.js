import React, { useEffect, useState, useRef } from "react";
import AgoraRTM from "agora-rtm-sdk";
import AgoraRTC from "agora-rtc-sdk";
import { useBeforeunload } from "react-beforeunload";
import { useSelector } from "react-redux";
import sendButton from "../../assets/sendIcon.png";
import diamond from "../../images/Diamonds.png";
// import "./style.css";
import bike from "../../images/bike-gift.png";
import cake from "../../images/cake-gift.png";
import burger from "../../images/burger-gift.png";
import chocolate from "../../images/chocolate-gift.png";
import guitar from "../../images/guitar-gift.png";
import heart from "../../images/heart-gift.png";
import mobile from "../../images/mobile-gift.png";
import pastry from "../../images/pastry-gift.png";
import pizza from "../../images/pizza-gift.png";
import rose from "../../images/rose-gift.png";
import ship from "../../images/ship-gift.png";
import star from "../../images/star-gift.png";

const gifts = [
  {
    name: "bike",
    source: bike,
    price: 500,
  },
  {
    name: "cake",
    source: cake,
    price: 500,
  },
  {
    name: "burger",
    source: burger,
    price: 500,
  },
  {
    name: "chocolate",
    source: chocolate,
    price: 500,
  },
  {
    name: "guitar",
    source: guitar,
    price: 500,
  },
  {
    name: "heart",
    source: heart,
    price: 500,
  },
  {
    name: "mobile",
    source: mobile,
    price: 500,
  },
  {
    name: "pizza",
    source: pizza,
    price: 500,
  },
  {
    name: "pastry",
    source: pastry,
    price: 500,
  },
  {
    name: "rose",
    source: rose,
    price: 500,
  },
  {
    name: "ship",
    source: ship,
    price: 500,
  },
  {
    name: "star",
    source: star,
    price: 500,
  },
];

let client;
let channel;
const Comments = ({ rtmToken, rtcToken, channelName, isHost }) => {
  const { currentUser } = useSelector((store) => store.user);
  const [comment, setComment] = useState("");
  const [memberCount, setMemberCount] = useState(0);
  const [newMember, setNewMember] = useState("");
  const [memberLeft, setMemberLeft] = useState("");
  const [commentsArray, setCommentsArray] = useState([]);
  const updatedCommentsArray = useRef();
  const lastCommentDiv = useRef();
  const updatedChannel = useRef();
  const [isStreamStarted, setIsStreamStarted] = useState(false);
  const [showGiftsBox, setShowGiftsBox] = useState(false);
  const [showRecievedGift, setShowRecievedGift] = useState(false);
  const [recivedGift, setRecievedGift] = useState();

  // Params for login
  let options = {
    uid: currentUser.uid,
    token: rtmToken,
    channel: channelName,
    rtcToken: rtcToken,
  };

  var rtc = {
    client: null,
    joined: false,
    published: false,
    localStream: null,
    remoteStreams: [],
    params: {},
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
      if (JSON.parse(message.text).type === "gift") {
        setShowRecievedGift(true);
        const source = gifts.filter(
          (gift) => gift.name === JSON.parse(message.text).gift
        )[0].source;
        setRecievedGift(source);
        setTimeout(() => {
          setShowRecievedGift(false);
          setRecievedGift("");
        }, 6000);
        return console.log(message, "guft");
      }
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
    if (rtmToken && channelName) {
      client = AgoraRTM.createInstance(process.env.REACT_APP_AGORA_APP_ID);
      rtc.client = AgoraRTC.createClient({ mode: "live", codec: "h264" });
      client.login(options).then(async (response) => {
        channel = client.createChannel(channelName);
        await channel.join(channelName);
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
    if (comment) {
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
    }
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

  const messageSentBox = (comment, id, superChat = false) => {
    return (
      <div
        className={`place-self-end text-left mr-8 ${
          superChat ? "border-t-teal-500" : ""
        }`}
      >
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

  const messageRecievedBox = (comment, sender, id, superChat = false) => {
    return (
      <div
        className={`place-self-start text-left ml-8 ${
          superChat ? "border-t-teal-500" : ""
        }`}
      >
        <div className="bg-white bg-opacity-10 shadow rounded-2xl p-5 text-white max-w-md">
          <div className="text-slate-800 font-semibold">{sender}</div>
          {comment}
        </div>
      </div>
    );
  };

  //
  async function joinChannel(role) {
    // Create a client
    rtc.client = await AgoraRTC.createClient({ mode: "live", codec: "h264" });
    // Initialize the client
    rtc.client.init(
      process.env.REACT_APP_AGORA_APP_ID,
      function () {
        console.log("init success");

        // Join a channel
        rtc.client.join(
          options.rtcToken ? options.rtcToken : null,
          options.channel,
          options.uid ? +options.uid : null,
          function (uid) {
            console.log(
              "join channel: " + options.channel + " success, uid: " + uid
            );
            rtc.params.uid = uid;

            // if client role is host, then create a local stream
            if (role === "host") {
              rtc.client.setClientRole("host");
              // Create a local stream
              rtc.localStream = AgoraRTC.createStream({
                streamID: rtc.params.uid,
                audio: true,
                video: true,
                screen: false,
              });

              // Initialize the local stream
              rtc.localStream.init(
                function () {
                  setIsStreamStarted(true);
                  console.log("init local stream success");
                  rtc.localStream.play("local_stream");
                  rtc.client.publish(rtc.localStream, function (err) {
                    console.log("publish failed");
                    console.error(err);
                  });
                },
                function (err) {
                  console.error("init local stream failed ", err);
                }
              );

              rtc.client.on("connection-state-change", function (evt) {
                console.log("audience", evt);
              });
            }

            // if client role is audience, then only join the channel
            if (role === "audience") {
              rtc.client.on("connection-state-change", function (evt) {
                console.log("audience", evt);
              });

              rtc.client.on("stream-added", function (evt) {
                setIsStreamStarted(true);
                var remoteStream = evt.stream;
                var id = remoteStream.getId();
                if (id !== rtc.params.uid) {
                  rtc.client.subscribe(remoteStream, function (err) {
                    console.log("stream subscribe failed", err);
                  });
                }
                console.log("stream-added remote-uid: ", id);
              });

              rtc.client.on("stream-removed", function (evt) {
                var remoteStream = evt.stream;
                var id = remoteStream.getId();
                console.log("stream-removed remote-uid: ", id);
              });

              rtc.client.on("stream-subscribed", function (evt) {
                var remoteStream = evt.stream;
                var id = remoteStream.getId();
                remoteStream.play("remote_video_");
                console.log("stream-subscribed remote-uid: ", id);
              });

              rtc.client.on("stream-unsubscribed", function (evt) {
                var remoteStream = evt.stream;
                var id = remoteStream.getId();
                remoteStream.pause("remote_video_");
                console.log("stream-unsubscribed remote-uid: ", id);
              });
            }
          },
          function (err) {
            console.error("client join failed", err);
          }
        );
      },
      (err) => {
        console.error(err);
      }
    );
  }

  function leaveEventHost(params) {
    rtc.client.unpublish(rtc.localStream, function (err) {
      console.log("publish failed");
      console.error(err);
    });
    rtc.client.leave(function (ev) {
      console.log(ev);
    });
  }

  function leaveEventAudience(params) {
    rtc.client.leave(
      function () {
        console.log("client leaves channel");
        //……
      },
      function (err) {
        console.log("client leave failed ", err);
        //error handling
      }
    );
  }

  const sendGiftToHost = (gift) => {
    setShowGiftsBox(false);
    channel
      .sendMessage({
        text: JSON.stringify({
          gift: gift.name,
          type: "gift",
          sender: currentUser.firstName + currentUser.lastName,
        }),
      })
      .then((res) => {
        // Your code for handling the event when the channel message is successfully sent.
        // setRecievedGift()

        // setComment("");
        setShowRecievedGift(true);
        setRecievedGift(gift.source);
        setTimeout(() => {
          setShowRecievedGift(false);
          setRecievedGift("");
        }, 6000);

        console.log("channel gift sent", res);
      })
      .catch((error) => {
        // Your code for handling the event when the channel message fails to be sent.
        console.log("error sending channel gift", error);
      });
  };

  const showGift = () => {
    // setShowRecievedGift(true);
  };

  return (
    <div className="flex w-full">
      <div className="grow flex justify-center items-center">
        {isStreamStarted &&
          (isHost ? (
            <div className="relative ml-24 h-full w-full">
              <div
                id="local_stream"
                className="local_stream h-full w-full relative"
              ></div>
              <button
                className="bg-black hover:bg-gray-900 text-white text-center py-2 px-4 rounded-full absolute bottom-[10px] z-50 ml-2"
                onClick={() => leaveEventHost("host")}
              >
                Stop Streaming
              </button>

              {showRecievedGift && (
                <div className="text-white text-center py-2 px-4 rounded-full absolute bottom-[10px] z-50 ml-2 right-[15px] animate-bounce ">
                  Received
                  <img src={recivedGift} className="w-32" />
                </div>
              )}
            </div>
          ) : (
            <div className="relative ml-24 h-full w-full">
              <div id="remote_video_" className="h-full w-full relative"></div>

              <button
                className="bg-black hover:bg-gray-900 text-white text-center py-2 px-4 rounded-full absolute bottom-[10px] z-50 ml-2"
                onClick={() => leaveEventAudience("audience")}
              >
                Leave Streaming
              </button>
              {showRecievedGift && (
                <div className="text-white text-center py-2 px-4 rounded-full absolute bottom-[10px] z-50 ml-2 right-[15px] animate-bounce ">
                  {"Host Received"}
                  <img src={recivedGift} className="w-32" />
                </div>
              )}
            </div>
          ))}
        <div>
          {!isStreamStarted &&
            (isHost ? (
              <button
                className="bg-black hover:bg-gray-900 text-white text-center py-2 px-4 rounded-full"
                onClick={() => joinChannel("host")}
              >
                Go Live
              </button>
            ) : (
              <button onClick={() => joinChannel("audience")}>
                Join Streaming
              </button>
            ))}
        </div>
      </div>
      <div className="flex items-end">
        {/* <div>{memberCount} online</div>
        <div>{newMember} joined </div>
        <div>{memberLeft} left</div> */}
        <div className="p-8">
          <div
            className="max-h-screen w-96 mx-auto space-y-12 grid grid-cols-1 overflow-y-scroll px-8"
            ref={lastCommentDiv}
          >
            {commentsArray.map(({ comment, sender, type }, id) => {
              if (type === "comment") {
                return sender
                  ? messageRecievedBox(comment, sender, id)
                  : messageSentBox(comment, id);
              }
              if (type === "superchat") {
                return sender
                  ? messageRecievedBox(comment, sender, id, true)
                  : messageSentBox(comment, id, true);
              }
            })}
          </div>
          <div className="relative">
            {showGiftsBox && (
              <div className="w-64 h-64 bg-white absolute bottom-[64px] flex flex-wrap rounded-lg justify-center items-center">
                {gifts.map((gift) => (
                  <div
                    className="cursor-pointer p-2"
                    onClick={() => sendGiftToHost(gift)}
                  >
                    <img src={gift.source} className="w-8 h-10" />
                    <div className="text-xs flex justify-center">
                      {gift.price} <img className="h-4" src={diamond} />
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="shadow rounded-2xl text-white w-full flex items-center justify-between mt-2">
              <div className="bg-white rounded-full h-12 w-14 p-2 flex items-center justify-center">
                <img
                  className={`h-full w-full ${
                    isHost ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                  src={diamond}
                  disabled={isHost}
                  onClick={() =>
                    !isHost ? setShowGiftsBox(!showGiftsBox) : ""
                  }
                />
              </div>
              <div className="flex items-center w-full mx-2">
                <input
                  type="text"
                  name="comment"
                  className="bg-white shadow rounded-2xl p-2 text-black w-full mt-auto"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      sendChannelMessage();
                    }
                  }}
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
      </div>
    </div>
  );
};

export default Comments;
