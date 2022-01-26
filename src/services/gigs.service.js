import axios from "axios";
import { getFirestore, limit, onSnapshot, orderBy } from "firebase/firestore";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { Observable } from "rxjs";

// export const categories = {
//   music: "🎸 Music",
//   dance: "💃 Dance",
//   art: "🎨 Art",
//   show: "🎥 Show",
//   comedy: "😆 Comedy",
// };

const db = getFirestore();

export const addNewGig = async (payload) => {
  try {
    const docRef = await addDoc(collection(db, "gigs"), payload);
    console.log("Document written with ID: ", docRef.id);
    return { done: docRef.id };
  } catch (e) {
    console.error("Error adding document: ", e);
    return e;
  }
};

export const uploadThumbnail = async (payload) => {
  const data = new FormData();

  for (let key in payload) {
    data.append(key, payload[key]);
  }
  return axios
    .post(process.env.REACT_APP_CLOUDINARY_URL, data)
    .then((res) => {
      return res.data.url;
    })
    .catch((err) => {
      return err;
    });
};

export const getHeadlineGigs = () => {
  const gigsRef = collection(db, "gigs");
  const q = query(gigsRef, orderBy("scheduled_at", "asc"), limit(3));
  let gigs = [];
  return new Observable((observer) => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        gigs.push(doc.data());
      });
      observer.next(gigs);
    });
    return () => unsubscribe();
  });
};
