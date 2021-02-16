import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDp8KY_fBbyxDTIjkI1ZGAtuIFHaLi99xQ",
  authDomain: "wild-question.firebaseapp.com",
  projectId: "wild-question",
  storageBucket: "wild-question.appspot.com",
  messagingSenderId: "302311879480",
  appId: "1:302311879480:web:64222a78dfeedd8f5d47cd",
  measurementId: "G-Q59BGS6MWD",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const firebaseInstance = firebase;

export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();
