import React from "react";
// import { connect } from 'react-redux'
// import { userActions } from '../../actions/user.action'
import Navbar from "../navbar/Navbar";

import "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <main className="relative h-screen w-full flex flex-row">
      <Navbar className="nav-bar"></Navbar>
      <div className="content-col w-full">{children}</div>
    </main>
  );
};

export default Layout;
