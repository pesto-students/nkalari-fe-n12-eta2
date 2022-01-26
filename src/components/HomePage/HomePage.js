import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Plus } from "react-feather";
import { getHeadlineGigs } from "../../services/gigs.service";

import "./HomePage.css";

const HomePage = () => {
  const [headlines, setHeadlines] = useState(null);
  const [index, setindex] = useState(0);

  const categoriestable = {
    music: "🎸 Music",
    dance: "💃 Dance",
    art: "🎨 Art",
    show: "🎥 Show",
    comedy: "😆 Comedy",
  };

  const headlineObserver = getHeadlineGigs();
  useEffect(() => {
    const sub = headlineObserver.subscribe({
      next(data) {
        setHeadlines(data);
      },
      error(err) {
        console.log(err);
      },
    });

    return () => sub.unsubscribe();
  }, []);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="relative home-wrap w-screen h-screen">
      <div className="headline-wrap">
        {headlines?.map((gig, i) => {
          let gigDate = new Date(gig.scheduled_at);
          return (
            <div
              key={i}
              className={`head-gig relative w-full h-screen ${
                index === i ? "" : "hidden"
              }`}
            >
              <div className="absolute bottom-32 left-32 flex justify-between items-end">
                <div className="details z-20 rounded-xl bg-black/30 backdrop-blur p-6 text-white w-3/5 text-left">
                  <div className="text-xl category bg-white text-black rounded-full px-4 py-2 inline-block mb-6">
                    {categoriestable[gig.category]}
                  </div>
                  <br />
                  <h1 className="text-8xl inline-block font-bold">
                    {gig.title}
                  </h1>
                  <p className="text-2xl my-6 opacity-60">{gig.desc}</p>
                  <div className="dates flex flex-row justify-between">
                    <div className="date flex flex-row items-center">
                      <div className="py-2 px-4 rounded-xl bg-white text-black flex flex-col justify-center items-center">
                        <span className="text-5xl block">
                          {gigDate.getDate()}
                        </span>
                        <span className="text-center uppercase font-bold">
                          {months[gigDate.getMonth()]}
                        </span>
                      </div>
                      <span className="text-6xl py-2 ml-4 text-yellow-500 block">
                        {gigDate.getHours()}:{gigDate.getMinutes()}
                      </span>
                    </div>
                    <div className="join">
                      <div className="primary-btn flex items-center">
                        <Plus /> &ensp; JOIN
                      </div>
                    </div>
                  </div>
                </div>
                <div className="slide-nav ml-12 z-20 text-black mr-32">
                  <div onClick={()=>setindex(index===0?2:index-1)} className="nav-btn rounded-xl p-6 bg-white prev cursor-pointer"><ArrowLeft/></div>
                  <div onClick={()=>setindex(index===2?0:index+1)} className="nav-btn rounded-xl mt-4 p-6 bg-white next cursor-pointer"><ArrowRight/></div>
                </div>
              </div>
              <div className="absolute z-10 top-0 w-full h-full bg-gradient-to-t from-black to-transparent"></div>
              <img
                className="absolute top-0 w-full h-full object-cover"
                src={gig.thumbnail}
                alt="thumbnail"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
