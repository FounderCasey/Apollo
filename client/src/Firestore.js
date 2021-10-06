import { initializeApp, firestore } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYjm1dSQmhf4sOi50rVYf75AEWz3rLwLM",
  authDomain: "apollo-dapp.firebaseapp.com",
  projectId: "apollo-dapp",
  storageBucket: "apollo-dapp.appspot.com",
  messagingSenderId: "939402296705",
  appId: "1:939402296705:web:0465a93e4c00c9e75abc80",
};

// Initialize Firebase
initializeApp(firebaseConfig);

var db = firestore();
export default db;
