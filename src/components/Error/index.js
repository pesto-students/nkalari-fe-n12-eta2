import React from "react";
import error from "./../../images/error.gif";

function Error() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <img src={error} />
    </div>
  );
}

export default Error;
