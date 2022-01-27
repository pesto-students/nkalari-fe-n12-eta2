import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Plus } from "react-feather";
import { useStream } from "../../helpers/rxjsFirestore";
import {
  streamGigsByCategory,
  streamHeadlineGigs,
} from "../../services/gigs.service";

import "./HomePage.css";

// card component
const GigCardLarge = ({ data }) => {
  return (
    <div className="gig-card-large mr-4 w-96 text-white rounded-xl p-4 bg-black/40 backdrop-blur">
      <div className="thumbnail">
        <img src={data.thumbnail} alt={data.title} />
      </div>
      <h2 className="text-2xl my-4 text-left">{data.title}</h2>
      <DateWidget date={data.scheduled_at} />
    </div>
  );
};

//date component
const DateWidget = ({ date }) => {
  let gigDate = new Date(date);
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
    <div className="date-wrap flex flex-row items-center">
      <div className="py-2 px-4 rounded-xl bg-white text-black flex flex-row justify-center items-center">
        <span className="text-xl font-bold block">{gigDate.getDate()} {months[gigDate.getMonth()]}</span>
      </div>
      <span className="text-4xl py-2 ml-4 text-yellow-500 block">
        {gigDate.getHours()}:{gigDate.getMinutes()}
      </span>
    </div>
  );
};

const HomePage = () => {
  const [index, setindex] = useState(0);

  const categoriestable = {
    music: "🎸 Music",
    dance: "💃 Dance",
    art: "🎨 Art",
    show: "🎥 Show",
    comedy: "😆 Comedy",
  };

  const headlines = useStream(streamHeadlineGigs(), []);
  const gigsCategoryWise = {
    music: useStream(streamGigsByCategory("music"), []),
    dance: useStream(streamGigsByCategory("dance"), []),
    art: useStream(streamGigsByCategory("art"), []),
    show: useStream(streamGigsByCategory("show"), []),
    comedy: useStream(streamGigsByCategory("comedy"), []),
  };

  return (
    <div className="relative home-wrap w-full bg-black/60">
      <div className="headline-wrap">
        {headlines?.map((gig, i) => {
          return (
            <div
              key={i}
              className={`head-gig relative w-full h-screen ${
                index === i ? "" : "hidden"
              }`}
            >
              <div className="absolute bottom-32 left-32 flex justify-between items-end">
                <div className="details z-20 rounded-xl p-6 text-white w-2/5 text-left">
                  <div className="text-xl category bg-white text-black rounded-full px-4 py-2 inline-block mb-6">
                    {categoriestable[gig.category]}
                  </div>
                  <br />
                  <h1 className="text-8xl inline-block">
                    {gig.title}
                  </h1>
                  <p className="text-xl my-6 opacity-60">{gig.desc}</p>
                  <div className="info flex flex-row justify-between">
                    <DateWidget date={gig.scheduled_at} />
                    <div className="join">
                      <div className="special-btn flex items-center">
                        <Plus /> &ensp; JOIN
                      </div>
                    </div>
                  </div>
                </div>
                <div className="slide-nav ml-12 z-20 text-black mr-32">
                  <div
                    onClick={() => setindex(index === 0 ? 2 : index - 1)}
                    className="nav-btn rounded-xl p-6 bg-white prev cursor-pointer"
                  >
                    <ArrowLeft />
                  </div>
                  <div
                    onClick={() => setindex(index === 2 ? 0 : index + 1)}
                    className="nav-btn rounded-xl mt-4 p-6 bg-white next cursor-pointer"
                  >
                    <ArrowRight />
                  </div>
                </div>
              </div>
              {/* gradient overlay */}
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
      <div className="relative categories-wrap pl-32 pt-32">
        {/* gradient overlay */}
        <div className="absolute inline z-0 top-0 left-0 w-full h-64 bg-gradient-to-b from-black to-transparent"></div>
        {Object.keys(gigsCategoryWise).map((category, i) => (
          <div key={i} className="z-10 category-gigs-wrap mt-12">
            <div className="text-left category text-white text-5xl rounded-full px-4 py-2 mb-6">
              {categoriestable[category]}
            </div>
            <div className="gigs-wrap flex flex-row">
              {gigsCategoryWise[category].map((card) => (
                <GigCardLarge data={card} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
