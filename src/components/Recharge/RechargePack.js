import { React, useEffect } from "react";
import Diamonds from "./../../images/Diamonds.png";
import {userActions} from "./../../actions/user.action";
import { connect } from "react-redux";


function handleOnclick(props){
  let price_id = "";
  console.log("Props",props);
  switch(props.amount) {
    case "510":
      price_id = 'price_1KMs2uSAIpv25iqwATWyJc3L';
      break;
    case "1020":
      price_id = 'price_1KP0WrSAIpv25iqw6hR3QDRJ';
      break;
    case "1530":
      price_id = 'price_1KP0XCSAIpv25iqwLdwJkcXP';
      break;
    default:
      price_id = 'price_1KP0XbSAIpv25iqw9gmrDHkA';
  }
  console.log("price",price_id); 
  props.stripeCheckout(price_id);
}

const RechargePack = (props) => {

  useEffect(() => {
    if(props.url) 
      window.location.href = props.url
  }, [props.url])
  return (
    <div className="bg-white bg-opacity-20 shadow rounded-2xl w-72 flex flex-col items-center justify-center p-2 recharge-pack my-8 hover:bg-opacity-50 cursor-pointer" onClick={()=>handleOnclick( props)}>
      <p className="text-6xl font-semibold text-center text-white">
        {props.numberOfDiamonds}
      </p>
      <img className="transform rotate-2" src={Diamonds} />
      <p className="text-2xl font-bold text-center text-white">{`₹${props.amount}`}</p>
    </div>
  );
};

function mapState(state) {
  console.log("state", state);
  const { url } = state.getTransactions;
  return { url };
}

const actionCreators = {
  stripeCheckout: userActions.stripeCheckout,
};

const rechargePage = connect(mapState, actionCreators)(RechargePack);


export default rechargePage;