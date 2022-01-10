import React, { Component } from "react";

function Navbar() {
    const [isVisible, setVisible] = React.useState(false);
    return (
      <div className={`App ${isVisible ? "show" : ""}`}>
        <nav className="side-nav">
          
        </nav>
  
        <main className="">
          <button className="btn-c-primary" onClick={()=>setVisible((curr)=>!curr)}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21 16H3V14H21V16ZM21 10H3V8H21V10Z" fill="#2E3A59"></path>
            </svg>
          </button>
        </main>
      </div>
    );
  }
  
export default Navbar;
  