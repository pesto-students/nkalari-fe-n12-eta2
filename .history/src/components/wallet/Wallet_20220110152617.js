import React, { Component } from "react";
import styles from "./index.css";
import { connect } from "react-redux";
import { userActions } from "./../../actions/user.action";
import Diamonds from "./../..images/Diamonds.png";
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
                  <div className="box-transaction flex my-4">
                    <div className="flex items-center justify-between w-full px-10 font-semibold">
                      <div className="flex flex-col justify-center items-center">
                        <p className="text-white text-3xl">{"Top-up"}</p>
                        <p className="text-white text-3xl">{"500"}</p>
                      </div>
                      <div className="flex justify-center">
                        <p className="text-white text-3xl">{"+2000"}</p>
                        <img src={Diamonds} className="w-8" />
                      </div>
                    </div>
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