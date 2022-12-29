import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBmrA8DxHFUSpHLKzeIrIKLnrE5ShlPhm4",
  authDomain: "disney-clone--1.firebaseapp.com",
  projectId: "disney-clone--1",
  storageBucket: "disney-clone--1.appspot.com",
  messagingSenderId: "619525597077",
  appId: "1:619525597077:web:36e16f9313f851928a789c"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
