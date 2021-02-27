import firebase from "firebase";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDb4U5mnQvV4UaG9qefH-RTnvRdkTIuVkE",
    authDomain: "fir-e3fd9.firebaseapp.com",
    projectId: "fir-e3fd9",
    storageBucket: "fir-e3fd9.appspot.com",
    messagingSenderId: "394836372358",
    appId: "1:394836372358:web:c807d14b6d2d15c8a49a07",
    measurementId: "G-FWTTYC7Y0L"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();

  const auth = firebase.auth();

  export {db,auth};