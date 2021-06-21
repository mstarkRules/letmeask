import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyBpskjdXYhOBFe2nAK_7jPPhGoNR7Zc7xc",
  authDomain: "letmeask-8c2a3.firebaseapp.com",
  databaseURL: "https://letmeask-8c2a3-default-rtdb.firebaseio.com",
  projectId: "letmeask-8c2a3",
  storageBucket: "letmeask-8c2a3.appspot.com",
  messagingSenderId: "982125660498",
  appId: "1:982125660498:web:063ff0745ed57e9db7928b",
};


firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

