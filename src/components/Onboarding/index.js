import React, { Fragment, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./index.css";
import { Listbox , Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

const Onboarding = () => {

  const genderList = [
    { id: 1, name: 'Male', unavailable: false },
    { id: 2, name: 'Transgender', unavailable: false },
    { id: 3, name: 'Female', unavailable: false },
  ]
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState(genderList[0]);
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
            {/* <div className="form-group">
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
            </div> */}
             <div className=" w-60 translate-x-2/3">
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
                    <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {genderList.map((genderName, genderIdx) => (
                        <Listbox.Option
                          key={genderIdx}
                          className={({ active }) =>
                            `${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
                                  cursor-default select-none relative py-2 pl-10 pr-4`
                          }
                          value={genderName}
                        >
                          {({ gender, active }) => (
                            <>
                              <span
                                className={`${
                                  gender ? 'font-medium' : 'font-normal'
                                } block truncate`}
                              >
                                {genderName.name}
                              </span>
                              {gender ? (
                                <span
                                  className={`${
                                    active ? 'text-amber-600' : 'text-amber-600'
                                  }
                                        absolute inset-y-0 left-0 flex items-center pl-3`}
                                >
                                  <CheckIcon className="w-5 h-5" aria-hidden="true" />
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
