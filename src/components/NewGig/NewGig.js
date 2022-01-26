import React, { useState } from "react";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { addNewGig, uploadThumbnail } from "../../services/gigs.service";
import { useSelector } from "react-redux";


const NewGig = () => {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [category, selectCategory] = useState("");

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
  

  const handleSubmit = async () => {
    //TODO validation
    //add data to firestore collection
    const payload = {
      title: title,
      desc: desc,
      category: category,
      thumbnail: thumbnail,
      scheduled_at: date,
      host_user: currentUser,
    };
    try {
      addNewGig(payload);
    } catch (e) {
      console.error("Error adding document: ", e);
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
    setThumbnail(imageUrl);
    console.log(imageUrl,"???");
  };

  return (
    <div className="newgig-wrap my-12 ml-32 px-6">
      <h1 className="text-5xl text-left">New Gig</h1>
      <form className="my-6 w-2/3">
        <label htmlFor="title">
          <span className="text-bold mt-4 text-xl text-white text-left block">
            Title
          </span>
          <input
            onChange={(e) => setTitle(e.target.value)}
            className="w-full"
            type="text"
            name="title"
            value={title}
          />
        </label>
        <label htmlFor="thumbnail">
          <span className="text-bold mt-4 text-xl text-white text-left block">
            Thumbnail
          </span>
          {thumbnail===""?<input
            onChange={handleThumbnail}
            className="w-full h-64"
            accept="image/*"
            type="file"
            name="thumbnail"
            value={thumbnail}
          />:<div className="thumbnail-preview w-full h-64">
              <img src={thumbnail} alt="thumbnail" className="w-full h-full object-cover"/>
            </div>}
          
        </label>
        <div className="category">
          <span className="text-bold mt-4 text-xl text-white text-left block">
            Category
          </span>
          <div className="options-list flex my-4">
            {Object.keys(categories).map((key, i) => (
              <div
                key={key}
                onClick={() => selectCategory(key)}
                className={`option mr-4 rounded-full ${
                  category !== key
                    ? "text-white bg-black/40"
                    : "text-black bg-white"
                } cursor-pointer px-4 py-2 text-xl`}
              >
                {categories[key]}
              </div>
            ))}
          </div>
        </div>
        <label htmlFor="description">
          <span className="text-bold mt-4 text-xl text-white text-left block">
            Description
          </span>
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            className="w-full"
            name="description"
            value={desc}
          />
        </label>
        <label htmlFor="date">
          <span className="text-bold mt-4 text-xl text-white text-left block">
            Schedule a date
          </span>
          <input
            onChange={(e) => setDate(e.target.value)}
            className="w-full"
            type="datetime-local"
            name="date"
            value={date}
          />
        </label>
        <div onClick={() => handleSubmit()} className="primary-btn mt-6">
          Host a new gig
        </div>
      </form>
    </div>
  );
};

export default NewGig;
