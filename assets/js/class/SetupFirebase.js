import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js"
import { getAuth, GoogleAuthProvider, signInWithPopup , signOut   } from 'https://www.gstatic.com/firebasejs/9.11.0/firebase-auth.js'
import { getFirestore , collection, addDoc, getDocs, where, query, updateDoc, deleteDoc , doc , getDoc} from 'https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js'

const firebaseConfig = {
    apiKey: "AIzaSyCzud8KTwi86ClTL8YsL2JHrWEP6nec9_0",
    authDomain: "basecrm-82bcc.firebaseapp.com",
    projectId: "basecrm-82bcc",
    storageBucket: "basecrm-82bcc.appspot.com",
    messagingSenderId: "435246668501",
    appId: "1:435246668501:web:a1da66570bf8f529b6205c"
}
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const db = getFirestore(app)

export { app, auth,db, 
  provider,getAuth,GoogleAuthProvider, signInWithPopup,signOut,
  query,collection,addDoc,where, getDocs, updateDoc, deleteDoc , doc,getDoc
} 