import React, { Component } from "react";
import styles from "./index.css";
import { connect } from "react-redux";
import { userActions } from "./../../actions/user.action";
import Navbar from "./../navbar/Navbar";
class Wallet extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getTransactions();
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>
        <h1 className="heading">Wallet</h1>
        <div className="left">
          <div className="balance">
            <h1 className="balance-heading">Balance </h1>
            <h1 className="balance-value">5000</h1>
          </div>
          <div className="buttons">
            <button className="withdraw">Withdraw</button>
            <button className="recharge">Recharge</button>
          </div>
        </div>
        <div className="right">
          <div className="recent-transactions">
            {this.props.transactions && this.props.transactions.length > 0 ? (
              this.props.transactions.map((data) => {
                return (
                  <div className="box-transaction">
                    <p style={{ float: "left" }}>
                      {data.name}
                      <b> {data.amount} </b>
                    </p>
                  </div>
                );
              })
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  console.log("state", state);
  const { transactions } = state.getTransactions;
  return { transactions };
}

const actionCreators = {
  getTransactions: userActions.getTransactions,
};

const WalletPage = connect(mapState, actionCreators)(Wallet);

export { WalletPage as Wallet };
