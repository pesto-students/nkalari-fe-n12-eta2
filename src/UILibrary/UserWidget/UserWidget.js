import React from "react";

// display user info
const UserWidget = ({ data }) => {
  // console.log(data, "data");
  return (
    <div className="user-widget flex flex-row bg-white/30 backdrop-blur px-4 py-2 rounded-full mr-4">
      <img
        className="w-8 h-8 rounded-full"
        src={data.profileImageUrl}
        alt="user"
      />
      <span className="text-xl ml-4">{data.firstName}</span>
    </div>
  );
};

export default UserWidget;
