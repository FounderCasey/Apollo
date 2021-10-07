// import { initializeApp, firebase } from "firebase/app";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBYjm1dSQmhf4sOi50rVYf75AEWz3rLwLM",
  authDomain: "apollo-dapp.firebaseapp.com",
  projectId: "apollo-dapp",
  storageBucket: "apollo-dapp.appspot.com",
  messagingSenderId: "939402296705",
  appId: "1:939402296705:web:0465a93e4c00c9e75abc80",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
export default db;
