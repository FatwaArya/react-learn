// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    signInWithRedirect,
    GoogleAuthProvider
} from "firebase/auth";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBsc6HljkPXB58T-2YdprsAuODvL6Pw9m8",
    authDomain: "crwn-clothing-db-53bfa.firebaseapp.com",
    projectId: "crwn-clothing-db-53bfa",
    storageBucket: "crwn-clothing-db-53bfa.appspot.com",
    messagingSenderId: "240258015709",
    appId: "1:240258015709:web:2abf33a75f6766e13ad634"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    const userDocSnapshot = await getDoc(userDocRef);

    if (!userDocSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (error) {
            console.log(error);
        }
    }
    return userDocRef;
}