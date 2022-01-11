import "./App.css";
import React, { Component } from "react";
import { Wallet } from "./components/wallet/Wallet";
import {  Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "./components/NewLogin/NewLogin";
import CreateProfile from "./components/NewLogin/CreateProfile"
import Profile from "./components/profile/Profile";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Profile} />
          <Route exact path="/wallet" component={Wallet} />
          
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
