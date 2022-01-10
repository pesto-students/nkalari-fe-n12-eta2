import "./App.css";
import React, { Component } from "react";
import { Wallet } from "./components/wallet/Wallet";
import {  Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "./components/NewLogin/NewLogin";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/wallet" component={Wallet} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
