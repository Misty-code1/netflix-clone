import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBRtNIBxMH4J9vQM5k7HpdnbOs2EGVSzDU",
  authDomain: "netflix-clone-56268.firebaseapp.com",
  projectId: "netflix-clone-56268",
  storageBucket: "netflix-clone-56268.appspot.com",
  messagingSenderId: "619736954214",
  appId: "1:619736954214:web:37c1ebc980be47104e44a7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

//USER SIGNUP FUNCTION
const signUp = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error.message);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
};

//USER LOGIN FUNCTION
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
};

//LOGOUT FUNCTION
const logout = () => {
  signOut(auth);
};

export { auth, db, login, signUp, logout };
