import React from "react";
import "./loader.css";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="lds-hourglass"></div>
    </div>
  );
};

export default Loader;
