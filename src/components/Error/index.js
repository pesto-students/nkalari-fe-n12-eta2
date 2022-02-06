import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import error from "./../../images/error.gif";

function Error() {
  const [showLoader, setShowLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => setShowLoader(false), 4000);
  }, []);
  return showLoader ? (
    <Loader />
  ) : (
    <div className="flex justify-center items-center h-full w-full">
      <img src={error} />
    </div>
  );
}

export default Error;
