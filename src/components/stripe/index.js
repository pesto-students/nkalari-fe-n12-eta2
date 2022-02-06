import React, { useState, useEffect } from "react";
import { userActions } from "./../../actions/user.action";
import { connect } from "react-redux";

function checkout(props) {
  props.stripeCheckout();
}

const ProductDisplay = (props) => (
  <section>
    <form onSubmit={props.stripeCheckout()}>
      <button type="submit">Checkout</button>
    </form>
  </section>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

function Stripe(props) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Recharge Successful.");
    }

    if (query.get("canceled")) {
      setMessage("Order canceled -- checkout when you're ready.");
    }
  }, []);

  return message ? <Message message={message} /> : <ProductDisplay />;
}

function mapState(state) {
  console.log("state", state);
  // const { transactions } = state.getTransactions;
  return {};
}

const actionCreators = {
  stripeCheckout: userActions.stripeCheckout,
};

const stripePage = connect(mapState, actionCreators)(ProductDisplay);

export default stripePage;
