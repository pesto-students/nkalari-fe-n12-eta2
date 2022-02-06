import React from "react";

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
        <span className="text-xl font-bold block">
          {gigDate.getDate()} {months[gigDate.getMonth()]}
        </span>
      </div>
      <span className="text-4xl py-2 ml-4 text-yellow-500 block">
        {gigDate.getHours()}:{gigDate.getMinutes()}
      </span>
    </div>
  );
};

export default DateWidget;
