import React from "react";
import Diamonds from "./../../images/Diamonds.png";

const RechargePack = ({ numberOfDiamonds, amount }) => {
  return (
    <div className="bg-white bg-opacity-20 shadow rounded-2xl w-72 flex flex-col items-center justify-center p-2 recharge-pack my-8 hover:bg-opacity-50 cursor-pointer">
      <p className="text-6xl font-semibold text-center text-white">
        {numberOfDiamonds}
      </p>
      <img className="transform rotate-2" src={Diamonds} />
      <p className="text-2xl font-bold text-center text-white">{`₹${amount}`}</p>
    </div>
  );
};

export default RechargePack;
