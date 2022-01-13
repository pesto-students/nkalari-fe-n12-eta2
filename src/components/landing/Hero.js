import React from "react";

import rectangle_1 from '../../assets/Rectangle_1.png';
import rectangle_2 from '../../assets/Rectangle_2.png'; 
import logo from "../../assets/logo.png"
import { useHistory } from "react-router-dom";

const Hero = ({appType, tagLine, description, mainActionText, extraActionText}) => {
  const history = useHistory();

  return (
    <div className="bg-[url('https://source.unsplash.com/T9OjDl5SbcM/1920x1280')]">
      <a href="/" className="pl-7 ml-10 logo lg:ml-10">
        <img height="3%" width="3%" src={logo} alt="logo" className="ml-10" />
      </a>
    <div id="product">
      <div style={{textShadow:'0px 1px 1px gray'}} className="flex flex-col items-center justify-start font-sans min-h-96 lg:pt-10 lg:pb-20 shadow-lg	lg:bg-hero lg:bg-cover">
        
        <div>
          <p className="p-3 pt-12 text-lg font-bold text-white lg:text-white">{appType}</p>
        </div>
        <div>
          <p className="p-2 text-4xl font-bold text-center  text-blue-800 lg:mx-auto lg:w-4/6 lg:text-5xl lg:text-gray-100">
            {tagLine}
          </p>
        </div>
        <div>
          <p className="p-4 pt-6 font-sans text-2xl leading-10  text-center text-gray-500 lg:text-gray-200">
            {description}
          </p>
        </div>
        <div className="relative z-50 flex flex-col items-center justify-between h-48 lg:space-x-8 pt-7 lg:pt-0 lg:flex-row lg:justify-between lg:w-90">
          <button
            className="pl-12 pr-24 text-2l font-semibold text-center text-white transition-all bg-purple-600 shadow-2xl lg:ml-5 hover:bg-grey-700 focus:outline-none   lg:font-medium "
            onClick={(e)=>{ e.preventDefault();
              history.push("/login")}
             }
          >
            {mainActionText}
          </button>
        
        </div>
        
      </div>
      <div className="z-0 flex flex-row items-start justify-center w-screen h-screen pt-20 -mb- bg-gray-50 lg:bg-white lg:mb-0 lg:w-full lg:h-96 lg:pt-0">
          <img className="absolute left-0 lg:left-auto  lg:mr-72 lg:-mt-72" src={rectangle_1} alt=""/><img className="absolute right-0 lg:right-auto lg:ml-72 lg:-mt-64" src={rectangle_2} alt=""/>
        </div>
    </div>
    </div>
  );
};

export default Hero;
