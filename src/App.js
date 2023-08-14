import React, { useEffect } from "react";
import "./App.css";
import Sidebar from "./Sidebar/Sidebar.js";
import Chat from "./Chat/Chat.js";
import Login from "./Login&Logout/Login";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser, logout } from "./features/userSlice";
import { auth } from "./Firebase/Firebase";
import "./Firebase/FirebaseUsersListeners";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      {user ? (
        <>
          <Sidebar />
          <Chat />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
