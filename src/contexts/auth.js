import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAzv7q6oErhx2VxMDyVvQ7iw3ALX_vZhU0",
  authDomain: "etec-202406.firebaseapp.com",
  databaseURL: "https://etec-202406-default-rtdb.firebaseio.com",
  projectId: "etec-202406",
  storageBucket: "etec-202406.appspot.com",
  messagingSenderId: "765455398377",
  appId: "1:765455398377:web:d13a060995b44cfa9cc778",
  measurementId: "G-0CVDK7X23F"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();