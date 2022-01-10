import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import Login from "./components/Login/Login";
import { Wallet } from "./components/wallet/Wallet";
import { history } from "./helpers/history";
import { Router, Route, Switch, BrowserRouter } from "react-router-dom";
import { Signup } from "./components/signup/Signup";
import OtpScreen from "./components/OtpScreen/OtpScreen";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/wallet" component={Wallet} />
          <Route exact path="/otp-verify" component={OtpScreen} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
