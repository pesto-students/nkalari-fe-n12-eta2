import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDZjLb_085wvPOTY7agukIuBDpo2tSR5GM",
  authDomain: "nkalari-8f0ee.firebaseapp.com",
  projectId: "nkalari-8f0ee",
  storageBucket: "nkalari-8f0ee.appspot.com",
  messagingSenderId: "627102137961",
  appId: "1:627102137961:web:5232a754646159907d6cf8",
  measurementId: "G-GL01VM6V4Y",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
