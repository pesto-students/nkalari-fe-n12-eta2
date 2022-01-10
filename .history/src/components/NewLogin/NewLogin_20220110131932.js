import React, { Component } from "react"
import styles from './index.css';  
import firebase from './../../helpers/firebase'
import { useHistory } from "react-router-dom";

const useState = React.useState

function Main(props) {
  const [loggedIn, setLoggedIn] = useState(false)
  
  return(
    <>
      {loggedIn ?  <AccountCreatedScreen setLoggedIn={setLoggedIn}/> : <CreateUserScreen setLoggedIn={setLoggedIn}/>}
    </>
  )
}

//Create Account
function CreateUserScreen(props) {
  
  const [email, setEmail] = useState()
  const [mobile, setMobile] = useState()

  
  //error messages
  const [emailError, setEmailError] = useState("")
  const [mobileError, setMobileError] = useState("")

  
  // Validate email function
  function emailIsValid(email) {
      console.log("email", email);
    if(email == '' || email == undefined){
        setEmailError('')
        return true
      }
    if ( !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Must enter a valid email")
    }
    else{
        setEmailError('')
        return true
    }  
  }
  
  // Validate mobile function
  function mobileIsValid(mobile) {
    if (mobile == undefined || mobile == '') {
      setMobileError("Must enter a mobile number")
    } else {
      setMobileError('')
      return true
    }
  }
  function configureCaptcha(){
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {

        this.onSignInSubmit();
        console.log("Recaptca varified")
      },
      defaultCountry: "IN"
    });
  }
  
  
  // Validate all data and submit form
  function handleSubmit(e) {
    e.preventDefault()
    var emailValid ;
    var mobileValid;


    emailValid = emailIsValid(email)
    mobileValid = mobileIsValid(mobile)

    if(emailValid === true && mobileValid === true ) {
        configureCaptcha()
        const phoneNumber = "+91" + mobile
        console.log(phoneNumber)
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
          
              window.confirmationResult = confirmationResult;
              console.log("OTP has been sent")
              props.setLoggedIn(true)
    
            }).catch((error) => {
             
              console.log("SMS not sent")
            });  

    }

    
  }
  
  return(
    <div className="container">
      <div className="text-box column">
         <div className="overlay">
        <h2>Host your gigs and Increase your reach to a better relevant audience</h2>
        </div> 
        </div>
      <div className="login-box column">
       <img src={require('./../../images/N.png')}></img>   
      <h2>Login to N Kalari</h2>

        <form onSubmit={handleSubmit}>
        <div id="sign-in-button" ></div>
          <div className="form-group">
            <input onChange={e => setMobile(e.target.value)} name="mobile" placeholder="Mobile" type="text"/>
            <small class="error">{mobileError}</small>
          </div>
          <div className="form-group">
            <label htmlFor="email-register">
              <input onChange={e => setEmail(e.target.value)} name="email" placeholder="Email (Optional)" />
              <small class="error">{emailError}</small>
            </label>
          </div>
          <div className="form-group">
            <button type="submit">Login</button>
          </div>
        </form>
        
      </div>
    </div>
  )
}

//Account Created Screen
function AccountCreatedScreen(props) {
  
const [otp, setOtp] = useState()

  const [otpError, setOtpError] = useState("")
  const history = useHistory();

function handleSubmitOTP(e){
    e.preventDefault()
    const code = otp
    console.log(code)
    window.confirmationResult.confirm(code).then((result) => {
    //   // User signed in successfully.
    //   const user = result.user;
    //   console.log(JSON.stringify(user))
      history.push("/wallet")

    }).catch((error) => {
   
    });
}
  
  return(
    <div className="container">
      <div className="text-box column">
         <div className="overlay">
        <h2>Host your gigs and Increase your reach to a better relevant audience</h2>
        </div> 
        </div>
      <div className="login-box column">
       <img src={require('./../../images/N.png')}></img>   
      <h2>Login to N Kalari</h2>

        <form onSubmit={handleSubmitOTP}>
          <div className="form-group">
            <input onChange={e => setOtp(e.target.value)} name="otp" placeholder="Enter OTP" type="text"/>
            <small class="error">{otpError}</small>
          </div>
         
          <div className="form-group">
            <button type="submit">Submit</button>
          </div>
        </form>
        
      </div>
    </div>
  )
}
  
          
export default Main;