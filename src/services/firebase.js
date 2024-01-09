import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

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

/**
 * The function `loginWithGoogle` allows a user to log in with their Google account and returns the
 * user's unique ID and display name.
 * @returns an object with the properties `uid` and `displayName` if the login with Google is
 * successful. If there is an error, it will return `null`.
 */
async function loginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();

    /* The line `const auth = getAuth();` is initializing the Firebase Authentication service. It
    creates an instance of the `Auth` class, which is used to authenticate users and manage user
    sessions. This instance is stored in the `auth` variable for later use in the code. */
    const auth = getAuth();

    /* The line `const { user } = await signInWithPopup(auth, provider);` is using the
    `signInWithPopup` function from the Firebase Authentication library to authenticate the user
    with their Google account. */
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
      collection(db, "chat-rooms", roomId, "messages"),
      orderBy("timestamp", "asc")
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

// const navigate = useNavigate();

// const handleLogout = () => {
//   signOut(auth)
//     .then(() => {
//       // Sign-out successful.
//       navigate("/");
//       console.log("Signed out successfully");
//     })
//     .catch((error) => {
//       alert("Try Again");
//     });
// };

export { loginWithGoogle, sendMessage, getMessages};
