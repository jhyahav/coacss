import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyBPPZHTlMdryJGodOVADTQaqzbN4Li-2nA",
    authDomain: "jon-blog.firebaseapp.com",
    projectId: "jon-blog",
    storageBucket: "jon-blog.appspot.com",
    messagingSenderId: "45164913712",
    appId: "1:45164913712:web:1120517b032dd065c9b9f5",
    measurementId: "G-0MNHY1P45K"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const storage = firebase.storage();
export const firestore = firebase.firestore();

export async function getUserWithUsername(username) {
    const usersRef = firestore.collection('users');
    const query = usersRef.where('username', '==', username).limit(1);
    const userDoc = (await query.get()).docs[0];
    return userDoc;
}

export function postToJSON(doc) {
    const data = doc.data();
    if (!data) {
        return null;
    }
    return {
        ...data,
        createdAt: data.createdAt.toMillis(),
        updatedAt: data.updatedAt.toMillis()
    }
}

export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;

export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const increment = firebase.firestore.FieldValue.increment;