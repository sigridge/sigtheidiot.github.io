import firebase from "firebase";
import "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PID,
  storageBucket: process.env.REACT_APP_SB,
  messagingSenderId: process.env.REACT_APP_SID,
  appId: process.env.REACT_APP_APPID,
  databaseURL:
    "https://buck-spill-app-default-rtdb.europe-west1.firebasedatabase.app/",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const databaseRef = database.ref();
export const spillRef = databaseRef.child("TimeSinceSpill");
