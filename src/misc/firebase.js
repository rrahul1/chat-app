import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyAc4rCy4Ox7JISn3jGikCl_kOIftqIoNF0",
  authDomain: "chat-web-app-8db81.firebaseapp.com",
  databaseURL: "https://chat-web-app-8db81-default-rtdb.firebaseio.com",
  projectId: "chat-web-app-8db81",
  storageBucket: "chat-web-app-8db81.appspot.com",
  messagingSenderId: "1028931193991",
  appId: "1:1028931193991:web:b11ebf25d9cf3ea370bc22",
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
