import React, { useState } from "react";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { addNewGig, uploadThumbnail } from "../../services/gigs.service";
import { useSelector } from "react-redux";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import "./NewGig.css";
import { AlertCircle, Plus } from "react-feather";

const NewGig = () => {
  // state variable to store the value of the form
  const [formData, setformData] = useState({
    title: "",
    thumbnail: "",
    desc: "",
    date: "",
    category: "",
  });

  // a state variable to store errors
  const [errors, setErrors] = useState([]);

  // validate formData
  const validate = () => {
    let tempErrors = [];
    if (!formData.title) {
      tempErrors.push("Title is required");
    }
    if (!formData.thumbnail) {
      tempErrors.push("Thumbnail is required");
    }
    if (!formData.desc) {
      tempErrors.push("Description is required");
    }
    if (!formData.date) {
      tempErrors.push("Date is required");
    }
    if (!formData.category) {
      tempErrors.push("Category is required");
    }
    setErrors(tempErrors);
    return tempErrors.length === 0;
  };

  const categories = {
    music: "🎸 Music",
    dance: "💃 Dance",
    art: "🎨 Art",
    show: "🎥 Show",
    comedy: "😆 Comedy",
  };

  //get user
  const { currentUser } = useSelector((store) => {
    return store.user;
  });

  // add current user to all docs in gigs collection
  const addUserToGig = async (gig) => {
    const db = getFirestore();
    const gigs = db.collection("gigs");
    // get all docs in the collection and loop over them
    const docs = await gigs.get();
    docs.forEach((doc) => {
      // add the user to the doc
      const data = doc.data();
      data.host_user = currentUser;
      // update the doc
      gigs.doc(doc.id).set(data);
      console.log("SET DATA", data);
    });
  };

  const handleSubmit = async () => {
    //TODO validation
    //add data to firestore collection after vakidation
    if (validate()) {
      const payload = {
        // add currentuser
        host_user: currentUser,
        ...formData,
      };
      try {
        let added = addNewGig(payload);
        // reset formData
        setformData({
          title: "",
          thumbnail: "",
          desc: "",
          date: "",
          category: "",
        });
        // navigate to home page if added is true
        // if (added) {
        //   window.location.href = "/home";
        // }
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  // upload the thumbnail
  const handleThumbnail = async (e) => {
    const payload = {
      file: e.target.files[0],
      upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET,
      cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
    };
    console.log(payload);
    let imageUrl = await uploadThumbnail(payload);
    //set formData thumbnail and remove thumbnail error from errors array
    setformData({ ...formData, thumbnail: imageUrl });
    setErrors(errors.filter((error) => error !== "Thumbnail is required"));
  };

  return (
    <div className="newgig-wrap my-12 ml-32 px-6">
      <h1
        className="relative z-10 text-5xl text-left"
        onClick={() => addUserToGig()}
      >
        New Gig
      </h1>

      {/* display all the errors */}
      {errors.length > 0 && (
        <div className="text-red-500 flex flex-row flex-wrap  my-6 text-left">
          {errors.map((error, index) => {
            return (
              <p
                className="py-2 px-4 mr-2 rounded-xl bg-white text-md flex"
                key={index}
              >
                <AlertCircle /> &ensp;
                {error}
              </p>
            );
          })}
        </div>
      )}

      <form className="relative mt-96 w-full z-10">
        <label htmlFor="thumbnail">
          <span className="text-bold mt-4 text-xl text-white text-left block">
            Thumbnail
          </span>
          {/* {formData.thumbnail === "" ? ( */}
          <input
            onChange={handleThumbnail}
            className="cursor-pointer file:rounded-full file:px-4 relative bg-transparent"
            accept="image/*"
            type="file"
            name="thumbnail"
            // value={formData.thumbnail}
          />
          {/* ) : ( */}

          {/* )} */}
        </label>

        <div className="flex">
          <div className="left-col w-4/6 pr-4">
            <label htmlFor="title">
              <span className="text-bold mt-4 text-xl text-white text-left block">
                Title
              </span>
              <input
                onChange={(e) =>
                  // set formData title and remove title error from errors array
                  {
                    setformData({ ...formData, title: e.target.value });
                    setErrors(
                      errors.filter((error) => error !== "Title is required")
                    );
                  }
                }
                className="w-full text-6xl p-4"
                type="text"
                name="title"
                value={formData.title}
              />
            </label>
            {/* description */}
            <label htmlFor="description">
              <span className="text-bold mt-4 text-xl text-white text-left block">
                Description
              </span>
              <br />
              <ReactQuill
                theme="snow"
                placeholder="Share your event details.. like a brief idea of what to expect"
                value={formData.desc}
                onChange={(e) => {
                  // set formData desc and remove desc error from errors array
                  setformData({ ...formData, desc: e });
                  setErrors(
                    errors.filter(
                      (error) => error !== "Description is required"
                    )
                  );
                }}
              />
              {/* <textarea
                onChange={(e) => setDesc(e.target.value)}
                className="w-full"
                name="description"
                value={desc}
              /> */}
            </label>
          </div>
          <div className="right-col w-2/6 pl-4">
            <div className="category">
              <span className="text-bold mt-4 text-xl text-white text-left block">
                Category
              </span>
              <div className="options-list flex flex-row flex-wrap my-4">
                {Object.keys(categories).map((key, i) => (
                  <div
                    key={key}
                    onClick={() => {
                      // set formData category and remove category error from errors array
                      setformData({ ...formData, category: key });
                      setErrors(
                        errors.filter(
                          (error) => error !== "Category is required"
                        )
                      );
                    }}
                    className={`option mr-4 mb-4 rounded-full ${
                      formData.category !== key
                        ? "text-white bg-black/40"
                        : "text-black bg-white"
                    } cursor-pointer px-4 py-2 text-xl`}
                  >
                    {categories[key]}
                  </div>
                ))}
              </div>
            </div>

            <label htmlFor="date">
              <span className="text-bold mt-4 text-xl text-white text-left block">
                Schedule a date
              </span>
              <input
                onChange={(e) =>
                  // set formData date and remove date error from errors array
                  {
                    setformData({ ...formData, date: e.target.value });
                    setErrors(
                      errors.filter((error) => error !== "Date is required")
                    );
                  }
                }
                className="w-full p-4"
                type="datetime-local"
                name="date"
                value={formData.data}
              />
            </label>
          </div>
        </div>

        <div
          onClick={() => handleSubmit()}
          className="special-btn shadow-xl fixed flex items-center right-12 bottom-12 mt-6"
        >
          <Plus /> &ensp; Host a new gig
        </div>
      </form>

      <div className="thumbnail-preview opacity-40 fixed top-0 left-0 w-full h-screen">
        <img
          src={
            formData.thumbnail === ""
              ? "https://res.cloudinary.com/kalari/image/upload/v1643159224/sample.jpg"
              : formData.thumbnail
          }
          alt="thumbnail"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default NewGig;
