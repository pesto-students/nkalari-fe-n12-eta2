import "./App.css";
import React, { Component } from "react";
import { Wallet } from "./components/wallet/Wallet";
import { Route, Switch, BrowserRouter } from "react-router-dom";
// import Profile from "./components/profile/Profile";
import Login from "./components/Login";
import Onboarding from "./components/Onboarding";
import RechargePage from "./components/Recharge";
import Landing from "./components/landing";
import Loader from "./components/Loader";
import { connect } from "react-redux";
import { fetchLoggedUser, identifyLoggedUser } from "./actions/user.action";
import { Redirect } from "react-router-dom";
// import LiveStream from "./components/LiveStreaming";
import HomePage from "./components/HomePage/HomePage";
import Layout from "./components/Layout/Layout";
import NewGig from "./components/NewGig/NewGig";
import ProfilePage from "./components/ProfilePage/ProfilePage";

function publicRoutes() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        {/* <Redirect from="*" to="/login" /> */}
        <Route path="*">
          <h1>404 error- Rout not found</h1>
        </Route>
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
      {/* <Switch>
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/wallet" component={Wallet} />
        <Route exact path="/recharge" component={RechargePage} />
        <Route exact path="/livestream" component={LiveStream} />
        <Redirect from="*" to="/profile" />
      </Switch> */}
      <Layout>
        <Switch>
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/newgig" component={NewGig} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/wallet" component={Wallet} />
          <Route exact path="/recharge" component={RechargePage} />
          {/* <Route exact path="/livestream" component={LiveStream} /> */}
          <Redirect from="*" to="/profile" />
        </Switch>
      </Layout>
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
