import firebase from "firebase/app";

let firebaseConfig = {
  apiKey: "AIzaSyBPZ2_Gyx2lAcEyVHG7wJFdJY47SiaG9Uo",
  authDomain: "silvertracker-fe0a0.firebaseapp.com",
  databaseURL: "https://silvertracker-fe0a0.firebaseio.com",
  projectId: "silvertracker-fe0a0",
  storageBucket: "silvertracker-fe0a0.appspot.com",
  messagingSenderId: "293055877547",
  appId: "1:293055877547:web:48326de0fdae91d32302ee"
};
firebase.initializeApp(firebaseConfig);

export default firebase;
