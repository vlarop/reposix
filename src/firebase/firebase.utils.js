import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyCojG7sooVNKxtwTHW5HUDatqR1llSsEsI",
    authDomain: "eapp-obchod.firebaseapp.com",
    databaseURL: "https://eapp-obchod-default-rtdb.firebaseio.com",
    projectId: "eapp-obchod",
    storageBucket: "eapp-obchod.appspot.com",
    messagingSenderId: "745601967116",
    appId: "1:745601967116:web:698d4165e4e643a3a7fa29",
    measurementId: "G-2L6Q6E34TH"
  }

  firebase.initializeApp(config);

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
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;