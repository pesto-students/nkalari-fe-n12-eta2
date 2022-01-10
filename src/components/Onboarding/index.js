import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./index.css";

const Onboarding = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("male");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `${process.env.REACT_APP_DOMAIN}/api/users`,
        { firstName, lastName, email, gender },
        {
          headers: {
            authorization: localStorage.getItem("nkalari"),
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          history.push("/wallet");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="container">
        <div className="text-box column">
          <div className="overlay">
            <h2>
              Host your gigs and Increase your reach to a better relevant
              audience
            </h2>
          </div>
        </div>
        <div className="login-box column">
          <img src={require("./../../images/N.png")}></img>
          <h2>Create Your Profile</h2>

          <form onSubmit={handleSubmit}>
            <div id="sign-in-button"></div>
            <div className="form-group">
              <input
                onChange={(e) => setFirstName(e.target.value)}
                name="firstName"
                placeholder="First Name"
                type="text"
                required
                value={firstName}
              />
            </div>
            <div className="form-group">
              <input
                onChange={(e) => setLastName(e.target.value)}
                name="lastName"
                placeholder="Last Name"
                type="text"
                required
                value={lastName}
              />
            </div>
            <div className="form-group">
              <input
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                placeholder="Email"
                type="text"
                required
                value={email}
              />
            </div>
            <div className="form-group">
              <div className="flex w-full mb-12">
                <label
                  for="gender"
                  className="flex items-center cursor-pointer"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="gender"
                      className="sr-only"
                      onChange={(e) =>
                        gender == "male"
                          ? setGender("female")
                          : setGender("male")
                      }
                      value={gender}
                      checked={gender == "female" && true}
                    />
                    <div className="block bg-black w-14 h-8 rounded-full"></div>
                    <div className="dot absolute left-1 top-1 bg-gray-500 w-6 h-6 rounded-full transition"></div>
                  </div>
                  <div className="ml-3 text-white font-medium">
                    {gender.toUpperCase()}
                  </div>
                </label>
              </div>
            </div>
            <div className="form-group">
              <button className="bg-indigo-700" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Onboarding;
