import { render } from "@testing-library/react";
import React, { Component } from "react"
import {Wallet} from "../wallet/Wallet";
import firebase from './../../helpers/firebase'
import {history} from './../../helpers/history'
import styles from './index.css';  

class Login extends Component{
    constructor(props){
        super(props);

    }


handleChange = (e) =>{
    const {name, value } = e.target
    this.setState({
        [name]: value
      })
  }
  configureCaptcha = () =>{
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {

        this.onSignInSubmit();
        console.log("Recaptca varified")
      },
      defaultCountry: "IN"
    });
  }
  onSignInSubmit = (e) => {
    e.preventDefault()
    this.configureCaptcha()
    const phoneNumber = "+91" + this.state.mobile
    console.log(phoneNumber)
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
      
          window.confirmationResult = confirmationResult;
          console.log("OTP has been sent")

        }).catch((error) => {
         
          console.log("SMS not sent")
        });
  }
  onSubmitOTP = (e) =>{
    e.preventDefault()
    const code = this.state.otp
    console.log(code)
    window.confirmationResult.confirm(code).then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log(JSON.stringify(user))
      return <Wallet></Wallet>

    }).catch((error) => {
   
    });
  }

render(){
    return(
        <div className="login-input-section">
        <h1 className="Login-heading">Login to Nkalari</h1>
        <form onSubmit={this.onSignInSubmit}>
          <div id="sign-in-button" ></div>
          <input className="mobile-input" type="number" name="mobile" placeholder="Mobile number" required onChange={this.handleChange}/>
          
    
          <input className="email-input" type="text" name="email" placeholder="email (Optional)" onChange={this.handleChange}/>
          
        </form>
        <button type="submit" className="btn-signin">Submit</button> 

        <h1>Enter OTP</h1>
        <form onSubmit={this.onSubmitOTP}>
          <input type="number" name="otp" placeholder="OTP Number" required onChange={this.handleChange}/>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
}

}

export default Login;