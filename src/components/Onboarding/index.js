import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./index.css";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { updateUser } from "../../actions/user.action";
import { useDispatch } from "react-redux";

const Onboarding = () => {
  const genderList = [
    { id: 1, name: "Male", unavailable: false },
    { id: 2, name: "Female", unavailable: false },
    { id: 3, name: "Transgender", unavailable: false },
  ];
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState(genderList[0]);
  const [profileImage, setProfileImage] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (firstName && lastName) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [firstName, lastName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (profileImage) {
      const data = new FormData();
      data.append("file", profileImage);
      data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
      data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
      axios
        .post(process.env.REACT_APP_CLOUDINARY_URL, data)
        .then((res) => {
          // setProfileImageUrl(res.data.url);
          dispatch(
            updateUser({
              firstName,
              lastName,
              email,
              gender: gender.name,
              profileImageUrl: res.data.url,
            })
          )
            .then((data) => {
              console.log(data, "hey");
              if (data.success) {
                history.push("/wallet");
              }
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    } else {
      dispatch(
        updateUser({
          firstName,
          lastName,
          email,
          gender: gender.name,
        })
      )
        .then((data) => {
          console.log(data, "hey");
          if (data.success) {
            history.push("/wallet");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleProfileImage = (e) => {
    setProfileImage(e.target.files[0]);
  };

  return (
    <>
      <div className="onboarding-wrap h-full relative flex justify-between items-start p-12">
        <img
          className="overlay-image z-0 absolute top-0 left-0 opacity-40"
          src="https://res.cloudinary.com/kalari/image/upload/v1643364402/alexander-popov-hTv8aaPziOQ-unsplash_ywktfe.jpg"
          alt="login-default"
        />
        <div className="text-box h-full flex flex-col justify-between relative text-left text-white w-4/6">
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

          <h2 className="text-8xl">
            Host your gigs and Increase your reach to a better relevant audience
          </h2>
        </div>

        <div className="onboarding-box relative p-4 rounded-2xl bg-white/30 flex flex-col justify-between items-center">
          {/* <div className="logo bg-white w-16 h-16 rounded-xl shadow-xl grid items-center">
            <span className="text-5xl text-center text-transparent bg-clip-text bg-gradient-to-tl from-violet-500 via-rose-500 to-amber-500 headline-font text-white font-black">
              k
            </span>
          </div> */}
          <h2 className="text-left text-4xl mb-6 text-black">
            Create Your Profile
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center items-center">
              <div className="flex w-full justify-between items-center">
                <div>
                  <img
                    class="h-24 w-24 object-cover rounded-full"
                    src={
                      profileImage
                        ? URL.createObjectURL(profileImage)
                        : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                    }
                    alt="Current profile photo"
                  />
                </div>
                <span class="sr-only">Choose profile photo</span>
                <input
                  type="file"
                  class="w-1/2 file:rounded-full file:border-0 file:px-10 bg-white"
                  accept="image/*"
                  onChange={handleProfileImage}
                />
              </div>
              <br />
              <div className="flex justify-between w-full">
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  name="firstName"
                  placeholder="First Name"
                  type="text"
                  required
                  value={firstName}
                  className="mr-2 px-4"
                />

                <input
                  onChange={(e) => setLastName(e.target.value)}
                  name="lastName"
                  placeholder="Last Name"
                  type="text"
                  required
                  value={lastName}
                  className="px-4"
                />
              </div>
              <div className="flex justify-between w-full">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  placeholder="Email"
                  type="text"
                  value={email}
                  className="px-4 mr-2 w-1/2"
                />

                <div className="w-1/2">
                  <Listbox value={gender} onChange={setGender}>
                    <div className="relative  mt-1">
                      <Listbox.Button className="relative bg-gray-500 w-full py-2 pl-3 pr-10 text-left rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-100 focus-visible:ring-white focus-visible:ring-offset-grey-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                        <span className="block truncate">{gender.name}</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <SelectorIcon
                            className="w-5 h-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                          {genderList.map((genderName, genderIdx) => (
                            <Listbox.Option
                              key={genderIdx}
                              className={({ active }) =>
                                `${
                                  active
                                    ? "text-amber-900 bg-amber-100"
                                    : "text-gray-900"
                                }
                                  cursor-default select-none relative py-2 pl-10 pr-4 z-10`
                              }
                              value={genderName}
                            >
                              {({ gender, active }) => (
                                <>
                                  <span
                                    className={`${
                                      gender ? "font-medium" : "font-normal"
                                    } block truncate`}
                                  >
                                    {genderName.name}
                                  </span>
                                  {gender ? (
                                    <span
                                      className={`${
                                        active
                                          ? "text-amber-600"
                                          : "text-amber-600"
                                      }
                                        absolute inset-y-0 left-0 flex items-center pl-3`}
                                    >
                                      <CheckIcon
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center mt-8">
              <button
                className={`primary-btn w-full bg-white ${
                  submitDisabled ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                type="submit"
                disabled={submitDisabled}
              >
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
