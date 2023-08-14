import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD5bei-PdRWiMBfy3ku_ylZzVCt9JpU4yU",
  authDomain: "discord-clone-new-55b79.firebaseapp.com",
  projectId: "discord-clone-new-55b79",
  storageBucket: "discord-clone-new-55b79.appspot.com",
  messagingSenderId: "744372873450",
  appId: "1:744372873450:web:d78f032cbf137f3b19cf93",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export { auth, provider, db };
