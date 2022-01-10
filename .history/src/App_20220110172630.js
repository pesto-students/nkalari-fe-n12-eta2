import "./App.css";
import React, { Component } from "react";
import { Wallet } from "./components/wallet/Wallet";
import {  Route, Switch, BrowserRouter } from "react-router-dom";
import OtpScreen from "./components/OtpScreen/OtpScreen";
import Main from "./components/NewLogin/NewLogin";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/wallet" component={Wallet} />
          <Route exact path="/otp-verify" component={OtpScreen} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
