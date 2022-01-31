import React from 'react';
import { Plus } from 'react-feather';
import DateWidget from '../DateWidget/DateWidget';
import UserWidget from '../UserWidget/UserWidget';

const GigCardLarge = ({ data }) => {
  return (
    <div className="gig-card-large mr-4 w-96 text-white rounded-xl p-4 bg-black/40 backdrop-blur">
      <div className="thumbnail rounded-xl">
        <img src={data.thumbnail} alt={data.title} />
      </div>
      <h2 className="text-2xl mt-4 text-left">{data.title}</h2>
      <div className="flex flex-row my-4">
        <UserWidget data={data.host_user} />
        {/* <CategoryWidget category={categoriestable[data.category]} /> */}
      </div>
      <div className="flex flex-row justify-between">
      <DateWidget date={data.date} />
      <div className="special-btn"><Plus/></div>
      </div>
    </div>
  );
};

export default GigCardLarge;
