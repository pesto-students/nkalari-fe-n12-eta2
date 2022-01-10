import React, { Component } from "react"
import styles from './index.css';  

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
  
  
  
  // Validate all data and submit form
  function handleSubmit(e) {
    e.preventDefault()
    var emailValid ;
    var mobileValid;

    //test email
    emailValid = emailIsValid(email)
    console.log(emailValid)
    //test mobile
    mobileValid = mobileIsValid(mobile)
    console.log(mobileValid)
    //test password

    //set log in to true
    if(emailValid === true && mobileValid === true ) {
      props.setLoggedIn(true)
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
            <input onChange={e => setOtp(e.target.value)} name="mobile" placeholder="Mobile" type="text"/>
            <small class="error">{mobileError}</small>
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