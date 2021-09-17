import firebase from "firebase";

import "firebase/auth"
import "firebase/database"
import "firebase/storage"



const firebaseConfig = {
  apiKey: "AIzaSyBvUpBlx7YGfvlNVrIe0HKXAwcIcWaI6vE",
  authDomain: "netflix-clone-63e7f.firebaseapp.com",
  projectId: "netflix-clone-63e7f",
  storageBucket: "netflix-clone-63e7f.appspot.com",
  messagingSenderId: "8518954804",
  appId: "1:8518954804:web:7bc9d81b903233e5a37f61"
};

  firebase.initializeApp(firebaseConfig)

  export default firebase;