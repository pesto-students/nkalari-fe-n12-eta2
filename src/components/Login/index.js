import React, { Component } from "react";
import "./index.css";
import firebase from "../../helpers/firebase";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  userActions,
  userAuthProgress,
  userLogin,
} from "../../actions/user.action";
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

const actionCreators = {
  getProfile: userActions.getProfile,
};

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
        window.confirmationResult = confirmationResult;
        swal("Success", "otp has been sent!", "success");
        setShowOtpInput(true);
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
                  actionCreators.getProfile();
                  history.push("/home");
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
    <div className="login-wrap relative flex flex-row w-full h-full bg-gradient-to-b from-violet-500 via-rose-500 to-amber-500">
      <img
        className="overlay-image absolute top-0 left-0 opacity-40"
        src="https://res.cloudinary.com/kalari/image/upload/v1643364402/alexander-popov-hTv8aaPziOQ-unsplash_ywktfe.jpg"
        alt="login-default"
      />
      <div className="text-box z-10 px-16 text-left text-white w-1/2 flex flex-col justify-around">
        <div className="logo-full flex flex-row items-center">
          <div className="logo bg-white w-16 h-16 rounded-xl shadow-xl grid items-center">
            <span className="text-5xl text-center text-transparent bg-clip-text bg-gradient-to-tl from-violet-500 via-rose-500 to-amber-500 headline-font text-white font-black">
              k
            </span>
          </div>
          <div className="logo-type ml-6 headline-font text-5xl font-black">
            kalari
          </div>
        </div>
        <div>
          <h2 className="text-8xl inline-block font-black">
            Showcase your talent.
          </h2>
          <br />
          <br />
          <h2 className="text-8xl text-transparent bg-clip-text bg-gradient-to-br from-sky-400 to-blue-500 inline-block font-black">
            Create communities.
          </h2>
        </div>
      </div>
      <div className="login-box z-10 w-1/2 grid place-items-center">
        <div className="bg-black/40 relative backdrop-blur p-12 rounded-2xl">
          <h2 className="text-6xl text-white flex justify-between my-6 text-left">
            {showOtpInput ? "Enter OTP" : "Login"}
            <div className="test-setting">
            <Tooltip
              title={
                <React.Fragment>
                  <Typography color="white">
                    <em>Click me for sample phone number. <br/> Use 123456 as OTP.</em>
                  </Typography>
                </React.Fragment>
              }
              onClick={(e) => {
                e.preventDefault();
                setPhoneNumber("+919999999999");
              }}
              // style={{
              //   position: "absolute",
              //   right: "0",
              //   left: "70%",
              //   bottom: "60%",
              // }}
            >
              <IconButton>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </div>
          </h2>

          

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
                  className={`primary-btn bg-purple-600 w-full ${phoneNumber.length > 9 ? "" : "opacity-50 pointer-events-none"}`}
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
                        seconds={60}
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
        <div id="sign-in-button"></div>
      </div>
    </div>
  );
}

export default Login;
