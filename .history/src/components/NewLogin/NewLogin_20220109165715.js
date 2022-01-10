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
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  
  //error messages
  const [emailError, setEmailError] = useState("")
  const [usernameError, setUsernameError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  
  // Validate email function
  function emailIsValid(email) {
    if (email == undefined  || email == '') {
      setEmailError("Must enter an email")
    } else if ( !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Must enter a valid email")
    } else {
      setEmailError('')
      return true
    }
  }
  
  // Validate username function
  function usernameIsValid(username) {
    if (username == undefined || username == '') {
      setUsernameError("Must enter a username")
    } else {
      setUsernameError('')
      return true
    }
  }
  
  // Validate password function
  function passwordIsValid (password) {
    if (password == undefined || password == '') {
      setPasswordError("Must enter a password")
    } else if (password.length < 8 || password.length > 12) {
      setPasswordError("Password must be 8 - 12 characters")
    } else {
      setPasswordError('')
      return true
    }
  }
  
  // Validate all data and submit form
  function handleSubmit(e) {
    e.preventDefault()
    var emailValid ;
    var usernameValid;
    var passwordValid;
    //test email
    emailValid = emailIsValid(email)
    console.log(emailValid)
    //test username
    usernameValid = usernameIsValid(username)
    console.log(usernameValid)
    //test password
    passwordValid = passwordIsValid(password)
    console.log(passwordValid)
    //set log in to true
    if(emailValid === true && usernameValid === true && passwordValid === true) {
      props.setLoggedIn(true)
    }
  }
  
  return(
    <div className="container">
      <div className="text-box column">
        <h1>Host your gigs and Increase your reach to a better relevant audience</h1>
        </div>
      <div className="login-box column">
      <h3>Login to N Kalari</h3>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email-register">
              <small>Email</small>
              <input onChange={e => setEmail(e.target.value)} name="email" placeholder="your@example.com" />
              <small class="error">{emailError}</small>
            </label>
          </div>
          <div className="form-group">
            <small>Username</small>
            <input onChange={e => setUsername(e.target.value)} name="username" placeholder="Pick a Username" type="text"/>
            <small class="error">{usernameError}</small>
          </div>
          <div className="form-group">
            <small>Password</small>
            <input onChange={e => setPassword(e.target.value)} name="password" placeholder="8-12 Characters" type="password"/>
            <small class="error">{passwordError}</small>
          </div>
          <div className="form-group">
            <button type="submit">Sign up</button>
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