import React, { Component } from "react";
import "./index.css";
import firebase from "../../helpers/firebase";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userAuthProgress, userLogin } from "../../actions/user.action";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import OtpInput from "react-otp-input";
import swal from "sweetalert";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import OtpTimer from "otp-timer";

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
  const [resendOtp, setResendOtp] = useState(true);

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

  // function phoneNumberIsValid(phoneNumber) {
  //   const number = phoneNumber.trim().replaceAll(" ", "");
  //   setPhoneNumber(number);
  //   if (!number) {
  //     setPhoneNumberError("Must enter your Phone Number");
  //   } else if (number.length != 10 || !+number) {
  //     setPhoneNumberError("Please enter valid 10 digit Phone Number");
  //   } else {
  //     setPhoneNumberError("");
  //     return true;
  //   }
  // }

  function phoneNumberIsValid(phoneNumber) {
    const number =
      "+" + phoneNumber.trim().replaceAll(" ", "").replaceAll("-", "");
    setPhoneNumber(number);
    if (!number || number.length < 6) {
      setPhoneNumberError("Must enter your Phone Number");
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
          // onSignInSubmit();
          console.log("Recaptca varified");
        },
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
    const number = "+" + phoneNumber;
    console.log(number);
    setResendOtp(true);
    const appVerifier = window.recaptchaVerifier;
    await firebase
      .auth()
      .signInWithPhoneNumber(number, appVerifier)
      .then((confirmationResult) => {
        setShowOtpInput(true);
        window.confirmationResult = confirmationResult;
        swal("Success", "otp has been sent!", "success");
      })
      .catch((error) => {
        console.log("SMS not sent", error);
        swal("Oops", "Unable to send otp! Please try again", "error");
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
            dispatch(userLogin({ idToken, phoneNumber }))
              .then((data) => {
                if (data.isOnboardingDone) {
                  console.log("onboarding done");
                  history.push("/wallet");
                } else {
                  console.log("onboarding not done");
                  history.push("/onboarding");
                }
              })
              .catch((err) => {
                console.log(err, "login failed");
                dispatch(
                  userAuthProgress({
                    isAuthInProgress: false,
                    isAuthDone: false,
                  })
                );
              });
          })
          .catch(function (error) {});
      })
      .catch((error) => {
        if (error) {
          console.log(error, "error");
          setOtpError("Entered Otp is Wrong");
          swal("Oops", "Incorrect otp!", "error");
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
        <h2>{showOtpInput ? "Enter OTP" : "Login"}</h2>
        {!showOtpInput ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <PhoneInput
                country={"in"}
                value={phoneNumber}
                enableSearch={true}
                placeholder="Enter your mobile number"
                inputProps={{
                  name: "phone",
                  required: true,
                  enableSearch: true,
                }}
                inputStyle={{
                  background: "#2e25259f",
                  color: "white",
                  border: "none",
                }}
                onChange={(phone) => setPhoneNumber(phone)}
              />

              <small className="error">{phoneNumberError}</small>
            </div>
            <div className="form-group">
              <button
                className="bg-indigo-700 w-1/3"
                type="submit"
                disabled={phoneNumber.length > 9 ? false : true}
              >
                Submit
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={onSubmitOTP}>
            <div className="form-group">
              <OtpInput
                className="OtpInput"
                value={otp}
                onChange={(otp) => setOtp(otp)}
                numInputs={6}
                shouldAutoFocus={true}
              />
              <small className="error">{otpError}</small>
            </div>
            <div className="form-group">
              <div className="flex items-center">
                <button
                  className="bg-indigo-600 w-1/3"
                  type="submit"
                  disabled={otp.length > 5 ? false : true}
                >
                  Login
                </button>
                {resendOtp ? (
                  <div className="resend-timer">
                    <OtpTimer
                      text="Resending in"
                      textColor="#fff"
                      seconds={5}
                      minutes={0}
                      resend={onSignInSubmit}
                    />
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </form>
        )}
      </div>
      <Tooltip
        title={
          <React.Fragment>
            <Typography color="white">
              <em>Click me for sample phone number.</em>
            </Typography>
          </React.Fragment>
        }
        onClick={(e) => {
          e.preventDefault();
          setPhoneNumber("+919999999999");
        }}
        style={{ position: "absolute", right: "0", left: "70%", bottom: "60%" }}
      >
        <IconButton>
          <InfoIcon />
        </IconButton>
      </Tooltip>
      <div id="sign-in-button"></div>
    </div>
  );
}

export default Login;
