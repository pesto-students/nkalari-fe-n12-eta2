import "./App.css";
import React, { Component } from "react";
import { Wallet } from "./components/wallet/Wallet";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Profile from "./components/profile/Profile";
import Login from "./components/Login";
import Onboarding from "./components/Onboarding";
import RechargePage from "./components/Recharge";
import Landing from "./components/landing";
import Loader from "./components/Loader";
import { connect } from "react-redux";
import { fetchLoggedUser, identifyLoggedUser } from "./actions/user.action";
import { Redirect } from "react-router-dom";

function publicRoutes() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Redirect from="*" to="/login" />
      </Switch>
    </>
  );
}

function privateRoutes(user) {
  if (!user.firstName) {
    return (
      <Switch>
        <Route exact path="/onboarding" component={Onboarding} />
        <Redirect from="*" to="/onboarding" />
      </Switch>
    );
  }
  return (
    <>
      <Switch>
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/wallet" component={Wallet} />
        <Route exact path="/recharge" component={RechargePage} />
        <Redirect from="*" to="/profile" />
      </Switch>
    </>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(identifyLoggedUser());
  }

  render() {
    let token = localStorage.getItem("nkalari");
    console.log(this.props, "user");
    return (
      <BrowserRouter>
        {token && this.props.user.isAuthInProgress ? (
          <Loader />
        ) : this.props.user.currentUser ? (
          privateRoutes(this.props.user.currentUser)
        ) : (
          publicRoutes()
        )}
      </BrowserRouter>
    );
  }
}

function mapToProps({ user }) {
  return { user };
}

export default connect(mapToProps)(App);
