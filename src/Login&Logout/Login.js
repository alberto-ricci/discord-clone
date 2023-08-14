import React from "react";
import "./Login.css";
import { Button } from "@mui/material";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import ReactLogo from "./logos/react.svg";
import ReduxLogo from "./logos/redux.svg";
import FirebaseLogo from "./logos/firebase.svg";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";

function Login() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const db = getFirestore();

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const userData = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photo: user.photoURL,
        };
        dispatch(login(userData));
        setDoc(doc(db, "users", user.uid), userData);
        setDoc(doc(db, "onlineUsers", user.uid), { online: true });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/73/Discord_Color_Text_Logo_%282015-2021%29.svg"
          alt="Discord Logo"
        />
      </div>
      <Button onClick={signIn}>Sign In</Button>

      <div className="projectName">
        <h2>
          IT School, Web Development Course 2023, Final Project - Discord Clone
          made using
          <img className="logo" src={ReactLogo} alt="React logo" />
          React,
          <img className="logo" src={ReduxLogo} alt="Redux logo" />
          Redux and
          <img className="logo" src={FirebaseLogo} alt="Firebase logo" />
          Firebase
        </h2>

        <div className="mainFunctions">
          <h4>Main functions:</h4>
          <ul>
            <li>Log in with Google Authentication</li>
            <li>Create and delete channels</li>
            <li>Send messages in a channel visible to all users</li>
            <li>Send GIFs, emojis, and clickable links</li>
            <li>
              Utilize Firebase database to store channels and message data
            </li>
            <li>Edit and delete messages</li>
            <li>Track unread messages in each channel - WIP </li>
            <li>Real-time online status indicators for all users</li>
            <li>Simulated direct chats with users via bots</li>
          </ul>
        </div>

        <div className="madeBy">
          <h3>Made by Alberto Ricci</h3>
        </div>
      </div>
    </div>
  );
}

export default Login;
