import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyCsSiSqCHVbDMOz1yxQktgeGNkaxxQPqFI",
    authDomain: "twitter-clone-19f9f.firebaseapp.com",
    databaseURL: "https://twitter-clone-19f9f.firebaseio.com",
    projectId: "twitter-clone-19f9f",
    storageBucket: "twitter-clone-19f9f.appspot.com",
    messagingSenderId: "542007423247",
    appId: "1:542007423247:web:93ed7d43ac07d293998e7a"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)

  const db = firebaseApp.firestore()
  const auth = firebaseApp.auth()

  const actions = {db,auth}
  export default actions;