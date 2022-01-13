import React, { Component } from "react";
import styles from "./index.css";
import firebase from "../../helpers/firebase";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

const useState = React.useState;

function Login(props) {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <CreateUserScreen />
    </>
  );
}

//Create Account
function CreateUserScreen(props) {
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  //error messages
  const [emailError, setEmailError] = useState("");
  // const [fullNameError, setFullNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const dispatch = useDispatch();

  const history = useHistory();
  // Validate email function
  function emailIsValid(email) {
    console.log("email", email);
    if (email == "" || email == undefined) {
      setEmailError("");
      return true;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Must enter a valid email");
    } else {
      setEmailError("");
      return true;
    }
  }

  function phoneNumberIsValid(phoneNumber) {
    const number = phoneNumber.trim().replaceAll(" ", "");
    setPhoneNumber(number);
    if (!number) {
      setPhoneNumberError("Must enter your Phone Number");
    } else if (number.length != 10 || !+number) {
      setPhoneNumberError("Please enter valid 10 digit Phone Number");
    } else {
      setPhoneNumberError("");
      return true;
    }
  }

  function configureCaptcha() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          onSignInSubmit();
          console.log("Recaptca varified");
        },
        defaultCountry: "IN",
      }
    );
  }

  // Validate all data and submit form
  function handleSubmit(e) {
    e.preventDefault();
    // var emailValid;
    var phoneNumberValid;

    // emailValid = emailIsValid(email);
    phoneNumberValid = phoneNumberIsValid(phoneNumber);
    if (phoneNumberValid) {
      setShowOtpInput(true);
      onSignInSubmit();
    }
  }

  const onSignInSubmit = async () => {
    // e.preventDefault();
    configureCaptcha();
    const number = "+91" + phoneNumber;
    console.log(number);
    const appVerifier = window.recaptchaVerifier;
    await firebase
      .auth()
      .signInWithPhoneNumber(number, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log("OTP has been sent");
      })
      .catch((error) => {
        console.log("SMS not sent");
      });
  };

  const onSubmitOTP = (e) => {
    e.preventDefault();
    const code = otp;
    console.log(code);
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        history.push("/onboarding");
        // console.log(JSON.stringify(user));
        firebase
          .auth()
          .currentUser.getIdToken(/* forceRefresh */ true)
          .then(function (idToken) {
            // Send token to your backend via HTTPS
            // ...
            localStorage.setItem("nkalari", idToken);
            axios
              .post(
                `${process.env.REACT_APP_DOMAIN}/api/users/login`,
                {
                  phoneNumber: phoneNumber,
                },
                {
                  headers: {
                    authorization: idToken,
                  },
                }
              )
              .then((response) => {
                if (response.data.isOnboardingDone) {
                  console.log("onboarding done");
                  history.push("/wallet");
                } else {
                  console.log("onboarding not done");
                  history.push("/onboarding");
                }
              });
          })
          .catch(function (error) {
            // Handle error
          });
      })
      .catch((error) => {
        if (error) {
          console.log(error, "error");
          setOtpError("Entered Otp is Wrong");
        }
      });
  };

  return (
    <div className="container">
      <div className="text-box column">
        <div className="overlay">
          <h2>
            Host your gigs and Increase your reach to a better relevant audience
          </h2>
        </div>
      </div>
      <div className="login-box column">
        <img src={require("./../../images/N.png")}></img>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <div id="sign-in-button"></div>
          <div className="form-group">
            <input
              onChange={(e) => setPhoneNumber(e.target.value)}
              name="phoneNumber"
              placeholder="Phone Number"
              type="text"
              required
            />
            <small className="error">{phoneNumberError}</small>
          </div>
          {/* <div className="form-group">
            <label htmlFor="email-register">
              <input
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                placeholder="Email (Optional)"
              />
              <small className="error">{emailError}</small>
            </label>
          </div> */}
          {showOtpInput ? (
            ""
          ) : (
            <div className="form-group">
              <button className="bg-indigo-700" type="submit">
                Submit
              </button>
            </div>
          )}
        </form>

        {showOtpInput ? (
          <form onSubmit={onSubmitOTP}>
            <div className="form-group">
              <input
                onChange={(e) => setOtp(e.target.value)}
                name="otp"
                placeholder="Please Enter OTP"
                type="text"
                required
              />
              <small className="error">{otpError}</small>
            </div>
            <div className="form-group">
              <button className="bg-indigo-600" type="submit">
                Login
              </button>
            </div>
          </form>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Login;
