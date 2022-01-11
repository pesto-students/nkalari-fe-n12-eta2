import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./index.css";

const Onboarding = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("male");
  const [profileImage, setProfileImage] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `${process.env.REACT_APP_DOMAIN}/api/users`,
        { firstName, lastName, email, gender, profileImageUrl },
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

  const handleProfileImage = (e) => {
    setProfileImage(e.target.files[0]);
    handleImageUpload(e.target.files[0]);
  };

  const handleImageUpload = (profileImage) => {
    const data = new FormData();
    data.append("file", profileImage);
    data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
    data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
    axios
      .post(process.env.REACT_APP_CLOUDINARY_URL, data)
      .then((res) => {
        setProfileImageUrl(res.data.url);
        setProfileImageUrl("");
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

        <div className="onboarding-box column">
          <img className="hero-img" src={require("./../../images/N.png")}></img>
          <h2>Create Your Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group flex flex-col">
              <div className="flex items-center">
                <div class="shrink-0">
                  <img
                    class="h-16 w-16 object-cover rounded-full"
                    src={
                      profileImage
                        ? URL.createObjectURL(profileImage)
                        : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                    }
                    alt="Current profile photo"
                  />
                </div>
                <label class="block">
                  <span class="sr-only">Choose profile photo</span>
                  <input
                    type="file"
                    class="ml-6 w-1/2 file:rounded-full file:border-0 file:py-2 file:px-10 file:mr-10 file:text-sm"
                    accept="image/*"
                    onChange={handleProfileImage}
                  />
                </label>
              </div>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                name="firstName"
                placeholder="First Name"
                type="text"
                required
                value={firstName}
              />
              {/* </div>
            <div className="form-group"> */}

              <input
                onChange={(e) => setLastName(e.target.value)}
                name="lastName"
                placeholder="Last Name"
                type="text"
                required
                value={lastName}
              />
              {/* </div>
            <div className="form-group"> */}
              <input
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                placeholder="Email"
                type="text"
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
