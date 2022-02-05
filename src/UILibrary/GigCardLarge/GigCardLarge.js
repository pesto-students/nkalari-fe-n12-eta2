import React from "react";
import { Plus } from "react-feather";
import { Link } from "react-router-dom";
import DateWidget from "../DateWidget/DateWidget";
import UserWidget from "../UserWidget/UserWidget";

const GigCardLarge = ({ data }) => {
  return (
    <div className="gig-card-large mr-4 mt-4 w-96 text-white rounded-xl p-4 bg-black/40 backdrop-blur">
      <div className="thumbnail rounded-xl">
        <img src={data.thumbnail} alt={data.title} />
      </div>
      {/* link to detail page */}
      <Link
        to={`/gig/${data.id}`}
        className="gig-card-large-link hover:underline"
      >
        <h2 className="text-2xl mt-4 text-left">{data.title}</h2>
      </Link>
      <div className="flex flex-row my-4">
        <UserWidget data={data.host_user} />
        {/* <CategoryWidget category={categoriestable[data.category]} /> */}
      </div>
      <div className="flex flex-row justify-between">
        <DateWidget date={data.date} />
        <Link to={`/livestream/${data.id}`} className="special-btn">
          <Plus />
        </Link>
      </div>
    </div>
  );
};

export default GigCardLarge;
