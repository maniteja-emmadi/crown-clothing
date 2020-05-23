import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBRBhbZCBX05Yzu3Ip22_awIegktgWMHmw",
  authDomain: "crwn-db-d7ed4.firebaseapp.com",
  databaseURL: "https://crwn-db-d7ed4.firebaseio.com",
  projectId: "crwn-db-d7ed4",
  storageBucket: "crwn-db-d7ed4.appspot.com",
  messagingSenderId: "837200310134",
  appId: "1:837200310134:web:2874b48745383c9efc9457",
  measurementId: "G-58K79R4K2P"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
