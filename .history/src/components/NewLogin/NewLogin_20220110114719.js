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
    if ( !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Must enter a valid email")
    } else if(email == ''){
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
            {/* <small>Mobile</small> */}
            <input onChange={e => setMobile(e.target.value)} name="mobile" placeholder="Mobile" type="text"/>
            <small class="error">{mobileError}</small>
          </div>
          <div className="form-group">
            <label htmlFor="email-register">
              <small>Email</small>
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
  
  function logOut(e) {
    props.setLoggedIn(false)
  }
  
  return(
    <div className="container">
      <div className="text-box column">
        <h1>WELCOME TO THE JUNGLE</h1>
        <p>Thanks for signing up!</p>
        </div>
      <div className="login-box column">
        <iframe src="https://giphy.com/embed/YAfCAzDS0WmwU" width="100%" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
          <div className="form-group">
            <button onClick={logOut} type="submit">Back to Main Screen</button>
          </div>
        </div>
      </div>
  )
}
  
          
export default Main;