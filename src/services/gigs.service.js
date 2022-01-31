import axios from "axios";
import { getFirestore, limit, onSnapshot, orderBy } from "firebase/firestore";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { map, Observable, shareReplay } from "rxjs";
import { docData, ObservableFromQuery } from "../helpers/rxjsFirestore";

export const categoriesTable = {
  music: "🎸 Music",
  dance: "💃 Dance",
  art: "🎨 Art",
  show: "🎥 Show",
  comedy: "😆 Comedy",
};

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

// a firestore collection reference
const gigsRef = collection(db, "gigs");

// export const getHeadlineGigs = () => {
//   let q = query(gigsRef, orderBy("scheduled_at", "asc"), limit(3));
//   let gigs = [];
//   return new Observable((observer) => {
//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//         gigs.push(doc.data());
//       });
//       observer.next(gigs);
//     });
//     return () => unsubscribe();
//   });
// };

export const streamHeadlineGigs = () => {
  let q = query(gigsRef, orderBy("date", "asc"), limit(3));
  return ObservableFromQuery(q).pipe(
    map((snapshot) => snapshot.docs),
    map((docs) => docs.map(docData)),
    shareReplay(1)
  );
};

export const streamGigsByCategory = (category) => {
  let q = query(gigsRef, where("category", "==", category));
  return ObservableFromQuery(q).pipe(
    map((snapshot) => snapshot.docs),
    map((docs) => docs.map(docData)),
    shareReplay(1)
  );
};

export const getGigsByCategory = (category) => {
  let q = query(gigsRef, where("category", "==", category));
  let gigsResult = [];
  return new Observable((observer) => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        gigsResult.push(doc.data());
      });
      observer.next(gigsResult);
      // console.log(gigsResult,"<<<<<<");
    });
    return () => unsubscribe();
  });
};

// export const getAllGigsCategoryWise = () =>{
//   let result = {}
//   Object.keys(categoriesTable).forEach(category=>(
//     null
//   ))
// }
