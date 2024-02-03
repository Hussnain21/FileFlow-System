import firebase from "firebase/compat/app";
//import "firebase/compat/firestore"

import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAkdTqp836FNe_Dzw4WPOZwEYhN3DcwKdo",
    authDomain: "fileflow-system.firebaseapp.com",
    projectId: "fileflow-system",
    storageBucket: "fileflow-system.appspot.com",
    messagingSenderId: "489031397387",
    appId: "1:489031397387:web:0aaa362442b0000e55d70e"
  };
  
  const fb = firebase.initializeApp(firebaseConfig);

  export default fb;