import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDqHEGaqM0L_lrq3Wrz_dbzOAHSaiYn_XM",
  authDomain: "chat-room-48dd4.firebaseapp.com",
  projectId: "chat-room-48dd4",
  storageBucket: "chat-room-48dd4.appspot.com",
  messagingSenderId: "236795019754",
  appId: "1:236795019754:web:01d8ab72ed0ea5c6f8f293",
  measurementId: "G-7N9VR6JE8R",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

async function loginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const { user } = await signInWithPopup(auth, provider);

    return { uid: user.uid, displayName: user.displayName };
  } catch (error) {
    if (error.code !== "auth/cancelled-popup-request") {
      console.error(error);
    }

    return null;
  }
}

async function sendMessage(roomId, user, text) {
  try {
    await addDoc(collection(db, "chat-rooms", roomId, "messages"), {
      uid: user.uid,
      displayName: user.displayName,
      text: text.trim(),
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error(error);
  }
}

function getMessages(roomId, callback) {
  return onSnapshot(
      query(
          collection(db, 'chat-rooms', roomId, 'messages'),
          orderBy('timestamp', 'asc')
      ),
      (querySnapshot) => {
          const messages = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
          }));
          callback(messages);
      }
  );
}

export { loginWithGoogle, sendMessage, getMessages };
