import "./App.css";
import React, { Component } from "react";
import { Wallet } from "./components/wallet/Wallet";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Onboarding from "./components/Onboarding";
import RechargePage from "./components/Recharge";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/onboarding" component={Onboarding} />
          <Route exact path="/wallet" component={Wallet} />
          <Route exact path="/recharge" component={RechargePage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
